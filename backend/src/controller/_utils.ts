import { Request, Response, NextFunction } from "express";

export const getField = (err: any) => {
  let field = err.message.split("index: ")[1];
  field = field.split(" dup key")[0];
  field = field.substring(0, field.indexOf("_"));
  return field;
};
export default {};
