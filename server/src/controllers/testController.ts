import express, { NextFunction, Request, Response } from "express";
import { Test } from "../models/TestModel";
import { ProtectedRequest } from "../types/expressTypes";
import User from "../models/UserModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";


export const getAllTestsByUser = catchAsync(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const userId = req.auth.userId;

    const user = await User.findById(userId)
        .populate({ path: 'tests' })
    // .populate({ path: 'tests', select: 'questionSetId name status createdAt' })

    if (!user) return next(new AppError("No user found with that ID", 404));

    const tests = user.tests;

    // if (tests.length === 0) return next(new AppError("No test found with user", 404))


    res.status(200).json({
        status: "success",
        data: {
            tests,
        }
    });
})

export const createTest = catchAsync(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const userId = req.auth?.userId;

    const user = await User.findById(userId);
    if (!user) return next(new AppError("No user found with that ID", 404));

    const newTest = await Test.create(req.body)

    // await User.findByIdAndUpdate(userId, {
    //     $push: { tests: newTest._id }
    // })

    user.tests.push(newTest._id);

    await user.save();

    res.status(201).json({
        status: "success",
        data: {
            newTest,
        },
    });
});

export const getTest = catchAsync(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const test = await Test.findById(req.params.id)
    // console.log(test);

    if (!test) return next(new AppError("No test found with that ID", 404));

    res.status(200).json({
        status: "success",
        data: {
            test,
        },
    });
})

export const deleteTest = catchAsync(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const userId = req.auth.userId;
    const testId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return next(new AppError("No user found with that ID", 404));

    const test = await Test.findByIdAndDelete(testId)

    if (!test) return next(new AppError("No test found with that ID", 404));

    await User.updateOne(
        { _id: userId },
        { $pull: { tests: testId } }
    );

    // await User.findByIdAndUpdate(userId, {
    //     $pull: { tests: testId } // Remove the test ID from the user's tests array
    // }, { new: true });

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