import { PipelineStage } from "mongoose";
import { Analytics } from "../models/AnalyticsModel";
import { ProtectedRequest } from "../types/expressTypes";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Response } from "express";

export const getHostedTestCount = catchAsync(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const userId = req.auth.userId;
    const testCount = {
        basic: 0,
        proctured: 0,
    };

    // Use Promise.all to run both queries in parallel
    const [basicCount, procturedCount] = await Promise.all([
        Analytics.countDocuments({
            // status: { $in: ['active', 'completed'] },
            // status: { $in: ['active'] },
            proctured: false, // proctoring is false
            user: userId,  // Directly use userId as a string
        }),
        Analytics.countDocuments({
            // status: { $in: ['active', 'completed'] },
            // status: { $in: ['active'] },
            proctured: true, // proctoring is true
            user: userId,  // Directly use userId as a string
        }),
    ]);

    testCount.basic = basicCount;
    testCount.proctured = procturedCount;

    res.status(200).json({
        status: "success",
        data: {
            testCount,
        },
    });
});




export const getAnalyticsByUser = catchAsync(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const userId = req.auth.userId;
    const isProctured = req?.query?.proctured === "true";
    
    const filter: any = { user: userId };

    // filter.proctured = true;
    // if (req.query.status && req.query.status !== 'all') {
    //     filter.status = req.query.status; // Filter by status if not 'all'
    // }

    if (req?.query?.proctured) {
        filter.proctured = isProctured;
    }


    // const sortStage = req.query.sortBy
    //     ? [{
    //         $sort: {
    //             [(req.query.sortBy as string).split("-")[0]]:
    //                 (req.query.sortBy as string).split("-")[1] === 'desc' ? -1 as 1 | -1 : 1 as 1 | -1
    //         }
    //     }]
    //     : [];

    // const pipeline = [
    //     {
    //         $match: filter // Match documents based on the filter
    //     },
    //     {
    //         $project: {
    //             testAt: 1,
    //             proctured: 1,
    //             attendance: 1,
    //             performance: 1,
    //             totalMarks: 1,
    //             totalQuestions: 1,
    //             submissionType: 1,
    //             overallAttemptRate: 1,
    //             overallAttemptAccuracy: 1,
    //             averageScore: 1,
    //             technicalIssueRate: 1,
    //             incidents: 1,
    //             topScore: 1,
    //             lowestScore: 1,
    //             user: 1
    //         }
    //     },
    //     ...sortStage,
    //     {
    //         $group: {
    //             _id: "$user", // Group by user
    //             totalTests: { $sum: 1 },
    //             averageScore: { $avg: "$averageScore" },
    //             totalMarks: { $sum: "$totalMarks" },
    //             totalAttendance: { $sum: "$attendance" },
    //             overallAttemptRate: { $avg: "$overallAttemptRate" },
    //             overallAttemptAccuracy: { $avg: "$overallAttemptAccuracy" },
    //             topScore: { $max: "$topScore" },
    //             lowestScore: { $min: "$lowestScore" }
    //         }
    //     }
    // ];
    const pipeline = [
        {
            $match: filter // Match documents based on the filter (userId)
        },
        // {
        //     $addFields: {
        //         incidents_autosubmit: {
        //             $cond: {
        //                 if: { $eq: [isProctured, true] },  // If 'isProctured' is true
        //                 then: "$submissionType.incidents_autosubmit",  // Include this field
        //                 else: null  // Otherwise, set it to null
        //             }
        //         }
        //     }
        // },
        {
            $group: {
                _id: null, // Group all documents together
                overallAttemptRate: { $avg: "$overallAttemptRate" },
                // overallAttemptAccuracy: { $avg: "$overallAttemptAccuracy" },
                timeoutSubmission: { $avg: "$submissionType.timeout" },
                userSubmission: { $avg: "$submissionType.userSubmission" },
                inactive_autosubmit: { $avg: "$submissionType.inactive_autosubmit" },
                incidents_autosubmit: { $avg: "$submissionType.incidents_autosubmit" },
                // incidents_autosubmit: { $avg: "$incidents_autosubmit" }, 
                incidentsRatePerStudent: {$avg: "$incidentsRatePerStudent"},
                documents: {
                    $push: { // Push all documents into an array
                        testAt: "$testAt",
                        overallAttemptRate: "$overallAttemptRate",
                        overallAttemptAccuracy: "$overallAttemptAccuracy",
                        expectedAttendance: "$expectedAttendance",
                        attendance: "$attendance",
                    }
                }
            }
        },
        {
            $project: {
                _id: 0, // Exclude the _id field
                documents: 1, // Keep the documents array
                overallAttemptRate: 1,
                // overallAttemptAccuracy: 1,
                submissionType: {
                    timeoutSubmission: "$timeoutSubmission",
                    userSubmission: "$userSubmission",
                    inactive_autosubmit: "$inactive_autosubmit",
                    incidents_autosubmit: "$incidents_autosubmit"
                },
                incidentsRatePerStudent: "$incidentsRatePerStudent"
            }
        }
    ];

    // Execute the aggregation pipeline
    const analytics = await Analytics.aggregate(pipeline as PipelineStage[]); // Replace YourModel with your actual model

    // Send the response
    res.status(200).json({
        status: 'success',
        data: {
            analytics
        }
    });
})
