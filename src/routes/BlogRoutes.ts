import { Router } from 'express';
import { BlogController } from '../controllers/BlogController';
import { BaseRoutes } from './BaseRoutes';

export class BlogRoutes extends BaseRoutes {
    private blogController = new BlogController();

    constructor() {
        super();
        this.initializeRoutes();
    }

    protected initializeRoutes(): void {
        this.get('/', this.blogController.index);
        this.post('/create', this.blogController.create);
    }

    public get getRouter(): Router {
        return this.router;
    }
}