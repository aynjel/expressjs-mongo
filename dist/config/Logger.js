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
exports.Logger = void 0;
const path = require("path");
const fs = require("fs");
const morgan_1 = __importDefault(require("morgan"));
class Logger {
    constructor() { }
    log(message) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(message);
        });
    }
}
exports.Logger = Logger;
Logger.accesslogger = (0, morgan_1.default)("combined", {
    skip: (req, res) => res.statusCode >= 400,
    stream: fs.createWriteStream(path.join(__dirname, "./../logs/access.log"), { flags: "a" })
});
Logger.errorLogger = (0, morgan_1.default)("combined", {
    skip: (req, res) => res.statusCode < 400 || res.statusCode >= 500,
    stream: fs.createWriteStream(path.join(__dirname, "./../logs/error.log"), { flags: "a" })
});
Logger.consoleLogger = (0, morgan_1.default)("dev");
