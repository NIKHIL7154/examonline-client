import express, { NextFunction, Request, Response } from "express";
import { Test } from "../models/TestModel";
import { ProtectedRequest } from "../types/expressTypes";
import User from "../models/UserModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

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

    const tests = await Test.find({ user: userId });

    res.status(200).json({
        status: "success",
        data: {
            totalTests: tests.length,
            tests,
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
    const test = await Test
        .findById(req.params.id)
        .populate({path: "questionSet participants"})

    if (!test) return next(new AppError("No test found with that ID", 404));

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