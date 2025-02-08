import express, { Request, Response } from "express";
import { ProtectedRequest } from "../types/expressTypes";
import { getTestsFromDatabase } from "../controllers/fetchTests";




const router = express.Router();
router.get("/", async (req: ProtectedRequest, res: Response) => {
    const userId = req.auth?.userId;

    const tests = await getTestsFromDatabase(userId);
    if (tests) {
        res.status(200).json(tests);
        return;
    }

    res.status(404).json({ message: "Tests not found on server" });





})

export default router;