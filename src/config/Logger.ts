import { Request, Response, NextFunction } from "express";
import winston from "winston";
const { combine, timestamp, label, prettyPrint } = winston.format;

export class Logger{  
    
    private logger: winston.Logger | any;

    constructor(service = "app"){
        this.logger = winston.createLogger({
            level: 'info',
            format: combine(
                label({ label: `${service}-log` }),
                timestamp(),
                prettyPrint()
            ),
            defaultMeta: { service: `${service}-service` },
            transports: [
                new winston.transports.File({ filename: 'src/logs/error.log', level: 'error' }),
                new winston.transports.File({ filename: 'src/logs/combined.log' })
            ]
        });
    }

    public log(message: string, level: string = "info"){
        this.logger.log({
            level: level,
            message: message
        });
    }
}