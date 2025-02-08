import mongoose from "mongoose";

const QuestionSetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        }
    ],
    uid: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const QuestionSchema= new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: [
        {
            type: String,
            required: true
        }
    ],
    answer: {
        type: String,
        required: true
    },
    id:{
        type: String,
        required: true
    }
    
});

export const QuestionSet = mongoose.model('QuestionSet', QuestionSetSchema);
export const Question = mongoose.model('Question', QuestionSchema);