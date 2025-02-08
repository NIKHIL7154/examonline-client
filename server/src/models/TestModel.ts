import mongoose from "mongoose";

const OptionSchema = new mongoose.Schema({
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    proctoring: {
        type: Boolean,
        required: true
    },
    tabSwitchLimit: {
        type: Number,
        required: true
    },
    resume: {
        type: Boolean,
        required: true
    },
    trackUserData: {
        type: Boolean,
        required: true
    }
});
//"questionSetId name status createdAt"
const TestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
        default: Date.now
    },
    options:{
        type: OptionSchema,
        required: true
    }
});

export const Test = mongoose.model('Test', TestSchema);
