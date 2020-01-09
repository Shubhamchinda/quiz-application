"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = require("../config/settings");
const question_1 = require("../model/question");
const _utils_1 = require("./_utils");
exports.default = {
    add: (data) => {
        return new Promise((resolve) => {
            let question = new question_1.Question;
            // _.each(data, (value: any, key: keyof QuestionDocument ) => {
            //     (question[key] as any) = value;
            //     // console.log(key, value, "QUESTIon")
            // });
            question.questionBody = data.questionBody;
            question.solution = data.solution;
            question.answers = data.answers;
            question.save((err, result) => {
                if (err || !result) {
                    if (err.code == 11000) {
                        return resolve(Object.assign(Object.assign({}, settings_1.errorObj), { message: `This ${_utils_1.getField(err)} is already exist.`, err }));
                    }
                    return resolve(Object.assign(Object.assign({}, settings_1.errorObj), { message: "unable to add question", data: result, err }));
                }
                return resolve(Object.assign(Object.assign({}, settings_1.successObj), { message: "question added successfully", data: result }));
            });
        });
    },
    all: (data) => {
        return new Promise((resolve) => {
            let question = question_1.Question.find(data);
            question.populate('branchId');
            question.exec((error, data2) => {
                if (error || !data2) {
                    return resolve(Object.assign(Object.assign({}, settings_1.errorObj), { message: "unable to find the questions", err: error }));
                }
                return resolve(Object.assign(Object.assign({}, settings_1.successObj), { message: "questions found", data: data2 }));
            });
        });
    },
};
