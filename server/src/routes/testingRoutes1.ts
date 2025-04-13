import express, { Request, Response } from 'express';
import { Participants } from '../models/ParticipantsModel';
import { Test } from '../models/TestModel';
import catchAsync from '../utils/catchAsync';
import { generateEmailToken } from '../config/jwt';
import AppError from '../utils/appError';
import { TokenPayload } from '../types/testConductTypes';
const router= express.Router();

router.post("/createtest",catchAsync(async (req:Request,res:Response)=>{
    const {name,questionSet,proctoring,resumable,participants,user} = req.body;
    const startAt = new Date();
    const minutes = startAt.getMinutes();
    
    const roundedMinutes = (Math.ceil(minutes / 5) * 5);
    startAt.setMinutes(roundedMinutes, 0, 0);
    const durationInSec = 3600; // 1 hour in seconds
    const endAt = new Date(startAt.getTime() + durationInSec * 1000 * 48);
    const test= new Test({
        name,
        questionSet,
        status: "active",
        startAt,
        durationInSec,
        endAt,
        user:user.uid,
        proctoring,
        resumable,
        participants,
        createdBy:user.uid,
        linksForwarded: "pending",
        tabSwitchLimit: 1,
    });
    
    const newtest=await test.save();
    if(!newtest){
        return new AppError("Test not created",500);
    }
    const payload:TokenPayload={
        testId:newtest._id.toString() as string,
        userEmail:user.userEmail,
        userName:user.userName,
        uid:user.uid
    }
    console.log(payload);
    const token=generateEmailToken(payload,"48h")
  
    res.status(200).json({message:"test created",token, testId:newtest._id.toString() as string});
}))

export default router;

