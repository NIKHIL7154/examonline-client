import express,{ Request,Response } from "express";
import connect from "./config/db";
import "dotenv/config";
import cors from "cors"
import { clerkMiddleware } from '@clerk/express';
import { verifyUserWithToken } from "./middleware/verifyUserWithToken";


//routes
import verifyUserDataRoute from "./routes/verifyUserData";
import testsFetchRoute from "./routes/showTests";


const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({
    origin:"http://localhost:5173"
}));


const MongoURL = process.env.MONGO_URI ? process.env.MONGO_URI : "mongodb://localhost:27017/test";
connect(MongoURL);

// clerk middleware to verify Jwt Token
app.use("/api",clerkMiddleware(),verifyUserWithToken);

//user verification route
app.use("/api/verifyuser",verifyUserDataRoute);

//tests fetch route
app.use("/api/tests",testsFetchRoute);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});