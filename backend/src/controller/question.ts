import _ from "lodash";
import {errorObj, successObj, API_RESP} from "../config/settings";
import {QuestionDocument, Question} from "../model/question";
import { getField } from './_utils'; 

export default {
    add: (data: any): Promise<API_RESP> => {
        return new Promise((resolve) => {
            let question = new Question;

            // _.each(data, (value: any, key: keyof QuestionDocument ) => {
            //     (question[key] as any) = value;
            //     // console.log(key, value, "QUESTIon")
            // });
            question.questionBody = data.questionBody
            question.solution = data.solution
            question.answers = data.answers

            question.save((err: any, result: any) => {

                if (err || !result) {
                    if (err.code == 11000) {
                        return resolve({ ...errorObj, message: `This ${getField(err)} is already exist.`, err })
                    }
                    return resolve({...errorObj, message: "unable to add question", data: result, err});
                }

                return resolve({...successObj, message: "question added successfully", data: result});
            })
        });
    },
    all: (data?: any): Promise<API_RESP> => {
        return new Promise((resolve) => {
            let question = Question.find(data);
            question.populate('branchId')
            question.exec((error, data2) => {
                if (error || !data2) {
                    return resolve({...errorObj, message: "unable to find the questions", err: error});
                }
                return resolve({...successObj, message: "questions found", data: data2});
            });
        });
    },
}