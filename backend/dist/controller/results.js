"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = require("../config/settings");
const results_1 = require("../model/results");
const _utils_1 = require("./_utils");
exports.default = {
    add: (data) => {
        console.log(data, "RESULT");
        return new Promise(resolve => {
            results_1.Result.count({ qid: data.qid }).exec((err, num) => {
                console.log(num, "COUNT");
                if (num) {
                    results_1.Result.findOne({ qid: data.qid }).exec((err, doc) => {
                        console.log("find", doc);
                        let temp = data.result;
                        let tempDoc = doc.result;
                        tempDoc.push(temp);
                        doc.result = tempDoc;
                        doc.save((err, data2) => {
                            if (err) {
                                return resolve(Object.assign(Object.assign({}, settings_1.errorObj), { message: "result add failed", data: data2 }));
                            }
                            return resolve(Object.assign(Object.assign({}, settings_1.successObj), { message: "result added successfully", data: data2 }));
                        });
                    });
                }
                else {
                    let result = new results_1.Result();
                    result.qid = data.qid;
                    let temp = [];
                    temp.push(data.result);
                    result.result = temp;
                    console.log("DOCCC", result);
                    result.save((err, result1) => {
                        console.log(err, result1);
                        if (err || !result1) {
                            if (err.code == 11000) {
                                return resolve(Object.assign(Object.assign({}, settings_1.errorObj), { message: `This ${_utils_1.getField(err)} is already exist.`, err }));
                            }
                            return resolve(Object.assign(Object.assign({}, settings_1.errorObj), { message: "unable to add result", data: result1, err }));
                        }
                        console.log(err, result1);
                        return resolve(Object.assign(Object.assign({}, settings_1.successObj), { message: "result added successfully", data: result1 }));
                    });
                }
            });
        });
    }
};
