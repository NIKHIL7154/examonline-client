import { createGetRequest, createPostRequest } from "../helpers/apiHelper";
import { serverUrl } from "../utils/constants";

export const getParticipants = async (authToken: () => Promise<string | null>) => {
    try {
        const response = await createGetRequest(authToken, `${serverUrl}/participants`);
        return response;
    } catch (error) {
        console.error(error);   
        throw new Error("Participants could not be loaded");
    }
}

export const addParticipant = async (authToken: () => Promise<string | null>, payload: unknown) => {
    try {
        const response = await createPostRequest(authToken, `${serverUrl}/participants`, payload);
        return response;
    } catch (error) {
        console.error(error);
        throw new Error("Participants could not be added");
    }
}