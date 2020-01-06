import mongoose from 'mongoose';
import _ from "lodash";

import { errorObj, successObj, API_RESP } from "../config/settings";
import { TestDocument, Test } from "../model/test";
import { getField } from "./_utils";

const testCtrl = {
    add: (data: any): Promise<API_RESP> => {
        return new Promise(async resolve => {
            let questions: any = []
            let test = new Test();
            // _.each(data, (key: keyof TestDocument, value: any) => {
            //     // (test[key] as any) = value;
            //     console.log(key, value)
            // });
            

            let count: any = await Test.count({ testId : data.id })
            test.testNumber = count + 1
            if (data.questions) {

                _.forEach(data.questions, async (ques) => {
                    ques.branchId = data.branchId
                    ques.qid = data._id
                    questions.push(ques)
                    ques = ques._id
                })
            }
            test.save((err: any, result: any) => {
                if (err || !result) {
                    console.log(err)
                    if (err.code == 11000) {
                        return resolve({
                            ...errorObj,
                            message: `This ${getField(err)} is already exist.`,
                            err
                        });
                    }
                    return resolve({
                        ...errorObj,
                        message: "unable to add test",
                        data: result,
                        err
                    });
                }
                questions = questions.map((item: any) => item.testId = result._id)
                return resolve({
                    ...successObj,
                    message: "test added successfully",
                    data: result
                });
            });
        });
    },
    get: (data: any): Promise<API_RESP> => {
        return new Promise(resolve => {
            let test = Test.findById(data)

            test.exec((error : any, data2 : any) => {
                if (error || !data2) {
                    return resolve({
                        ...errorObj,
                        message: "unable to find the test",
                        err: error
                    });
                }
                return resolve({
                    ...successObj,
                    message: "test found",
                    data: data2
                });
            });
        });
    },
    all: (data?: any): Promise<API_RESP> => {
        return new Promise(resolve => {
            if (data.testName) data.testName = { $regex: new RegExp(data.testName, 'i') }
            if (data.testNumber) data.testNumber = { $regex: new RegExp(data.testNumber, 'i') }
            if (data._ids) {
                let _ids: any = []
                data._ids.map((item: any) => {
                    _ids.push(mongoose.Types.ObjectId(item))
                })
                data._id = { $in: _ids }
                delete data._ids
            }
            let test = Test.find(data)
                
            test.exec((error : any, data2 : any) => {

                if (error || !data2) {
                    return resolve({
                        ...errorObj,
                        message: "unable to find the test",
                        err: error
                    });
                }
                return resolve({
                    ...successObj,
                    message: "test found",
                    data: data2
                });
            });
        });
    },
   
};
export default testCtrl