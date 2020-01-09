"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
// import mongo from "connect-mongo";
const mongoose_1 = __importDefault(require("mongoose"));
const _utils_1 = require("./config/_utils");
const routes_1 = __importDefault(require("./api/routes"));
const rejectFolders = [];
const dotenv = require('dotenv').config();
const app = express_1.default();
console.log(process.env.MONGO_URI);
mongoose_1.default
    .connect(process.env.MONGO_URI ||
    _utils_1.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
    console.log("MongoDB connected!");
})
    .catch((err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});
app.use(compression_1.default());
app.use(morgan_1.default(":method :url :status :res[content-length] - :response-time ms", {
    skip: (req) => rejectFolders.indexOf(req.url.split("/")[1]) !== -1
}));
app.use(cors_1.default());
app.use(express_1.default.json()); //middleware
app.get("/", (req, res) => {
    res.send("Hello");
});
mongoose_1.default.set("debug", true);
app.use("/api", routes_1.default);
exports.default = app;
