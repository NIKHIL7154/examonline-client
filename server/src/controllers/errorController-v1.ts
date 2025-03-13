import mongoose from "mongoose";
import { ProtectedRequest } from "../types/expressTypes";
import AppError from "../utils/appError";
import { NextFunction, Request, Response } from "express";
import { MongoServerError } from 'mongodb';


const handleCastErrorDB = (err: mongoose.Error.CastError) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err : MongoServerError) => {
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

const sendErrorDev = (err: any, res: Response, statusCode: number, status: string, message: string) => {

    res.status(statusCode).json({
        status,
        message,
        error: err,
        stack: err.stack,
    })
}

const sendErrorProd = (err: any, res: Response, statusCode: number, status: string, message: string) => {
    // Operation, can be sent to client
    if (err?.isOperational) {
        
        res.status(statusCode).json({
            status,
            message,
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

const errorController = (err: any, req: ProtectedRequest, res: Response, next: NextFunction) => {
// export default (err: any, req: ProtectedRequest, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let status = 'error';
    let message = 'An unknown error occurred';

    if (err instanceof AppError) {
        // Handle specific AppError types (e.g., ValidationError, NotFoundError)
        statusCode = err.statusCode;
        status = err.status;
        message = err.message;
    }

    else if (err instanceof Error) {
        message = err.message;
    }

    if (process.env.NODE_ENV === "development")
        sendErrorDev(err, res, statusCode, status, message);

    else if (process.env.NODE_ENV === "production"){
        
        let error = Object.create(err);

        if (error.name === "CastError") error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === "ValidationError") error = handleValidationErrorDB(error);
        
        // check error type
        if (error instanceof AppError) {
            // Handle specific AppError types (e.g., ValidationError, NotFoundError)
            statusCode = error.statusCode;
            status = error.status;
            message = error.message;
        }
    
        else if (error instanceof Error) {
            message = error.message;
        }
        
        sendErrorProd(error, res, statusCode, status, message)
    }

}