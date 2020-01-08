import mongoose from "mongoose";

import { Question as questions } from "./question";

export type TestDocument = mongoose.Document & {
  testName: String;
  questionMargin: Boolean;
  questions: any;
  passingMarks: Number;
  totalMarks: Number;
  duration: String;
  description: String;
  testNumber: Number;
  answerFiles: Array<String>;
  timeStamp: Date;
};

const testSchema = new mongoose.Schema({
  testName: String,
  questionMargin: { type: Boolean, default: false },
  passingMarks: Number,
  totalMarks: Number,
  duration: String,
  description: String,
  questions: [
    {
      questionBody: String,
      solution: String,
      marks: Number,
      answers: [
        {
          answer: String,
          correctAnswer: Boolean
        }
      ]
    }
  ],
  testNumber: String,
  setFiles: Array,
  answerFiles: Array,
  timeStamp: { type: Date, default: Date.now }
});

export const Test = mongoose.model<TestDocument>("tests", testSchema);
