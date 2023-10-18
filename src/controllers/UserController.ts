import { Request, Response, NextFunction } from 'express';
import { TUpdateUser, TUser } from '../types/Types';
import User from '../models/User';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class UserController {
    public async index(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        await User.find()
            .then((users: TUser[]) => {
                if (users.length === 0) return res.status(404).json({ message: "Users not found" });
                return res.json({users});
            })
            .catch((error: Error) => res.status(500).json({ error }));
    }

    public async show(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const id: string = req.params.id;
        await User.findById(id)
            .then((user: TUser | null) => {
                if (!user) return res.status(404).json({ message: "User not found" });
                return res.json({ user });
            })
            .catch((error: Error) => res.status(500).json({ error }));
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const userData: TUser = req.body;
        if (!userData) return res.status(400).json({ message: "User data is required" });
        const userExists = await User.findOne({ $or: [{ email: userData.email }, { username: userData.username }] });
        if (userExists) return res.status(400).json({ message: "User already exists" });
        const hashedPassword = bcryptjs.hashSync(userData.password, 10);
        userData.password = hashedPassword;
        await User.create(userData)
            .then((user: TUser) => {
                const userWithoutPassword = {
                    _id: user._id,
                    firstName: user.firstName,
                    middleName: user.middleName,
                    lastName: user.lastName,
                    email: user.email,
                    username: user.username,
                    mobileNumber: user.mobileNumber,
                    role: user.role
                };
                return res.json({ createdUser: userWithoutPassword, message: "User created" });
            })
            .catch((error: Error) => res.status(500).json({ error }));
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
