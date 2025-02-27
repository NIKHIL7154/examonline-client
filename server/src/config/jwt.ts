import jwt, { SignOptions } from 'jsonwebtoken';
import { TokenPayload } from '../types/testConductTypes';

const emailSecretKey: jwt.Secret = 'very secret recipe'; // Replace with your actual secret key

const testSecretKey: jwt.Secret='test secret recipe';

export const generateEmailToken = (payload: TokenPayload, expiry: SignOptions["expiresIn"]): string => {
    return jwt.sign(payload, emailSecretKey, { expiresIn: expiry });
};

// console.log(generateEmailToken({testId:"67b36662b495c90397c5a45d",userEmail:"nikhil.com",userName:"nikhil",uid:"abcd"},"8h"))

export const verifyEmailToken =(token: string): TokenPayload | null => {
    try {
        const { iat, exp, ...payload } = jwt.verify(token, emailSecretKey) as TokenPayload & { iat?: number; exp?: number };
        return payload;
    } catch (error) {
        console.log(error);
        return null;
    }
};


export const generateTestToken = (payload: TokenPayload, expiry: SignOptions["expiresIn"]): string => {
    return jwt.sign(payload, testSecretKey, { expiresIn: expiry });
};

export const verifyTestToken =(token: string): TokenPayload => {
    try {
        console.log("verifying token");
        // const payload:TokenPayload = jwt.verify(token, testSecretKey) as TokenPayload;
        const payload:TokenPayload = {
            testId:"67b993108e1ca35da449d5e6",
            userEmail:token,
            userName:"NIKHIL",
            uid:"jsbhsbhsbs"
        }
        console.log(payload);
        return payload;
    } catch (error) {
        throw new Error("Invalid Token");
    }
}


// console.log(generateEmailToken({testId:"67b36662b495c90397c5a45d",userEmail:"nikhil@gmail.com",userName:"nikhil"},"8h"));