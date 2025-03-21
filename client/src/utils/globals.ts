import getEnvironmentVariable from "./envManager";

export const serverUrlAuth = getEnvironmentVariable("VITE_USER_VERIFICATION");
export const serverUrl = getEnvironmentVariable("VITE_SERVER_URL");
export const PAGE_SIZE = getEnvironmentVariable("VITE_PAGE_SIZE");
