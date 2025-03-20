import express, { NextFunction, Request, Response } from "express";
import { ProtectedRequest } from "../types/expressTypes";
import { Test } from "../models/TestModel";
import User from "../models/UserModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { ParticipantsType } from "../models/ParticipantsModel";
import { v4 as uuidv4 } from 'uuid';
import EmailQueue, {
    sendEmailTask,
    initializeTaskCount,
    emailProcessingEmitter
} from "../utils/emailQueue";
import {
    signToken,
    updateForwardedEMailStatus,
    formatTestInfoMail,
} from "../config/TestEmailConfig";
import { clientUrl } from "../utils/basicUtilityFunction";
import { PipelineStage } from "mongoose";

export const createUser = catchAsync(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const user = await User.create(req.body);
    if (!user) return next(new AppError("No user found with that ID", 404));

    res.status(201).json({
        status: "success",
        data: {
            user,
        }
    });

});

export const getAllTestsByUser = catchAsync(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const userId = req.auth.userId;
    let skip = NaN;
    let limit = NaN;
    let page = NaN;

    if (req.query.page && req.query.limit) {
        page = parseInt(req.query.page as string, 10) || 1;
        limit = parseInt(req.query.limit as string, 10) || 10;
        skip = (page - 1) * limit;
    }

    const sortStage = req.query.sortBy
        ? [{
            $sort: {
                [(req.query.sortBy as string).split("-")[0]]:
                    (req.query.sortBy as string).split("-")[1] === 'desc' ? -1 as 1 | -1 : 1 as 1 | -1
            }
        }]
        : [];

    // const tests = await Test.find({ user: userId });
    // const tests = await Test.aggregate([
    const pipeline: PipelineStage[] = [
        {
            // Match tests that belong to the current user
            $match: { user: userId }
        },
        {
            // Lookup the question sets to get the total number of questions in each questionSet
            $lookup: {
                from: 'questionsets', // Assuming your question set collection name is 'questionsets'
                localField: 'questionSet', // Field in the Test model that references the QuestionSet model
                foreignField: '_id', // Field in QuestionSet model
                as: 'questionSets' // Alias to store the joined data
            }
        },
        {
            // Calculate the total number of questions across all questionSets for each test
            $addFields: {
                totalQuestions: {
                    $sum: {
                        $map: {
                            input: '$questionSets', // Iterate through the questionSets array
                            as: 'questionSet',
                            in: { $size: '$$questionSet.questions' } // Count the questions in each questionSet
                        }
                    }
                }
            }
        },
        {
            // Lookup the participants to get the total number of participants (based on the list array length)
            $lookup: {
                from: 'participants', // Assuming your participants collection name is 'participants'
                localField: 'participants', // Field in Test model that references Participants model
                foreignField: '_id', // Field in Participants model
                as: 'participantInfo' // Alias to store the joined data
            }
        },
        {
            // Calculate the total number of participants by checking the size of the list array in each Participant document
            $addFields: {
                totalParticipants: {
                    $sum: {
                        $map: {
                            input: '$participantInfo', // Iterate through the participantInfo array
                            as: 'participant',
                            in: { $size: '$$participant.list' } // Count the number of participants in the 'list' array
                        }
                    }
                }
            }
        },
        // {
        //     $set: {
        //         status: {
        //             $cond: {
        //                 if: {
        //                     $and: [
        //                         { $eq: ["$status", "pending"] },
        //                         { $lt: ["$startAt", new Date()] }
        //                     ]
        //                 },
        //                 then: "stale",  // If status is "pending" and startAt < Date.now(), set status to "stale"
        //                 else: "$status"  // Else, keep the existing status
        //             }
        //         }
        //     }
        // },
        {
            // Optionally, project only the fields you need
            $project: {
                name: 1,
                status: 1,
                createdAt: 1,
                // startAt: 1,
                durationInSec: 1,
                // endAt: 1,
                // proctoring: 1,
                // tabSwitchLimit: 1,
                // resumable: 1,
                totalQuestions: 1,
                totalParticipants: 1,
            }
        },
        {
            $facet: {
                metadata: [{ $count: "totalRecords" }], // Count total documents
                data: [
                    // Conditionally apply sorting
                    ...sortStage, // If no sorting, don't apply

                    // Conditionally apply pagination
                    ...(req.query.page && req.query.limit
                        ? [{ $skip: skip }, { $limit: limit }]
                        : []) // If no page/limit, return all records
                ]
            }
        },
        {
            $project: {
                totalRecords: { $arrayElemAt: ["$metadata.totalRecords", 0] },
                data: 1
            }
        }
        // ]).option({ getAllTests: true });
    ];

    // if (req.query.sortBy) {
    //     const sortField = (req.query.sortBy as string).split("-");
    //     // const sortOrder = req.query.order === 'desc' ? -1 : 1; // Default ascending
    //     const sortOrder = sortField[1] === 'desc' ? -1 : 1; // Default ascending
    //     pipeline.push({ $sort: { [sortField[0]]: sortOrder } });
    // }

    // if (req.query.page && req.query.limit) {
    //     const page = parseInt(req.query.page as string, 10) || 1;
    //     const limit = parseInt(req.query.limit as string, 10) || 10;
    //     const skip = (page - 1) * limit;

    //     pipeline.push({ $skip: skip });
    //     pipeline.push({ $limit: limit });
    // }

    const tests = await Test.aggregate(pipeline).option({ getAllTests: true });

    if (!tests) return next(new AppError("Error occured while fetching tests, please try again", 404));
    
    const totalTests = tests[0]?.totalRecords || 0;
    const paginatedData = tests[0]?.data || [];

    res.status(200).json({
        status: "success",
        data: {
            totalTests,
            tests: paginatedData,
        }
    });
})

