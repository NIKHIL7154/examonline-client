import express, { Request, Response } from "express";
import { createQuestionSet } from "../controllers/questionSetController";


const router = express.Router();

router.route("/")
    // .get(getAllTestsByUser)
    .post(createQuestionSet);

// router.route("/:id")
//     .get(getTest)
//     .delete(deleteTest)
//     .patch(updateTest)

export default router;
