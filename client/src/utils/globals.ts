
import getEnvironmentVariable from "./envManager";

export const serverUrlAuth = getEnvironmentVariable("VITE_USER_VERIFICATION");
export const serverUrl = getEnvironmentVariable("VITE_SERVER_URL");
export const PAGE_SIZE:number = parseInt(getEnvironmentVariable("VITE_PAGE_SIZE"));

export const simulateOutsideClick = () => {
    const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
    });
    document.body.dispatchEvent(event); // Dispatching an event on the document to simulate an outside click
};

