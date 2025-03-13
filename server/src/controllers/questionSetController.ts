import express, { NextFunction, Request, Response } from "express";
import { ProtectedRequest } from "../types/expressTypes";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { QuestionSet } from "../models/QuestionSetModel";

export const createQuestionSet = catchAsync(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const userId = req.auth?.userId;
    
    const newQuestionSet = await QuestionSet.create({...req.body, user: userId})
    if(!newQuestionSet) return next(new AppError("Error occured while test creation, please try again", 404));

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

    const questionSets = await QuestionSet.aggregate([
        { $match: { user: userId } },
        {
            $project: {
                name: 1,
                user: 1,
                createdAt: 1,
                totalQuestions: { $size: "$questions" }, // Calculate the size of the questions array
            }
        }
    ]);

    if(!questionSets) return next(new AppError("Error occured while test creation, please try again", 404));

    res.status(201).json({
        status: "success",
        data: {
            totalSets: questionSets?.length || 0 ,
            sets: questionSets,
        },
    });
});

export const getQuestionSet = catchAsync(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const setId = req.params.id;
    
    const questionSet = await QuestionSet.findById(setId);
    
    if(!questionSet) return next(new AppError("Error occured while test creation, please try again", 404));

    res.status(201).json({
        status: "success",
        data: {
            set: questionSet,
        },
    });
});