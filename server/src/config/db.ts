import mongoose from "mongoose";




function connect(MongoURL: string) {

    mongoose.connect(MongoURL).then(() => {
        console.log("Connected to MongoDB");
    }
    ).catch((err) => {
        console.error(err);
    });
}

export default connect;