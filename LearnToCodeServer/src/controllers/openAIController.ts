import { Request, Response } from "express"
import { generateCodingProblemHelper } from "../integrations/openai"
import { sendSuccessResponse } from "../utils/sendSuccessResponse";
import { AppError } from "../utils/errors";

export const generateCodingProblem = async (req: Request, res: Response) => {
    try {
        const generatedProblem = await generateCodingProblemHelper();
        sendSuccessResponse(res, 200, "AI Genereated Problem successfully", generatedProblem)
    } catch (err) {
        console.error("Error in generateCodingProblem controller:", err);
        throw new AppError("Server Error", 500);
    }
}