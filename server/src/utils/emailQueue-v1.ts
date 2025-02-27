import Email from "./email";
import SimpleQueue from "./simpleQueue";

const EmailQueue = new SimpleQueue();
export default EmailQueue;

export const sendEmailTask = (user: { email: string; name: string }, url: string) => {
    return async () => {
        const email = new Email(user, url);
        await email.sendWelcome(); // or any other method you want to call
    };
};