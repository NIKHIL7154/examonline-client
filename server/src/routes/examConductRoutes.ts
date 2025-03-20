import express, { NextFunction, Request, Response } from "express";
import { verifyEmailToken, generateTestToken, generateEmailToken } from "../config/jwt";
import { TokenPayload } from "../types/testConductTypes";
import { verifyTest } from "../controllers/testConduct/examConductController";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

const router = express.Router();


router.post("/", catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { token } = req.body;
    if (!token) {
        return next(new AppError("Unauthorised : No Token provided", 401));
    }

    const testData = verifyEmailToken(token);
    if (!testData || !testData.testId || !testData.userEmail || !testData.userName || !testData.uid) {
        return next(new AppError("Unauthorised : Invalid Token", 401));
    }

    const validTest = await verifyTest(testData);
    if (!validTest) {
        return next(new AppError("Test Expired", 403));
    }

    res.status(200).json({
        status: "success",
        data: {
            testToken:generateTestToken(testData, "4h"),
            questionCount: validTest.questionSet.length,
            duration: validTest.startAt,
        },
    });


}))



//test route to create token
router.post("/create", async (req: Request, res: Response) => {
    const payload = req.body;
    const token = generateEmailToken(payload, "8h");
    res.json({ token });

})

export default router;
