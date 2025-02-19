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