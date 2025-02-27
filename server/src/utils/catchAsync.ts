import { Request, Response, NextFunction } from 'express';
import { ProtectedRequest } from '../types/expressTypes';

const catchAsync =(fn: (req: ProtectedRequest, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: ProtectedRequest, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
};

export default catchAsync;