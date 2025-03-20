import { createGetRequest, createPostRequest } from "../features/authentication/apiHelper";
import { PAGE_SIZE, serverUrl } from "../utils/globals";

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

export const getQuestionSets = async (authToken: () => Promise<string | null>, sortBy: string | undefined = undefined, page: number | undefined = undefined) => {
    try {
        let url = `${serverUrl}/questionSets`
        const queryParams = [];

        if (sortBy) queryParams.push(`sortBy=${sortBy}`);
        if (page) queryParams.push(`page=${page}&limit=${PAGE_SIZE}`);
        if (queryParams.length > 0) {
            url += `?${queryParams.join("&")}`;
        }

        const response = await createGetRequest(authToken, url);
        return response;
    } catch (error) {
        console.error(error);
        throw new Error("Question Sets could not be loaded");
    }
};
export const getQuestionSet = async (authToken: () => Promise<string | null>, setId: string) => {
    try {
        const response = await createGetRequest(authToken, `${serverUrl}/questionSets/${setId}`);
        return response;
    } catch (error) {
        console.error(error);
        throw new Error("Question Set could not be loaded");
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