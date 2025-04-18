import express, { NextFunction, Request, Response } from "express";
import { ProtectedRequest } from "../types/expressTypes";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { QuestionSet } from "../models/QuestionSetModel";
import { PipelineStage } from "mongoose";

export const createQuestionSet = catchAsync(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const userId = req.auth?.userId;

    const newQuestionSet = await QuestionSet.create({ ...req.body, user: userId })
    if (!newQuestionSet) return next(new AppError("Error occured while test creation, please try again", 404));

    res.status(201).json({
        status: "success",
        data: {
            set: newQuestionSet,
        },
    });
});

export const getAllSetsByUser = catchAsync(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const userId = req.auth?.userId;

    const paginationStage = [];

    if (req.query.page && req.query.limit) {
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;
        const skip = (page - 1) * limit;

        paginationStage.push({ $skip: skip });
        paginationStage.push({ $limit: limit });
    }

    const sortStage = req.query.sortBy
        ? [{
            $sort: {
                [(req.query.sortBy as string).split("-")[0]]:
                    (req.query.sortBy as string).split("-")[1] === 'desc' ? -1 as 1 | -1 : 1 as 1 | -1
            }
        }]
        : [];

    const pipeline: PipelineStage[] = [
        { $match: { user: userId } },
        {
            $project: {
                name: 1,
                user: 1,
                createdAt: 1,
                totalQuestions: { $size: "$questions" }, // Calculate the size of the questions array
            }
        },
        {
            $facet: {
                metadata: [{ $count: "totalRecords" }], // Count total documents
                data: [
                    ...sortStage,
                    ...paginationStage,
                ]
            }
        },
        {
            $project: {
                totalRecords: { $arrayElemAt: ["$metadata.totalRecords", 0] },
                data: 1
            }
        }
    ];

    const questionSets = await QuestionSet.aggregate(pipeline);
    if (!questionSets) return next(new AppError("Error occured while test creation, please try again", 404));

    const totalSets = questionSets[0]?.totalRecords || 0;
    const paginatedData = questionSets[0]?.data || [];

    res.status(201).json({
        status: "success",
        data: {
            totalSets,
            sets: paginatedData,
        },
    });
});

export const getQuestionSet = catchAsync(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const setId = req.params.id;

    const questionSet = await QuestionSet.findById(setId);

    if (!questionSet) return next(new AppError("Error occured while test creation, please try again", 404));

    res.status(201).json({
        status: "success",
        data: {
            set: questionSet,
        },
    });
});