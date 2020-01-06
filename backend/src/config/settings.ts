export const errorObj = {error: true, type: "error", success: false};
export const successObj = {error: false, type: "success", success: true};
export const secret = process.env.SECRET_KEY || "asdfasdfasdfasdf";
import mongoose from 'mongoose'

export const ObjectID = mongoose.Schema.Types.ObjectId


export interface API_RESP {
    error: boolean;
    success: boolean;
    type: string;
    data?: object | Record<string, any>[];
    message: string;
    err?: object;
}

