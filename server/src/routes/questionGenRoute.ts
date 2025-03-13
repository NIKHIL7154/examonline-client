import express from 'express';
import { GenerateQuestions } from '../controllers/questionGenerator/questionGenerationController';

const router = express.Router();

router.post("/",GenerateQuestions)

export default router;