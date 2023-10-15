"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Passport = void 0;
const passport_1 = __importDefault(require("passport"));
class Passport {
    constructor() { }
    static init() {
        passport_1.default.serializeUser((user, done) => {
            console.log('serializeUser', user);
            process.nextTick(() => {
                done(null, user);
            });
        });
        passport_1.default.deserializeUser((user, done) => {
            console.log('deserializeUser', user);
            process.nextTick(() => {
                done(null, user);
            });
        });
    }
}
exports.Passport = Passport;
