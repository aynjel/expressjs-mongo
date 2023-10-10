import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { BaseRoutes } from './BaseRoutes';

export class UserRoutes extends BaseRoutes {
    private userController = new UserController();

    constructor() {
        super();
        this.initializeRoutes();
    }

    protected initializeRoutes(): void {
        this.get('/', this.userController.index);
    }

    public get getRouter(): Router {
        return this.router;
    }
}