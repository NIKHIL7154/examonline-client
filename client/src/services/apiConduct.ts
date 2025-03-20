
import axios from "axios";
import { serverUrl } from "../utils/globals";

type ExamConductPayload={
    token:string;
}

export const validateExam=async (payload:ExamConductPayload)=>{
    try {
        const response= await axios.post(`${serverUrl}/exam/validate`,payload);
        return response.data;
    } catch (error) {
        console.error(error);  
        throw new Error("Exam could not be validated");
        
    }
}