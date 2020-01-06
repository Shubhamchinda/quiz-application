"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorObj = { error: true, type: "error", success: false };
exports.successObj = { error: false, type: "success", success: true };
exports.secret = process.env.SECRET_KEY || "asdfasdfasdfasdf";
const mongoose_1 = __importDefault(require("mongoose"));
exports.ObjectID = mongoose_1.default.Schema.Types.ObjectId;
