import mongoose from "mongoose";

export type QuestionDocument = mongoose.Document & {
    questionBody: String;
    solution: String;
    answers: [
        {
            answer: String;
            correctAnswer: Boolean;
        }
    ];
    matchQuestions: [
        {
            question: String;
            answer: String;
            match: String;
        }
    ];
  
};

// define the schema for our user model
const questionSchema = new mongoose.Schema({
  
    questionBody: String,
    solution: String,
    answers: [
        {
            answer: String,
            correctAnswer: Boolean
        }
    ],
    matchQuestions: [
        {
            question: String,
            answer: String,
            match: String
        }
    ],
});

// create the model for users and expose it to our app
export const Question = mongoose.model<QuestionDocument>("questions", questionSchema);
