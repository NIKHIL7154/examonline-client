import express, { NextFunction, Request, Response } from "express";
import connect from "./config/db";
import "dotenv/config";
import cors from "cors"
import { clerkMiddleware } from '@clerk/express';
import { verifyUserWithToken } from "./middleware/verifyUserWithToken";
import morgan from "morgan";
import { ProtectedRequest } from "./types/expressTypes";
import AppError from "./utils/appError";
import globalAppHandler from "./controllers/errorController";

//routes
import verifyUserDataRoute from "./routes/verifyUserData";
import testRoutes from "./routes/testRoutes";
import participantsRoutes from "./routes/participantsRoutes";
import questionSetRoutes from "./routes/questionSetRoutes";

// DISABLE ON PROD
import { verifyTestUser } from "./middleware/apiTest";
import { createUser } from "./controllers/testController";


const PORT = process.env.PORT || 3000;
const app = express();

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:5173"
}));

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}


const MongoURL = process.env.MONGO_URI ? process.env.MONGO_URI : "mongodb://localhost:27017/test";
connect(MongoURL);

// clerk middleware to verify Jwt Token
// app.use("/api",clerkMiddleware(),verifyUserWithToken);

// DISABLE ON PROD
app.use("/api", verifyTestUser)

//user verification route
app.use("/api/verifyuser", verifyUserDataRoute);

// const delay = (duration: number, id: string): (() => Promise<void>) => {
//     return async () => {
//         // console.log(`Starting delay for ${duration / 1000} seconds...`);
//         return new Promise((resolve) => {
//             setTimeout(() => {
//                 console.log(`${id} Finished delay for ${duration / 1000} seconds.`);
//                 resolve();
//             }, duration);
//         });
//     };
// };

// const e_info = [
//     [
//         {name: "abc", email: "abc@email.com"},
//         {name: "cde", email: "cde@email.com"},
//         {name: "fgh", email: "fgh@email.com"},
//     ] ,
//      [
//         {name: "ijk", email: "ijk@email.com"},
//         {name: "lmn", email: "lmn@email.com"},
//     ] ,

// ]
// app.route("/:id").get(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
//     const id = req.params.id;
//     // console.log('Starting multiple delays...');
//     const url = 'https://example.com/welcome';
//     // Create an array of functions that return promises
    
//     initializeTaskCount(id, e_info[Number(id)].length);
//     // // Call each function to get the promises and wait for all to resolve
//     // // await Promise.all(tasks.map(task => task()));
//     // tasks.forEach(task => {
//     //     TestQueue.enqueue(task)
//     // });

//     e_info[Number(id)].forEach(participant => {
//         EmailQueueCpy.enqueue(sendEmailTaskCpy(participant, url, id));
//     });
//     // console.log('All delays done!');

//     emailProcessingEmitter.once(`emailsProcessed:${id}`, () => {
//         console.log(`All emails have been sent for request ID: ${id}`);
//         // Additional actions can be performed here
//     });
//     res.send('Finished all delays');
// })

app.route("/api/v1/user")
    .get(createUser);

//tests fetch route
app.use("/api/v1/user/tests", testRoutes);
app.use("/api/v1/user/participants", participantsRoutes);
app.use("/api/v1/user/questionSets", questionSetRoutes);

// Handling Unhandled Routes
app.all("*", (req: ProtectedRequest, res: Response, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalAppHandler)

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on('unhandledRejection', (err: any) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);

    server.close(() => {
        process.exit(1);
    })
});