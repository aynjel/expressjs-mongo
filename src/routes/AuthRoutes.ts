import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { AuthMiddleware } from '../middleware/AuthMiddleware';
import { AuthValidator } from '../validators/AuthValidator';
import { BaseRoutes } from './BaseRoutes';

export class AuthRoutes extends BaseRoutes {
    private authController = new AuthController();
    private authMiddleware = new AuthMiddleware();
    private authValidator = new AuthValidator();

    constructor() {
        super();
        this.initializeRoutes();
    }

    protected initializeRoutes(): void {
        this.post('/login', this.authController.login);
        this.post('/register', this.authController.register);
        this.post('/logout', this.authController.logout);
        this.get('/me', this.authController.me);
    }

    public get getRouter(): Router {
        return this.router;
    }
}