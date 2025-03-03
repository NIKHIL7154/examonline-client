import { createGetRequest } from "../helpers/apiHelper";
import { serverUrl } from "../utils/constants"

export const getQuestionSets = async (authToken: () => Promise<string | null>) => {
    try {
        const response = await createGetRequest(authToken, `${serverUrl}/questionSets`);
        return response;
    } catch (error) {
        console.error(error);
        throw new Error("Question Sets could not be loaded");
    }
};