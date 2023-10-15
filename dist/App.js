"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const Logger_1 = require("./config/Logger");
const Database_1 = require("./config/Database");
// import BlogRoutes from "./routes/BlogRoutes";
const AuthRoutes_1 = require("./routes/AuthRoutes");
// import UserRoutes from "./routes/UserRoutes";
dotenv_1.default.config(); // Initialize the dotenv
class App {
    constructor(app = (0, express_1.default)()) {
        this.app = app;
        this.database = new Database_1.Database();
        this.authRoutes = new AuthRoutes_1.AuthRoutes();
        this.app.use(Logger_1.Logger.accesslogger);
        this.app.use(Logger_1.Logger.errorLogger);
        this.app.use(Logger_1.Logger.consoleLogger);
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)({
            origin: ["http://localhost:4200", "http://localhost:8100", "https://sketch-cmtry.vercel.app"],
            credentials: true
        }));
        this.app.use((0, express_session_1.default)({
            secret: process.env.SESSION_SECRET || "",
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false,
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
            },
            store: connect_mongo_1.default.create({
                mongoUrl: process.env.MONGODB_URI || "",
                ttl: 60 * 60 * 24 * 7 // 1 week
            })
        }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use("/api/auth", this.authRoutes.getRouter);
        // this.app.use("/api/users", UserRoutes);
        // this.app.use("/api/blogs", BlogRoutes);
    }
    start() {
        this.app.listen(process.env.PORT, () => console.log(`Server is running on http://localhost:${process.env.PORT}`));
    }
}
const app = new App();
app.start();
