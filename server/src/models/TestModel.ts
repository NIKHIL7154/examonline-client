import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
    // connect with user id
    name: {
        type: String,
        required: true,
        unique: true,
    },
    questionSetId: {
        type:String,
        required: true
    },
    status:{
        type: String,
        default: "pending",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startAt: {
        type: Date,
        required: true
    },
    endAt: {
        type: Date,
        required: true
    },
    proctoring: {
        type: Boolean,
        required: true,
    },
    tabSwitchLimit: {
        type: Number,
        required: true,
        default: 1,
    },
    resumable: {
        type: Boolean,
        required: true
    },
    // work on this later
    // trackUserData: {
    //     type: Boolean,
    //     required: true
    // }
});

export const Test = mongoose.model('Test', TestSchema);
