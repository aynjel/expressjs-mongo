import * as mongoose from "mongoose";
import { Logger } from "./Logger";

const logger = new Logger("database");
export class Database{
    
    constructor(){}

    public async connect(): Promise<void>{
        try{
            await mongoose.connect(process.env.MONGODB_URI as string)
                .then(() => {
                    logger.log("Connected to database");
                })
                .catch((error) => {
                    logger.log("Error connecting to database: ", error);
                    process.exit(1);
                });
        }catch(error: any){
            logger.log("Error connecting to database: ", error);
            process.exit(1);
        }
    }

    public async disconnect(): Promise<void>{
        try{
            await mongoose.disconnect().then(() => {
                logger.log("Disconnected from database");
            });
        }catch(error: any){
            logger.log("Error disconnecting from database: ", error);
            process.exit(1);
        }
    }
}