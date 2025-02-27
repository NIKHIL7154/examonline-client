import { Request, Response, NextFunction } from "express";
import { ProtectedRequest } from "../types/expressTypes";



export function verifyTestUser(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized' });
        return
    }

    const token = authHeader.split(' ')[1];
    (req as ProtectedRequest).auth = { userId: token };
    next()

}