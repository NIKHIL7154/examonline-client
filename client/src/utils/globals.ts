export const serverUrlAuth = `http://localhost:2121/api/verifyuser`;
export const serverUrl = `http://localhost:2121/api/v1/user`;
export const PAGE_SIZE = 10;

export const simulateOutsideClick = () => {
    const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
    });
    document.body.dispatchEvent(event); // Dispatching an event on the document to simulate an outside click
};