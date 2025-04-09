import express, { Request, Response } from "express";
import { createTest, deleteTest, getAllTestsByUser, getTest, sendTestLink, updateTest } from "../controllers/testController";


const router = express.Router();

router.route("/")
    .get(getAllTestsByUser)
    .post(createTest);

// router.route("/hostedTestCount")
//     .get(getHostedTestCount);

router.route("/:id")
    .get(getTest)
    .delete(deleteTest)
    .patch(updateTest)

router.route("/shareLinks/:id")
    .get(sendTestLink)

export default router;