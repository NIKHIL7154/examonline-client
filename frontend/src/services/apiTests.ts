import { createGetRequest } from "../features/authentication/apiHelper";
import { serverUrl } from "../utils/globals";

export const getTests = async (authToken: () => Promise<string | null>) => {
    try {
        const response = await createGetRequest(authToken, `${serverUrl}/tests`);
        return response;
    } catch (error) {
        console.error(error);
        throw new Error("Tests could not be loaded");
    }
};

export const getTest = async (authToken: () => Promise<string | null>, testId: string) => {
    try {
        const response = await createGetRequest(authToken, `${serverUrl}/tests/${testId}`);
        return response;
    } catch (error) {
        console.error(error);
        throw new Error("Test could not be loaded");
    }
};