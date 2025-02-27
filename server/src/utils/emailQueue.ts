import { testInfoEmailType } from "../config/TestEmailConfig";
import Email from "./email";
import SimpleQueue from "./simpleQueue";
import { EventEmitter } from 'events';

const emailProcessingEmitter = new EventEmitter();
const EmailQueue = new SimpleQueue();
// store ID based email count, string = id, number = email list length
const requestTaskCount = new Map<string, number>();

// Function to initialize task count for a request
const initializeTaskCount = (requestId: string, count: number) => {
    requestTaskCount.set(requestId, count);
};

// Function to decrement task count and emit event if done
const decrementTaskCount = (requestId: string) => {
    const count = requestTaskCount.get(requestId);
    if (count !== undefined) {
        requestTaskCount.set(requestId, count - 1);
        // Emit event if all tasks are done
        if (count - 1 === 0) {
            emailProcessingEmitter.emit(`emailsProcessed:${requestId}`, requestId);
            requestTaskCount.delete(requestId);
        }
    }
};


const sendEmailTask = (user: { email: string; name: string }, url: string, testInfoEmail: testInfoEmailType,requestId: string) => {
    return async () => {
        const email = new Email(user, url);
        await email.sendTestLink(testInfoEmail); // or any other method you want to call
        decrementTaskCount(requestId);
    };
};

export default EmailQueue;
export { 
    emailProcessingEmitter, 
    initializeTaskCount, 
    decrementTaskCount, 
    sendEmailTask,
};