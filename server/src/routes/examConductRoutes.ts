import express, { NextFunction, Request, Response } from "express";
import { verifyEmailToken, generateTestToken, generateEmailToken } from "../config/jwt";
import { TokenPayload } from "../types/testConductTypes";
import { verifyTest } from "../controllers/testConduct/examConductController";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { signToken } from "../config/TestEmailConfig";
import completedUsers from '../services/sockets/CompletedUsers';

const router = express.Router();

type NullMessage=string;
router.post("/", catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { token } = req.body;
    if (!token) {
        return next(new AppError("Unauthorised : No Token provided", 401));
    }

    const testData = verifyEmailToken(token);
    console.log(testData,"testData");
    if (!testData || !testData.testId || !testData.userEmail || !testData.userName || !testData.uid) {
        return next(new AppError("Unauthorised : Invalid Token", 401));
    }
    if(completedUsers.has(testData.uid)){
        return next(new AppError("Test already completed", 403));
    }

    const testValidity = await verifyTest(testData);
    if (typeof testValidity==="string") {
        return next(new AppError(testValidity, 404));
        
    }
    const questionCount=testValidity.questionSet.reduce((acc,curr)=>acc+curr.questions.length,0);

    res.status(200).json({
        status: "success",
        data: {
            testToken:generateTestToken(testData, "4h"),
            userName: testData.userName,
            uid: testData.uid,
            questionCount,
            duration: (testValidity.durationInSec as number /60) //in minutes,
        },
    });


}))



//test route to create token
router.post("/create", async (req: Request, res: Response) => {
    const payload = req.body;
    const token = generateEmailToken(payload, "10h");
    // const token = signToken(payload, new Date(Date.now() + 1000 * 60 * 60 * 10));
    res.json({ token });

})

export default router;
