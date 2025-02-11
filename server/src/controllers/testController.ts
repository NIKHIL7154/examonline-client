import express, { Request, Response } from "express";
import { Test } from "../models/TestModel";
import { ProtectedRequest } from "../types/expressTypes";
import User from "../models/UserModel";

export const getAllTestsByUser = async (req: ProtectedRequest, res: Response) => {

    try {
        const userId = req.auth.userId;

        const user = await User.findById(userId)
            .populate({ path: 'tests' })
        // .populate({ path: 'tests', select: 'questionSetId name status createdAt' })

        if (!user) {
            throw new Error('User not found');
        }
        const tests = user.tests;

        if (tests.length === 0) {
            throw new Error('No test created');
        }


        res.status(200).json({
            status: "success",
            data: {
                tests,
            }
        });
    } catch (error: unknown) {
               
        if (error instanceof Error) {
            res.status(404).json({
                status: "error",
                data: {
                    error: error.message,  // now you can safely access error.message
                }
            });
        } else {
            // Handle cases where `error` is not an instance of `Error`
            res.status(404).json({
                status: "error",
                data: {
                    message: 'An unknown error occurred', // fallback message
                    error,
                }
            });
        }
    }
}

export const createTest = async (req: ProtectedRequest, res: Response) => {
    // console.log(req.body);
    const userId = req.auth?.userId;
    try {

        const newTest = await Test.create(req.body)
        // console.log(newTest);
        await User.findByIdAndUpdate(userId, {
            $push: { tests: newTest._id }
        })

        res.status(201).json({
            status: "success",
            data: {
                newTest,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            data: {
                message: "Error creating Test",
                error,
            }
        })
    }
}

export const getTest = async (req: Request, res: Response) => {
    // console.log(req.params.id);
    try {

        const test = await Test.findById(req.params.id)
        // console.log(test);

        res.status(200).json({
            status: "success",
            data: {
                test,
            },
        });
    }
    catch (error) {
        res.status(404).json({
            status: "fail",
            data: {
                message: "Test does not exist",
                error,
            }
        })
    }
}

export const deleteTest = async (req: ProtectedRequest, res: Response) => {
    // console.log(req.params.id);
    try {
        const userId = req.auth.userId;
        const testId = req.params.id
        // const test = await Test.findByIdAndDelete(req.params.id)
        const test = await Test.findByIdAndDelete(testId)

        if (!test) {
            throw new Error('Test not found');
        }

        await User.findByIdAndUpdate(userId, {
            $pull: { tests: testId } // Remove the test ID from the user's tests array
        }, { new: true });

        res.status(204).json({
            status: "success",
            data: null,
        });
    }
    catch (error) {
        res.status(404).json({
            status: "fail",
            data: {

                error,
            }
        })
    }
}

export const updateTest = async (req: Request, res: Response) => {
    // console.log(req.params.id);
    try {

        // const test = await Test.findByIdAndDelete(req.params.id)
        const test = await Test.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })

        res.status(200).json({
            status: "success",
            data: {
                test,
            },
        });
    }
    catch (error) {
        res.status(404).json({
            status: "fail",
            data: {
                message: "Test does not exist",
                error,
            }
        })
    }
}