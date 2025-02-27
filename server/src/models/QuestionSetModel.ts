import mongoose, { Document } from "mongoose";

interface QuestionType extends Document {
    questionTitle: String;
    options: {
        A: String;
        B: String;
        C: String;
        D: String;
    },
    correctOption: String;
}

interface QuestionSetType extends Document{
    name: String;
    questions: QuestionType[];
    user: String;
    createdAt: Date;
}

const QuestionSetSchema = new mongoose.Schema<QuestionSetType>({
    name: {
        type: String,
        required: true
    },
    questions: {
         type: [
            {
                questionTitle: {
                    type: String,
                    required: true,
                },
                options: {
                    A: {
                        type: String,
                        required: [true, "A mcq question should have options"],
                    },
                    B: {
                        type: String,
                        required: [true, "A mcq question should have options"],
                    },
                    C: {
                        type: String,
                        required: [true, "A mcq question should have options"],
                    },
                    D: {
                        type: String,
                        required: [true, "A mcq question should have options"],
                    }
                },
                correctOption: {
                    type: String,
                    required: [true, "A mcq question must have a correctOption"],
                    maxlength: 1,
                    minlength: 1,
                    enum: {
                        values: ["A", "B", "C", "D"],
                        message: "correctOption is either: A, B, C or D",
                    },
                }
            }
        ],
        required: [true, "Questions set must have questions"],
        _id: false, // Disable automatic _id generation for subdocuments
    },
    user: {
        type: String,
        ref: "User",
        required: [true, "A Test must have a user(creator)"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

export const QuestionSet = mongoose.model<QuestionSetType>('QuestionSet', QuestionSetSchema);
