import { Server, Socket } from "socket.io";
import { SubmissionMode, UserData, UserManagerStore } from "./UserManagerStore";
import { verifyEmailToken, verifyTestToken } from "../../config/jwt";
import { fetchTestDetailsAndQuestions, verifyTest } from "../../controllers/testConduct/examConductController";
import { ExamQuestion, TokenPayload } from "../../types/testConductTypes";
import { addResultToQueue } from "../result/resultSubmissionService";
import completedUsers from "./CompletedUsers";


const { addUser, getUser, hasUser, removeUser, tabSwitched, updateUser, removeInactiveUserTimeout, setInactiveUserTimeout, isGlobalTimerRunning, startGlobalTimer, updateQuestions, testCompletedForUser } = UserManagerStore();

export enum SocketEvents {
    SYNC = "sync",
    DISCONNECT = "disconnect",
    START_TEST = "startTest",
    SYNC_TIME = "syncTime",
    TEST_COMPLETED = "testCompleted",
    TAB_SWITCH = "tabSwitch",
    ANSWER_SUBMITTED = "answerSubmitted",
    INVALID_TEST = "invalidTest"
}


function invalidateTest(socket: Socket) {
    socket.emit(SocketEvents.INVALID_TEST, {});
    socket.disconnect();
}

export function SocketController(io: Server) {
    io.on("connection", async (socket) => {
        const token = socket.handshake.auth.token as string;
        if (!token) {
            invalidateTest(socket);
            return;
        }
        const payload = verifyTestToken(token);
        if (!payload) {
            invalidateTest(socket);
            return;
        }
        if (completedUsers.has(payload.uid)) {
            socket.emit(SocketEvents.TEST_COMPLETED);
            invalidateTest(socket);
            return;
        }

        const userUID = payload.uid;






        if (hasUser(userUID)) {
            removeInactiveUserTimeout(userUID);
            const user = getUser(userUID);
            if (user.completed) {
                socket.emit(SocketEvents.TEST_COMPLETED, {});
                socket.disconnect();
                return;
            }

            if (user.inactiveTimeout) {
                clearTimeout(user.inactiveTimeout);
            }
            updateUser(userUID, { socket: socket, disconnected: false });

            console.log("old user");
            socket.emit(SocketEvents.START_TEST, user.questions);

            // socket.emit("syncTime", { timeLeft: user.timeLeft });
        } else {
            const testAndQuestionData = await fetchTestDetailsAndQuestions(payload.testId);
            if (!testAndQuestionData) {
                invalidateTest(socket);
                return;
            }
            const { examQuestions, resultQuestions, testDetails } = testAndQuestionData;
            const newUser: UserData = {
                socket,
                userUid: userUID,
                startAt: new Date(),
                duration: testDetails.testDuration,
                timeLeft: testDetails.testDuration,
                testId: payload.testId,
                completed: false,
                disconnected: false,
                questions: examQuestions,
                resultQuestions,
                tabSwitchCount: 0,
                disconnectionCount: 0,
                disqualified: false,
                userName: payload.userName,
                userEmail: payload.userEmail,
                anotherPersonCount: 0,
                mobileDetectionCount: 0,
                testDetails: testDetails
                ,imagesAnalyzed: 0,
                cheatingCount: 0,
            };

            addUser(userUID, newUser);

            console.log("New user");

            socket.emit(SocketEvents.START_TEST, newUser.questions);

        }
        if (!isGlobalTimerRunning()) {
            startGlobalTimer();
        }

        socket.on(SocketEvents.TAB_SWITCH, () => {
            if (!hasUser(userUID)) {
                socket.disconnect();
                return;
            }
            tabSwitched(userUID);
        })

        socket.on(SocketEvents.DISCONNECT, () => {
            if (!hasUser(userUID)) return
            updateUser(userUID, { disconnected: true });
            console.log('Disconnected', getUser(userUID).userUid);

            setInactiveUserTimeout(userUID)
        });

        socket.on(SocketEvents.TEST_COMPLETED, async (data) => {
            if (!hasUser(userUID)) {
                socket.disconnect();
                return;
            }
            const user = getUser(userUID);
            if (user.completed) {
                socket.disconnect();
                return;
            }
            socket.emit(SocketEvents.TEST_COMPLETED, {});
            testCompletedForUser(userUID, SubmissionMode.SUBMITTED_BY_USER);
            socket.disconnect();
        });
        socket.on(SocketEvents.ANSWER_SUBMITTED, (data) => {
            if (!hasUser(userUID)) {
                socket.disconnect();
                return;
            }
            console.log("Answer submitted by user", getUser(userUID).userUid, data);
            updateQuestions(userUID, data.questionIndex, data.question);
        })
        socket.on(SocketEvents.TAB_SWITCH, () => {
            if (!hasUser(userUID)) {
                socket.disconnect();
                return;
            }
            tabSwitched(userUID);
        })


    });
}
