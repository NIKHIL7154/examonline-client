import express, {Request,Response} from "express";
import User from "../models/UserModel";
import { ProtectedRequest } from "../types/expressTypes";

const router=express.Router();

router.get("/",async (req:ProtectedRequest,res:Response)=>{
    try {
        
        const user=await User.findById(req.auth.userId);
        if(user){
            res.status(200).json({message:"User verified"})
        }else{
            res.status(404).json({message:"User data not found"})
        }
    } catch (error) {
        
    }
})
export default router;
