import { Request, Response, NextFunction } from 'express';
import { TUser } from '../types/Types';
import User from '../models/User';

export class UserController {
    public index(req: Request, res: Response, next: NextFunction) {
        User.find()
            .then((users: TUser[]) => res.json({ users }))
            .catch((error: Error) => res.status(500).json({ error }));
    }

    public show(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;
        User.findById(id)
            .then((user: TUser | null) => res.json({ user }))
            .catch((error: Error) => res.status(500).json({ error }));
    }

    public create(req: Request, res: Response, next: NextFunction) {
        const user: TUser = req.body;
        User.create(user)
            .then((user: TUser) => res.status(201).json({ user }))
            .catch((error: Error) => res.status(500).json({ error }));
    }

    public update(req: Request, res: Response, next: NextFunction) {
        const userData: TUser = req.body;
        User.findByIdAndUpdate(req.params.id, userData)
            .then((user: TUser | null) => res.json({ user }))
            .catch((error: Error) => res.status(500).json({ error }));
    }

    public destroy(req: Request, res: Response, next: NextFunction) {
        User.findByIdAndRemove(req.params.id)
            .then((user: TUser | null) => res.json({ user }))
            .catch((error: Error) => res.status(500).json({ error }));
    }
}
