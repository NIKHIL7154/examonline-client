import express, { Request, Response } from "express";
import { createList, getAllListByUser } from "../controllers/participantsController";

const router = express.Router();

router.route("/")
    .get(getAllListByUser)
    .post(createList)

export default router;