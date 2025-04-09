import express, { Request, Response } from "express";
import { getAnalyticsByUser, getHostedTestCount } from "../controllers/analyticsController";

const router = express.Router();

router.route("/")
.get(getAnalyticsByUser)

router.route("/hostedTestCount")
    .get(getHostedTestCount)


export default router;
