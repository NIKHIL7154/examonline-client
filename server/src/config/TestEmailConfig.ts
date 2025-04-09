import jwt, { SignOptions } from 'jsonwebtoken';
import { Test } from '../models/TestModel';
import { formatDateUTC } from '../utils/basicUtilityFunction';

interface EmailTokenPayload {
    testId: string;
    userEmail: string;
    userName: string;
    uid: string;
}

export interface testInfoEmailType {
    testName: string,
    testValidRange: string,
    testStartTime: number | null;
}


const signToken = (payload: EmailTokenPayload, testEndAt: Date) => {
    const secret = process.env.JWT_EMAIL_SECRET;

    // Convert tokenExpiresAt to a string if you want to specify it in a human-readable format
    const currentTime = Date.now();
    const differnceDuration = testEndAt.getTime() - currentTime;
    const tokenExpiresIn = Math.floor(differnceDuration / 1000)
    const timeInSec = tokenExpiresIn.toString() + 's'

    return jwt.sign(payload, secret as string, {
        expiresIn: timeInSec as SignOptions["expiresIn"], // Convert to seconds
    });
};




const testValidityTimeStamp = (startAt: Date, endAt: Date) => {
    return `${formatDateUTC(startAt)} until ${formatDateUTC(endAt)}`
};

const testDeadlineInMin = (testActiveAt: Date, testDActiveAt: Date, testDuration: number) => {
    const diffTimeSpan = Math.floor((testDActiveAt.getTime() - testActiveAt.getTime()) / 1000);
    const dur = testDuration;
    const spareTime = Math.floor((diffTimeSpan - dur) / 60);
    if (spareTime < 10)
        return (10 - spareTime);

    return null;
}

const formatTestInfoMail = (testName: string,startAt: Date, endAt: Date, testDur: number) => {    
    return {
        testName,
        testValidRange: testValidityTimeStamp(startAt, endAt),
        testStartTime: testDeadlineInMin(startAt, endAt, testDur),
    }
}

const updateForwardedEMailStatus = async (requestId: string) => {
    // console.log(`All emails have been sent for request ID: ${requestId}`);
    await Test.findByIdAndUpdate(requestId, { linksForwarded: "forwarded", status: "active" });
}

export {
    signToken,
    testValidityTimeStamp,
    testDeadlineInMin,
    updateForwardedEMailStatus,
    formatTestInfoMail,
}