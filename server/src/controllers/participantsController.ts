import express, { NextFunction, Request, Response } from "express";
import { ProtectedRequest } from "../types/expressTypes";
import catchAsync from "../utils/catchAsync";
import { Participants } from "../models/ParticipantsModel";
import AppError from "../utils/appError";

export const getAllListByUser = catchAsync(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const userId = req.auth.userId;

    const participants = await Participants.find({user: userId});    
    
    res.status(200).json({
        status: "success",
        data: {
            totalList: participants.length,
            lists: participants,
        }
    });
})


export const createList = catchAsync(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const userId = req.auth?.userId;
        
    const newParticipants = await Participants.create({...req.body, user: userId});
    if(!newParticipants ) return next(new AppError("No user found with that ID", 404));

    res.status(201).json({
        status: "success",
        data: {
            participants: newParticipants,
        },
    });
});

// export const deleteList = catchAsync(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    
//     const participants = Participants.findByIdAndDelete(req.params.id);
//     if(!participants) return next(new AppError("No user found with that ID", 404));

//     res.status(204).json({
//         status: "success",
//         data: null
//     });
// });
