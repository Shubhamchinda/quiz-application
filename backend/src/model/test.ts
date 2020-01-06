import mongoose from 'mongoose'

export type TestDocument = mongoose.Document & {
    testName: String,
    questionMargin: Boolean,
    questions: String[] ,
    passingMarks: Number,
    totalMarks: Number,
    duration: String,
    description: String,
    testNumber: Number,
    answerFiles: Array<String>,
    timeStamp: Date
}

const testSchema = new mongoose.Schema({

    testName: String,
    questionMargin: { type: Boolean, default: false },
    passingMarks: Number,
    totalMarks: Number,
    duration: String,
    description: String,
    questions: [{type: String, ref:'testQuestions'}],
    testNumber: String,
    setFiles: Array,
    answerFiles: Array,
    timeStamp: {type: Date, default: Date.now}
});

export const Test = mongoose.model<TestDocument>('tests', testSchema);
