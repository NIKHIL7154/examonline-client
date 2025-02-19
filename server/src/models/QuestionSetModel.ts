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
                    required: [true, "A mcq quetion must have a correctOption"],
                    maxlength: 1,
                    minlength: 1,
                    enum: {
                        values: ["A", "B", "C", "D"],
                        message: "correctOption is either: A, B, C or D",
                    },
                }
            }
        ],
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

// const QuestionSchema= new mongoose.Schema({
//     question: {
//         type: String,
//         required: true
//     },
//     options: [
//         {
//             type: String,
//             required: true
//         }
//     ],
//     answer: {
//         type: String,
//         required: true
//     },
//     id:{
//         type: String,
//         required: true
//     }
    
// });

export const QuestionSet = mongoose.model<QuestionSetType>('QuestionSet', QuestionSetSchema);
// export const Question = mongoose.model('Question', QuestionSchema);

// const questionSchema = new mongoose.Schema({
//     questionText: {
//       type: String,
//       required: true,
//     },
//     options: {
//       type: [String], // Array of options for multiple-choice questions
//       required: function() {
//         return this.questionType === 'multiple-choice'; // Only required for multiple-choice questions
//       },
//     },
//     correctAnswer: {
//       type: String, // Can be the index of the correct option or the answer text
//       required: true,
//     },
//     questionType: {
//       type: String,
//       enum: ['multiple-choice', 'true-false', 'short-answer'], // Define the types of questions
//       required: true,
//     },
//     difficulty: {
//       type: String,
//       enum: ['easy', 'medium', 'hard'], // Optional: Define difficulty levels
//     },
//     tags: {
//       type: [String], // Optional: Tags for categorization
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//   });
  
//   const Question = mongoose.model('Question', questionSchema);


// const questionSetSchema = new mongoose.Schema({
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//     },
//     questions: [{
//       question: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Question', // Reference to the Question model
//       },
//       order: {
//         type: Number, // Optional: To maintain the order of questions
//       },
//     }],
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//   });
  
//   const QuestionSet = mongoose.model('QuestionSet', questionSetSchema);