"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorhandler_1 = __importDefault(require("errorhandler"));
const app_1 = __importDefault(require("./app"));
/**
 * Error Handler. Provides full stack - remove for production
 */
app_1.default.use(errorhandler_1.default());
const server = app_1.default.listen(process.env.PORT || 5000, () => {
    console.log("App is running at 5000 in");
    console.log("  Press CTRL-C to stop\n");
});
exports.default = server;
