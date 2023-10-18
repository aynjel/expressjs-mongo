import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoStore from "connect-mongo";
import { Logger } from "./config/Logger";
import { Database } from "./config/Database";
import { AuthRoutes } from "./routes/AuthRoutes";
import { UserRoutes } from "./routes/UserRoutes";

export class App {
    private database = new Database();
    private authRoutes = new AuthRoutes();
    private userRoutes = new UserRoutes();

    constructor(
        private app: express.Application = express(),
    ) {

        this.database.connect();
        
        this.app.use(Logger.accesslogger);
        this.app.use(Logger.errorLogger);
        this.app.use(Logger.consoleLogger);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors({
            origin: [
                "http://localhost:4200",
                "http://localhost:8100",
                "https://sketch-cmtry.vercel.app"
            ],
            credentials: true
        }));
        this.app.use(session({
            secret: process.env.SESSION_SECRET || "",
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false,
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
            },
            store: mongoStore.create({
                mongoUrl: process.env.MONGODB_URI || "",
                ttl: 60 * 60 * 24 * 7 // 1 week
            })
        }));
        this.app.use(cookieParser())

        this.app.get("/", (req, res, next) => res.send("App Index page"));
        this.app.use("/api/auth", this.authRoutes.getRouter);
        this.app.use("/api/users", this.userRoutes.getRouter);
    }

    start() {
        this.app.listen(process.env.PORT, () => console.log(`Server is running on http://localhost:${process.env.PORT}`));
    }
}