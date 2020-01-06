"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getField = (err) => {
    let field = err.message.split("index: ")[1];
    field = field.split(" dup key")[0];
    field = field.substring(0, field.indexOf("_"));
    return field;
};
exports.default = {};
