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

    // const questionSets = await QuestionSet.find({user: userId}).select("-questions")

    // const questionSets = await QuestionSet.aggregate([
    const pipeline: PipelineStage[] = [
        { $match: { user: userId } },
        {
            $project: {
                name: 1,
                user: 1,
                createdAt: 1,
                totalQuestions: { $size: "$questions" }, // Calculate the size of the questions array
            }
        }
    ];

    if (req.query.sortBy) {
        const sortField = (req.query.sortBy as string).split("-");
        console.log(sortField);

        // const sortOrder = req.query.order === 'desc' ? -1 : 1; // Default ascending
        const sortOrder = sortField[1] === 'desc' ? -1 : 1; // Default ascending
        pipeline.push({ $sort: { [sortField[0]]: sortOrder } });
    }

    // **Pagination (optional)**
    if (req.query.page && req.query.limit) {
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;
        const skip = (page - 1) * limit;

        pipeline.push({ $skip: skip });
        pipeline.push({ $limit: limit });
    }

    const questionSets = await QuestionSet.aggregate(pipeline);
    if (!questionSets) return next(new AppError("Error occured while test creation, please try again", 404));

    res.status(201).json({
        status: "success",
        data: {
            totalSets: questionSets?.length || 0,
            sets: questionSets,
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