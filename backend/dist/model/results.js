"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// define the schema for our user model
const resultsSchema = new mongoose_1.default.Schema({
    qid: String,
    result: [
        {
            name: String,
            totalMarks: Number,
            answers: [{
                    markedOption: [{ type: String }],
                    isCorrect: Boolean,
                    marks: Number,
                }],
            obtainedMarks: Number
        }
    ]
});
// create the model for users and expose it to our app
exports.Result = mongoose_1.default.model("results", resultsSchema);
