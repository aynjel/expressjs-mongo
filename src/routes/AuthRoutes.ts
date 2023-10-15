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

<<<<<<< HEAD
    private initializeRoutes(): void {
        this.post('/login', this.authController.login, this.authValidator.validate);
        this.post('/register', this.authController.register, this.authValidator.validate);
        this.post('/logout', this.authController.logout, this.authMiddleware.authenticate);
        this.get('/me', this.authController.me, this.authMiddleware.authenticate);
=======
    protected initializeRoutes(): void {
        this.post('/login', this.authController.login);
        this.post('/register', this.authController.register);
        this.post('/logout', this.authController.logout);
        this.get('/me', this.authController.me);
>>>>>>> ad32f13df04f2194f498b17a72c2a809cc669b59
    }

    public get getRouter(): Router {
        return this.router;
    }
}