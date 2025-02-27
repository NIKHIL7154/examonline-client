import express, { Request, Response } from "express";
import { createQuestionSet, getAllSetsByUser, getQuestionSet } from "../controllers/questionSetController";


const router = express.Router();

router.route("/")
    .get(getAllSetsByUser)
    .post(createQuestionSet);

router.route("/:id")
    .get(getQuestionSet)
//     .delete(deleteTest)
//     .patch(updateTest)

export default router;
