import path = require("path");
import fs = require("fs");
import morgan from "morgan";

export class Logger{

    constructor(){ }

    public static accesslogger = morgan("combined", {
        skip: (req, res) => res.statusCode >= 400,
        stream: fs.createWriteStream(path.join(__dirname, "./../logs/access.log"), {flags: "a"})
    });

    public static errorLogger = morgan("combined", {
        skip: (req, res) => res.statusCode < 400 || res.statusCode >= 500,
        stream: fs.createWriteStream(path.join(__dirname, "./../logs/error.log"), {flags: "a"})
    });

    public static consoleLogger = morgan("dev");

    public async log(message: string): Promise<void>{
        console.log(message);
    }
}