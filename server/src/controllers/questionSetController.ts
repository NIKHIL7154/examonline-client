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
            test: newQuestionSet,
        },
    });
});

export const getAllSetsByUser = catchAsync(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const userId = req.auth?.userId;
    
    const questionSets = await QuestionSet.find({user: userId}).select("-questions")
    if(!questionSets) return next(new AppError("Error occured while test creation, please try again", 404));

    res.status(201).json({
        status: "success",
        totalSets: questionSets?.length || 0 ,
        data: {
            test: questionSets,
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
            test: questionSet,
        },
    });
});