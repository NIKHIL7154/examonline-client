import { Socket } from "socket.io";
import { ExamQuestion, ResultQuestion } from "../../types/testConductTypes";
import { addResultToQueue } from "../result/resultSubmissionService";
import { SocketEvents } from "./socketService";
import completedUsers from "./CompletedUsers";
import { TestType } from "../../models/TestModel";


export enum SubmissionMode {
    AUTO_SUBMITTED = "Auto Submitted by System due to Inactivity",
    TIME_ENDS = "Time Ends",
    SUBMITTED_BY_USER = "Submitted by User"
}
enum FinalStatus {
    Disqualified = "Disqualified",
    Completed = "Completed"
}
export type TestDetails = {
    testName: string;
    endAt: Date;
    startAt: Date;
    testDuration: number;

}
export function createTestDetails(test: TestType): TestDetails {
    return {
        testName: test.name,
        endAt: test.endAt,
        startAt: test.startAt,
        testDuration: test.durationInSec as number
    }

}

export type UserData = {
    socket: Socket;
    userUid: string;
    startAt: Date;
    duration: number; // in seconds
    timeLeft: number; // in seconds
    testId: string;
    tabSwitchCount: number;
    disconnectionCount: number;
    disqualified: boolean;
    submissionMode?: SubmissionMode;
    finalStatus?: FinalStatus;
    questions: ExamQuestion[];
    completed: boolean;
    inactiveTimeout?: NodeJS.Timeout;
    disconnected: boolean;
    userName: string;
    userEmail: string;
    anotherPersonCount: number;
    resultQuestions: ResultQuestion[];
    mobileDetectionCount: number;
    testDetails: TestDetails;
    imagesAnalyzed: number;
    cheatingCount: number;
};




const demoQuestions: ExamQuestion[] = [
    {

        questionTitle: "What is the capital of France?",

        userChoice: "B",
        visited: false,
        options: {
            A: "Paris",
            B: "London",
            C: "Berlin",
            D: "Madrid"
        }
    },
    {

        questionTitle: "What is the capital of France?",

        userChoice: "A",
        visited: false,
        options: {
            A: "Paris",
            B: "London",
            C: "Berlin",
            D: "Madrid"
        }
    }
];

const demoResultQuestions: ResultQuestion[] = [
    {

        questionTitle: "What is the capital of France?",
        options: {
            A: "Paris",
            B: "London",
            C: "Berlin",
            D: "Madrid"
        },
        correctOption: "A"
    },
    {

        questionTitle: "What is the capital of France?",
        options: {
            A: "Paris",
            B: "London",
            C: "Berlin",
            D: "Madrid"
        },
        correctOption: "A"
    }
];

export const demoUser: UserData = {
    socket: {} as Socket, // Mock socket object
    userUid: "user123",
    startAt: new Date(),
    duration: 3600, // 1 hour
    timeLeft: 3600, // 1 hour
    testId: "test123",
    tabSwitchCount: 2,
    disconnectionCount: 1,
    disqualified: false,
    questions: demoQuestions,
    completed: true,
    disconnected: true,
    userName: "NIKHlu",
    userEmail: "john.doe@example.com",
    anotherPersonCount: 1,
    resultQuestions: demoResultQuestions,
    mobileDetectionCount: 3,
    testDetails: {
        testName: "Demo Test",
        endAt: new Date(),
        startAt: new Date(),
        testDuration: 3600
    },
    cheatingCount: 0,
    imagesAnalyzed: 0,
};



const users = new Map<string, UserData>();

let globaltimer: NodeJS.Timeout | null = null;

function startGlobalTimer() {
    globaltimer = setInterval(() => {

        let updates: Record<string, { socket: Socket, timeLeft: number }> = {}; // Stores {token: timeLeft}

        if (users.size === 0) {
            if (globaltimer) {
                clearInterval(globaltimer);
                globaltimer = null;
            }
        }
        users.forEach((user, token) => {
            if (!user.completed && !user.disconnected) {

                user.timeLeft = Math.max(0, user.timeLeft - 1);

                if (user.timeLeft <= 0) {
                    user.socket.emit(SocketEvents.TEST_COMPLETED);
                    user.completed = true;
                    testCompletedForUser(token, SubmissionMode.TIME_ENDS);
                    user.socket.disconnect();

                    return;
                }

                updates[token] = {
                    socket: user.socket,
                    timeLeft: user.timeLeft
                }
            }
        });


        // updates to users
        for (const [token, { socket, timeLeft }] of Object.entries(updates)) {
            socket.emit("syncTime", { timeLeft });
        }
    }, 1000);
}


export function UserManagerStore() {
    return {
        startGlobalTimer,
        isGlobalTimerRunning: () => globaltimer ? true : false,
        addUser: (token: string, userData: UserData) => {
            users.set(token, userData);
        },

        getUser: (token: string): UserData => {
            return users.get(token) || {} as UserData;
        },

        removeUser: (token: string) => {
            users.delete(token);
        },

        hasUser: (token: string): boolean => {
            return users.has(token);
        },

        updateUser: (token: string, payload: Partial<UserData>) => {
            const user = users.get(token);
            if (!user) return;
            Object.assign(user, payload);
            users.set(token, user);
        },

        setInactiveUserTimeout: (token: string) => {
            const user = users.get(token);
            if (!user) return;

            if (user.inactiveTimeout) clearTimeout(user.inactiveTimeout);
            console.log("Setting inactive timeout for user", token);
            user.inactiveTimeout = setTimeout(() => {
                user.completed = true;
                console.log("User completed due to inactivity", token);
                testCompletedForUser(token, SubmissionMode.AUTO_SUBMITTED, user);
            }, 1000 * 10);
        },
        removeInactiveUserTimeout: (token: string) => {
            const user = users.get(token);
            if (!user) return;
            console.log("Removing inactive timeout for user", token);
            if (user.inactiveTimeout) clearTimeout(user.inactiveTimeout);
            user.inactiveTimeout = undefined;
        },
        tabSwitched: (token: string) => {
            const user = users.get(token);
            if (!user) return;
            user.tabSwitchCount++;
            users.set(token, user);
        },
        updateQuestions: (token: string, index: number, question: ExamQuestion) => {
            const user = users.get(token);
            if (!user) return;
            user.questions[index] = question;
            users.set(token, user);
        },
        testCompletedForUser

    };
}

function testCompletedForUser(token: string, mode: SubmissionMode, inactiveUser: UserData | null = null) {
    if (inactiveUser) {
        inactiveUser.submissionMode = mode;
        addResultToQueue(inactiveUser);
        completedUsers.add(inactiveUser.userUid, { testId: inactiveUser.testId, expiry: new Date(Date.now() + 1000 * 60) });
        users.delete(token);
        return;
    }
    const user = users.get(token);
    if (!user) return;
    user.completed = true;
    user.submissionMode = mode;
    //here are those users who completed the test 
    completedUsers.add(user.userUid, { testId: user.testId, expiry: user.testDetails.endAt });
    addResultToQueue(user);
    users.delete(token);
}
