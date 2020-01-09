"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const lodash_1 = __importDefault(require("lodash"));
const settings_1 = require("../config/settings");
const test_1 = require("../model/test");
const _utils_1 = require("./_utils");
const testCtrl = {
    add: (data) => {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            let questions = [];
            let test = new test_1.Test();
            //@ts-ignore
            lodash_1.default.each(data, (value, key) => {
                test[key] = value;
            });
            test.save((err, result) => {
                if (err || !result) {
                    console.log(err);
                    if (err.code == 11000) {
                        return resolve(Object.assign(Object.assign({}, settings_1.errorObj), { message: `This ${_utils_1.getField(err)} is already exist.`, err }));
                    }
                    return resolve(Object.assign(Object.assign({}, settings_1.errorObj), { message: "unable to add test", data: result, err }));
                }
                return resolve(Object.assign(Object.assign({}, settings_1.successObj), { message: "test added successfully", data: result }));
            });
        }));
    },
    get: (data) => {
        return new Promise(resolve => {
            let test = test_1.Test.findById(data);
            test.exec((error, data2) => {
                if (error || !data2) {
                    return resolve(Object.assign(Object.assign({}, settings_1.errorObj), { message: "unable to find the test", err: error }));
                }
                return resolve(Object.assign(Object.assign({}, settings_1.successObj), { message: "test found", data: data2 }));
            });
        });
    },
    all: (data) => {
        return new Promise(resolve => {
            if (data.testName)
                data.testName = { $regex: new RegExp(data.testName, "i") };
            if (data.testNumber)
                data.testNumber = { $regex: new RegExp(data.testNumber, "i") };
            if (data._ids) {
                let _ids = [];
                data._ids.map((item) => {
                    _ids.push(mongoose_1.default.Types.ObjectId(item));
                });
                data._id = { $in: _ids };
                delete data._ids;
            }
            let test = test_1.Test.find(data);
            test.exec((error, data2) => {
                if (error || !data2) {
                    return resolve(Object.assign(Object.assign({}, settings_1.errorObj), { message: "unable to find the test", err: error }));
                }
                return resolve(Object.assign(Object.assign({}, settings_1.successObj), { message: "test found", data: data2 }));
            });
        });
    }
};
exports.default = testCtrl;
