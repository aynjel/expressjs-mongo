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
        this.get('', this.userController.index);
        this.get('/:id', this.userController.show);
        this.post('/create', this.userController.create);
        this.put('/update/:id', this.userController.update);
        this.delete('/destroy/:id', this.userController.destroy);
    }

    public get getRouter(): Router {
        return this.router;
    }
}