"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// define the schema for our user model
const questionSchema = new mongoose_1.default.Schema({
    questionBody: String,
    solution: String,
    answers: [
        {
            answer: String,
            correctAnswer: Boolean
        }
    ],
    marks: Number
});
// create the model for users and expose it to our app
exports.Question = mongoose_1.default.model("questions", questionSchema);
