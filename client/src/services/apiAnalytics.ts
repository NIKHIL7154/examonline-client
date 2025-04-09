import { createGetRequest } from "../features/authentication/apiHelper";
import { serverUrl } from "../utils/globals";

type Filter = {
    field: string
    value: string
}

export const getTestCount = async (authToken: () => Promise<string | null>) => {
    try{
        const url = `${serverUrl}/analytics/hostedTestCount`
        const response = await createGetRequest(authToken, url);
        return response;
    }catch (error) {
        console.error(error);
        throw new Error("Test count could not be loaded");
    }
}

export const getAnalytics = async (
    authToken: () => Promise<string | null>,
    filter: Filter,
    // sortBy: string | undefined = undefined,
    // page: number | undefined = undefined
) => {
    try {
        // const url = `${serverUrl}/analytics`
        let url = `${serverUrl}/analytics`

        const queryParams = [];

        if (filter) queryParams.push(`${filter.field}=${filter.value}`);
        // if (sortBy) queryParams.push(`sortBy=${sortBy}`);
        // if (page) queryParams.push(`page=${page}&limit=${PAGE_SIZE}`);

        if (queryParams.length > 0) {
            url += `?${queryParams.join("&")}`;
        }

        const response = await createGetRequest(authToken, url);
        return response;
    } catch (error) {
        console.error(error);
        throw new Error("Analytics could not be loaded");
    }
};

