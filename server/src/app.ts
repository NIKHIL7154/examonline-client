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

//socket setup
import http from "http";
import {initializeSockets} from "./config/socket";





//routes
import verifyUserDataRoute from "./routes/verifyUserData";
import testRoutes from "./routes/testRoutes";
import participantsRoutes from "./routes/participantsRoutes";
import questionSetRoutes from "./routes/questionSetRoutes";
import questionGenRoute from "./routes/questionGenRoute";
import analyticsRoutes from "./routes/analyticsRoutes";
import examConductRoutes from "./routes/examConductRoutes";

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


//socket initialized
const server = http.createServer(app);
// initializeSockets(server);




app.use(express.json());
const MongoURL = process.env.MONGO_URI ? process.env.MONGO_URI : "mongodb://localhost:27017/test";
connect(MongoURL);



// clerk middleware to verify Jwt Token
app.use("/api",clerkMiddleware(),verifyUserWithToken);

// DISABLE ON PROD
// app.use("/api", verifyTestUser)


//user verification route
app.use("/api/verifyuser", verifyUserDataRoute);


app.route("/api/v1/user")
    .get(createUser);

//tests fetch route
app.use("/api/v1/user/tests", testRoutes);
app.use("/api/v1/user/participants", participantsRoutes);
app.use("/api/v1/user/questionSets", questionSetRoutes);
app.use("/api/v1/user/questionGen", questionGenRoute);
app.use("/api/v1/user/analytics", analyticsRoutes);

//test conduct route
app.use("/test",examConductRoutes);


app.use(globalAppHandler)

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

app.get("/api/testing",(req:ProtectedRequest,res:Response)=>{
    res.json({user:req.auth.userId})
})



//cors
app.use(cors({
    //origin:"http://localhost:5173"
    origin:"*"
}));









// Handling Unhandled Routes
app.all("*", (req: ProtectedRequest, res: Response, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})



server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on('unhandledRejection', (err: any) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);

    server.close(() => {
        process.exit(1);
    })
});

export function envManager(envVariable:string):string{
    if(!process.env[envVariable] || process.env[envVariable] === ""){
        console.log('Environment Variable not found:',envVariable);
        process.exit(1);
    }
    return process.env[envVariable];

}