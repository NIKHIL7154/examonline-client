import express, { Request, Response } from "express";
import { createTest, deleteTest, getAllTestsByUser, getTest, updateTest } from "../controllers/testController";


const router = express.Router();

router.route("/")
    .get(getAllTestsByUser)
    .post(createTest);

router.route("/:id")
    .get(getTest)
    .delete(deleteTest)
    .patch(updateTest)

export default router;