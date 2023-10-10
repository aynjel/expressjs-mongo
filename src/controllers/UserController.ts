import { Request, Response, NextFunction } from 'express';

export class UserController {
    public index(req: Request, res: Response, next: NextFunction) {
        res.json({ message: 'Hello World' });
    }
}
