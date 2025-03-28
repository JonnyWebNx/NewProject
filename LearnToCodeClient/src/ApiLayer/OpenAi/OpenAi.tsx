import api from "../../util/AxiosInstance";
import { ApiErrorHandler } from "../../utils/errorHandler";

export const getCodingProblem = async () => {
    try {
        const generatedProblem = await api.post('/openAi/generate-coding-problem');
        return generatedProblem;
    } catch (error) {
        throw ApiErrorHandler.handle(error);
    }
}