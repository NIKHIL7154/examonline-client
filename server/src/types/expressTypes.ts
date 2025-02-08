import { Request } from "express";

export interface ProtectedRequest extends Request{
    auth?:any;
}