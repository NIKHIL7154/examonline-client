import { Server, Socket } from "socket.io";
import { UserData, UserManagerStore } from "./UserManagerStore-v1";


const { addUser, getUser, hasUser, removeUser, updateUser, startTimer ,removeTimer} = UserManagerStore();


export function SocketController(io: Server) {
    io.on("connection", (socket) => {
        const token = socket.handshake.auth.token as string;
        console.log("connected", token);
        if (!token) {
            socket.disconnect();
            return;
        }

        if (hasUser(token)) {
            const user = getUser(token);
            if(user.completed){
                socket.emit("testCompleted");
                socket.disconnect();
                return;
            }

            if(user.inactiveTimeout){
                clearTimeout(user.inactiveTimeout);
            }
            updateUser(token, { socketId: socket.id });
            startTimer(token, (leftTime) => {
                socket.emit("syncTime", { timeLeft: leftTime });
            });
            console.log("old user", user);
            socket.emit("startTest",user.questions );
            // socket.emit("syncTime", { timeLeft: user.timeLeft });
        } else {
            const newUser: UserData = {
                socketId: socket.id,
                userUid: token,
                startAt: new Date(),
                duration: 600,
                timeLeft: 600,
                testId: "67aaf49a330363ccca727177",
                completed: false,
                questions: [
                    {
                        question: "What is the capital of India?",
                        options: { A: "Delhi", B: "Mumbai", C: "Kolkata", D: "Chennai" },
                        userChoice: "",
                        questionId: "1",
                        visited: false,
                    },
                    {
                        question: "What is the capital of USA?",
                        options: { A: "Washington DC", B: "New York", C: "Los Angeles", D: "Chicago" },
                        userChoice: "",
                        questionId: "2",
                        visited: false,
                    },
                    {
                        question: "What is the capital of UK?",
                        options: { A: "London", B: "Manchester", C: "Birmingham", D: "Liverpool" },
                        userChoice: "",
                        questionId: "3",
                        visited: false,
                    },
                ],
            };

            addUser(token, newUser);
            startTimer(token, (leftTime) => {
                socket.emit("syncTime", { timeLeft: leftTime });
            });
            console.log("new user", newUser);
            
            socket.emit("startTest", newUser.questions);
            // socket.emit("syncTime", { timeLeft: newUser.timeLeft });
        }

        socket.on("sync", (data) => {
            
            if (!hasUser(token)) {
                socket.disconnect();
                return;
            }
            updateUser(token,{questions:data.questions})
        });

        socket.on("disconnect", () => {
            if(!hasUser(token)) return
            console.log('Disconnected',getUser(token));
            removeTimer(token);
        });
    });
}
