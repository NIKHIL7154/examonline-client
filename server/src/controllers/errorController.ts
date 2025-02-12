import mongoose from "mongoose";
import { ProtectedRequest } from "../types/expressTypes";
import AppError from "../utils/appError";
import { NextFunction, Request, Response } from "express";
import { MongoServerError } from 'mongodb';


const handleCastErrorDB = (err: mongoose.Error.CastError) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: MongoServerError) => {
    const value = err.keyValue.name;
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = (err: mongoose.Error.ValidationError) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    // const message = `Invalid input data.`;
    return new AppError(message, 400);
};

const sendErrorDev = (err: any, res: Response) => {

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack,
    })
}

const sendErrorProd = (err: any, res: Response) => {
    // Operation, can be sent to client
    if (err?.isOperational) {

        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })

    // Programming or other unknown error: dont leak error detail
    } else {
        console.error("ERROR 💥", err);

        res.status(500).json({
            status: "error",
            message: "Something went very wrong!",
        })
    }

}

export default (err: any, req: ProtectedRequest, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (process.env.NODE_ENV === "development")
        sendErrorDev(err, res);

    else if (process.env.NODE_ENV === "production") {

        let error = Object.create(err);

        if (error.name === "CastError") error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === "ValidationError") error = handleValidationErrorDB(error);

        sendErrorProd(error, res)
    }

}