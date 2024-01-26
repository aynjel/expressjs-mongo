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
    private logger = new Logger("app");

    constructor(
        private app: express.Application = express(),
    ) {

        this.database.connect();
        
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors({
            origin: [
                "*"
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

        this.app.get("/", (req, res, next) => {
            this.logger.log(`App Index page`); // `App Index page
            res.send("App Index page");
        });
        this.app.use("/api/auth", this.authRoutes.getRouter);
        this.app.use("/api/users", this.userRoutes.getRouter);

        this.app.use((req, res, next) => {
            const error = new Error("Route not found");
            this.logger.log(`Route not found: ${req.method} ${req.path}`, "error"); // Route not found: GET /api/users
            res.status(404).json({ message: error.message });
        });
    }

    start() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
            this.logger.log(`Server running on port ${process.env.PORT}`);
        });
    }
}