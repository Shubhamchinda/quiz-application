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
const express_1 = require("express");
const question_1 = __importDefault(require("../controller/question"));
const test_1 = __importDefault(require("../controller/test"));
const results_1 = __importDefault(require("../controller/results"));
const app = express_1.Router();
app
    .route("/question")
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const resp = yield question_1.default.add(body);
    res.json(resp);
}))
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("asdaasda");
    const resp = yield question_1.default.all(req.query);
    res.json(resp);
}));
app
    .route("/quiz")
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const resp = yield test_1.default.add(body);
    res.json(resp);
}))
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield test_1.default.all(req.query);
    res.json(resp);
}));
app
    .route("/quiz/:_id")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    const resp = yield test_1.default.get(_id);
    res.json(resp);
}));
app
    .route("/result")
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const resp = yield results_1.default.add(body);
    res.json(resp);
}));
exports.default = app;
