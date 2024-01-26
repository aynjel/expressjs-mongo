import { Request, Response, NextFunction } from 'express';
import { TUpdateUser, TUser } from '../types/TUser';
import User from '../models/User';
import bcryptjs from 'bcryptjs';
import { Logger } from '../config/Logger';

const logger = new Logger("userController");

export class UserController {

    public async index(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        await User.find()
            .then((users) => {
                if (!users) {
                    logger.log(`Users not found`, "error");
                    return res.status(404).json({ message: "Users not found" });
                }
                return res.json({users});
            }).catch((error: Error) => {
                logger.log(error.message, "error");
                res.status(500).json({ error });
            });
    }

    public async show(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const id: string = req.params.id;
        await User.findById(id)
            .then((user) => {
                if (!user) {
                    logger.log(`User not found`, "error");
                    return res.status(404).json({ message: "User not found" });
                }
                return res.json({user});
            }).catch((error: Error) => {
                logger.log(error.message, "error");
                res.status(500).json({ error });
            });
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const userData: TUser = req.body;
            if (!userData) return res.status(400).json({ message: "User data is required" });
            const user: TUser | null = await User.findOne({ email: userData.email });
            if (user) return res.status(400).json({ message: "User already exists" });
            const salt: string = await bcryptjs.genSalt(10);
            const hashedPassword: string = await bcryptjs.hash(userData.password, salt);
            userData.password = hashedPassword;
            await User.create(userData)
                .then((user: TUser) => {
                    // const { name } = user;
                    return res.json({ user, message: "User created" });
                })
                .catch((error: Error) => res.status(500).json({ error }));
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    public async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const userId: string = req.params.id;
        if (!userId) return res.status(400).json({ message: "User id is required" });
        const userData: TUpdateUser = req.body;
        if (!userData) return res.status(400).json({ message: "User data is required" });
        await User.findByIdAndUpdate(userId, userData, { new: true })
            .then((user: TUser | null) => res.json({ updatedUser: user, message: "User updated" }))
            .catch((error: Error) => res.status(500).json({ error }));
    }

    public async destroy(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const id: string = req.params.id;
        if (!id) return res.status(400).json({ message: "User id is required" });
        await User.findByIdAndRemove(id)
            .then((user: TUser | null) => res.json({ deletedUser: user, message: "User deleted" }))
            .catch((error: Error) => res.status(500).json({ error }));
    }
}
