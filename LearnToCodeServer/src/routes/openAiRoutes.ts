import express from "express";
import { generateCodingProblem } from "../controllers/openAIController";

const router = express.Router();

router.post('/generate-coding-problem', generateCodingProblem);

export default router;