"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const AuthController_1 = require("../controllers/AuthController");
const AuthMiddleware_1 = require("../middleware/AuthMiddleware");
const AuthValidator_1 = require("../validators/AuthValidator");
const BaseRoutes_1 = require("./BaseRoutes");
class AuthRoutes extends BaseRoutes_1.BaseRoutes {
    constructor() {
        super();
        this.authController = new AuthController_1.AuthController();
        this.authMiddleware = new AuthMiddleware_1.AuthMiddleware();
        this.authValidator = new AuthValidator_1.AuthValidator();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.post('/login', this.authController.login);
        this.post('/register', this.authController.register);
        this.post('/logout', this.authController.logout);
        this.get('/me', this.authController.me);
    }
    get getRouter() {
        return this.router;
    }
}
exports.AuthRoutes = AuthRoutes;
