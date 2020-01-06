import mongoose from "mongoose";
import _ from "lodash";

import { errorObj, successObj, API_RESP } from "../config/settings";
import { TestDocument, Test } from "../model/test";
import { getField } from "./_utils";

const testCtrl = {
  add: (data: any): Promise<API_RESP> => {
    return new Promise(async resolve => {
      let questions: any = [];
      let test = new Test();

      //@ts-ignore
      _.each(data, (value: any, key: keyof TestDocument) => {
        (test[key] as any) = value;
      });

      test.save((err: any, result: any) => {
        if (err || !result) {
          console.log(err);
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
      let test = Test.findById(data);

      test.exec((error: any, data2: any) => {
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
      if (data.testName)
        data.testName = { $regex: new RegExp(data.testName, "i") };
      if (data.testNumber)
        data.testNumber = { $regex: new RegExp(data.testNumber, "i") };
      if (data._ids) {
        let _ids: any = [];
        data._ids.map((item: any) => {
          _ids.push(mongoose.Types.ObjectId(item));
        });
        data._id = { $in: _ids };
        delete data._ids;
      }
      let test = Test.find(data);

      test.exec((error: any, data2: any) => {
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
  }
};
export default testCtrl;
