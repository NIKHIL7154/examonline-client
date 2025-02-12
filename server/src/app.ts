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
import testsFetchRoute from "./routes/testRoutes";

// DISABLE ON PROD
import { verifyTestUser } from "./middleware/apiTest";


const PORT = process.env.PORT || 3000;
const app = express();

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

//tests fetch route
app.use("/api/v1/user/tests", testsFetchRoute);

// Handling Unhandled Routes
app.all("*", (req: ProtectedRequest, res: Response, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalAppHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});