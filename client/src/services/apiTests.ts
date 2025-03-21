import { createDeleteRequest, createGetRequest } from "../features/authentication/apiHelper";
import { PAGE_SIZE, serverUrl } from "../utils/globals";

type Filter = {
    field: string
    value: string
}

export const getTests = async (
    authToken: () => Promise<string | null>,
    filter: Filter | undefined = undefined,
    sortBy: string | undefined = undefined,
    page: number | undefined = undefined) => {
    try {
        let url = `${serverUrl}/tests`

        const queryParams = [];

        if (filter) queryParams.push(`${filter.field}=${filter.value}`);
        if (sortBy) queryParams.push(`sortBy=${sortBy}`);
        if (page) queryParams.push(`page=${page}&limit=${PAGE_SIZE}`);

        if (queryParams.length > 0) {
            url += `?${queryParams.join("&")}`;
        }

        const response = await createGetRequest(authToken, url);
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

export const getActivateTest = async (authToken: () => Promise<string | null>, testId: string) => {
    try {
        const response = await createGetRequest(authToken, `${serverUrl}/tests/shareLinks/${testId}`);
        return response;
    } catch (error) {
        console.error(error);
        throw new Error("Test could not be loaded");
    }
};

export const deleteTest = async (authToken: () => Promise<string | null>, testId: string) => {
    try {
        const response = await createDeleteRequest(authToken, `${serverUrl}/tests/${testId}`);
        return response;
    } catch (error) {
        console.error(error);
        throw new Error("Test could not be loaded");
    }
};