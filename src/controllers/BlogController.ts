import { Request, Response, NextFunction } from 'express';
import Blog from '../models/Blog';

export class BlogController {
    public index(req: Request, res: Response, next: NextFunction) {
        res.json({ message: 'Index' });
    }

    public show(req: Request, res: Response, next: NextFunction) {
        res.json({ message: 'Show' });
    }

    public create(req: Request, res: Response, next: NextFunction) {
        res.json(req.body);
    }
}
