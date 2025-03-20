
// apiHelper.ts

import axios from "axios";

export async function createDeleteRequest(getToken: () => Promise<string | null>, endpoint: string, payload?: unknown) {
    try {
        const token = await getToken(); // Fetch the latest valid token

        if (!token) {
            throw new Error("No authentication token available");
        }

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        // If payload is provided, we will pass it as the body, else we omit it
        const response = await axios.delete(endpoint, payload ? { ...config, data: payload } : config);

        return response.data; // Return the response data

    } catch (error) {
        console.error("API Fetch Error:", error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || error.message);
        } else {
            throw new Error("Unknown error occurred during fetch");
        }
    }
}


// Helper function to make GET requests
export async function createPostRequest(getToken: () => Promise<string | null>, endpoint: string,payload:unknown) {
    try {
        const token = await getToken(); // Fetch the latest valid token

        if (!token) {
            throw new Error("No authentication token available");
        }

        const response = await axios.post(endpoint,payload,{
            
            headers: {
                
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response.data; // Return the response data

    } catch (error) {
        console.error("API Fetch Error:", error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || error.message);
        } else {
            throw new Error("Unknown error occurred during fetch");
        }
    }
}

// Helper function to make POST requests
export async function createGetRequest(getToken: () => Promise<string | null>, endpoint: string) {
    try {
        const token = await getToken(); // Fetch the latest valid token

        if (!token) {
            throw new Error("No authentication token available");
        }

        const response = await axios.get(endpoint, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response.data; // Return the response data

    } catch (error) {
        console.error("API Post Error:", error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || error.message);
        } else {
            throw new Error("Unknown error occurred during post");
        }
    }
}
