"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const testSchema = new mongoose_1.default.Schema({
    testName: String,
    questionMargin: { type: Boolean, default: false },
    passingMarks: Number,
    totalMarks: Number,
    duration: String,
    description: String,
    questions: [{ type: String, ref: 'testQuestions' }],
    testNumber: String,
    setFiles: Array,
    answerFiles: Array,
    timeStamp: { type: Date, default: Date.now }
});
exports.Test = mongoose_1.default.model('tests', testSchema);
