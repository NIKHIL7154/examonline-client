import { Request,Response,NextFunction } from "express";
import { ProtectedRequest } from "../types/expressTypes";


export function verifyUserWithToken(req:ProtectedRequest,res:Response,next:NextFunction){
    
    if(req.auth && req.auth.userId && req.auth.userId.length>3){
        next();
    }else{
        res.status(401).send("Unauthorized");
    }

}