export const createTest = catchAsync(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const userId = req.auth?.userId;

    const newTest = await Test.create({ ...req.body, user: userId })
    if (!newTest) return next(new AppError("Error occured while test creation, please try again", 404));

    res.status(201).json({
        status: "success",
        data: {
            test: newTest,
        },
    });
});

export const getTest = catchAsync(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const test = await Test.findOneAndUpdate(
        {
            _id: req.params.id,
            status: 'pending',
            startAt: { $lt: new Date() } // Check if startAt is less than the current date
        },
        { status: 'stale' }, // Update the status to 'stale'
        { new: true, returnOriginal: false } // Return the updated document
    )
        .populate({
            path: "questionSet",
            select: "_id name",  // Exclude the 'questions' field from the QuestionSet
        })
        .populate({
            path: "participants",
            select: "_id listName",  // Exclude the 'list' field from the Participants
        });

    // If no document was updated, fetch the old document
    if (!test) {
        const oldTest = await Test.findById(req.params.id)
            .populate({
                path: "questionSet",
                select: "_id name",
            })
            .populate({
                path: "participants",
                select: "_id listName",
            });

        // Check if the old test exists
        if (!oldTest) return next(new AppError("No test found with that ID", 404));

        // Send the response with the old test
        return res.status(200).json({
            status: "success",
            data: {
                test: oldTest,
            },
        });
    }

    // Send the response with the updated test
    res.status(200).json({
        status: "success",
        data: {
            test,
        },
    });
})

export const deleteTest = catchAsync(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const testId = req.params.id;

    const test = await Test.findByIdAndDelete(testId)
    if (!test) return next(new AppError("No test found with that ID", 404));

    res.status(204).json({
        status: "success",
        data: null,
    });
})

export const updateTest = catchAsync(async (req: ProtectedRequest, res: Response, next: NextFunction) => {

    const testId = req.params.id;

    const test = await Test.findByIdAndUpdate(testId, req.body, {
        new: true,
        runValidators: true,
    })

    if (!test) return next(new AppError("No test found with that ID", 404));

    res.status(200).json({
        status: "success",
        data: {
            test,
        },
    });

})

export const sendTestLink = catchAsync(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const testId = req.params.id
    const test = await Test
        .findById(testId)
        .populate({ path: "participants" })

    if (!test) return next(new AppError("No test found with that ID", 404));

    const testParticipants = test.participants as unknown as ParticipantsType[];
    const participantsInfo = testParticipants.flatMap(p => p.list);

    initializeTaskCount(testId, participantsInfo.length);

    const testInfoEmail = formatTestInfoMail(
        test.name,
        test.startAt,
        test.endAt,
        test.durationInSec as number,
    );

    participantsInfo.forEach(info => {
        const uid = uuidv4().substring(0, 15);
        const emailToken = signToken({
            testId,
            userEmail: info.email,
            userName: info.name,
            uid,
        }, test.endAt)
        const testUrl = `${clientUrl}?token=${emailToken}/`
        EmailQueue.enqueue(sendEmailTask(info, testUrl, testInfoEmail, testId))
    })

    emailProcessingEmitter.once(`emailsProcessed:${testId}`, updateForwardedEMailStatus)

    res.status(200).json({
        status: "success",
        message: "Test links are being forwarded to participants, please check with us after some time",
    });
});