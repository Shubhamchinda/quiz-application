import _ from "lodash";
import { errorObj, successObj, API_RESP } from "../config/settings";
import { ResultDocument, Result } from "../model/results";
import { getField } from "./_utils";

export default {
  add: (data: any): Promise<API_RESP> => {
    console.log(data, "RESULT");
    return new Promise(resolve => {
      Result.count({ qid: data.qid }).exec((err: any, num: any) => {
        console.log(num, "COUNT");
        if (num) {
          Result.findOne({ qid: data.qid }).exec((err: any, doc: any) => {
            console.log("find", doc);

            let temp = data.result;
            let tempDoc = doc.result;
            tempDoc.push(temp);
            doc.result = tempDoc;
            doc.save((err: any, data2: any) => {
              if (err) {
                return resolve({
                  ...errorObj,
                  message: "result add failed",
                  data: data2
                });
              }
              return resolve({
                ...successObj,
                message: "result added successfully",
                data: data2
              });
            });
          });
        } else {
          let result = new Result();
          result.qid = data.qid;
          let temp = [];
          temp.push(data.result);
          result.result = temp;
          console.log("DOCCC", result);

          result.save((err: any, result1: any) => {
            console.log(err, result1);

            if (err || !result1) {
              if (err.code == 11000) {
                return resolve({
                  ...errorObj,
                  message: `This ${getField(err)} is already exist.`,
                  err
                });
              }
              return resolve({
                ...errorObj,
                message: "unable to add result",
                data: result1,
                err
              });
            }
            console.log(err, result1);
            return resolve({
              ...successObj,
              message: "result added successfully",
              data: result1
            });
          });
        }
      });
    });
  }
};
