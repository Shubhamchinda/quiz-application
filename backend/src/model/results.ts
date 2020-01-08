import mongoose from "mongoose";

export type ResultDocument = mongoose.Document & {
  qid: String;
  result: any;
};

// define the schema for our user model
const resultsSchema = new mongoose.Schema({
  qid: String,
  result: [
    {
      name: String,
      totalMarks: Number,
      answers: [{
        markedOption: String,
        isCorrect: Boolean,
        marks : Number,
      }],
      obtainedMarks: Number
    }
  ]
});

// create the model for users and expose it to our app
export const Result = mongoose.model<ResultDocument>("results", resultsSchema);
