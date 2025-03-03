import { createGetRequest, createPostRequest } from "../helpers/apiHelper";
import { serverUrl } from "../utils/constants"

interface QuestionType {
    questionTitle: string;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
    },
    correctOption: string;
}

interface QuestionSetType {
    name: string;
    questions: QuestionType[];
}

export const getQuestionSets = async (authToken: () => Promise<string | null>) => {
    try {
        const response = await createGetRequest(authToken, `${serverUrl}/questionSets`);
        return response;
    } catch (error) {
        console.error(error);
        throw new Error("Question Sets could not be loaded");
    }
};

export const createQuestionSet = async (authToken: () => Promise<string | null>, payload: QuestionSetType) => {
    try {
        const response = await createPostRequest(authToken, `${serverUrl}/questionSets`, payload);
        return response;
    } catch (error) {
        console.error(error);
        throw new Error("Question Sets could not be loaded");
    }
};