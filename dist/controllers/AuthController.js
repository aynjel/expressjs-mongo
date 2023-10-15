"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    register(req, res, next) {
        try {
            const hashedPassword = bcryptjs_1.default.hashSync(req.body.password, 10);
            User_1.default.create({
                firstName: req.body.firstName,
                middleName: req.body.middleName,
                lastName: req.body.lastName,
                email: req.body.email,
                username: req.body.username,
                mobileNumber: req.body.mobileNumber,
                password: hashedPassword
            })
                .then(user => {
                res.json({ message: 'Registration successful', user });
            })
                .catch(error => {
                if (error.code === 11000) {
                    return res.status(400).json({ message: 'Username or mobile number already exists' });
                }
                next(error);
            });
        }
        catch (error) {
            next(error);
        }
    }
    login(req, res, next) {
        try {
            const { username, password } = req.body;
            User_1.default.findOne({ username })
                .then(user => {
                if (!user) {
                    return res.status(400).json({ message: 'Username is incorrect' });
                }
                const isPasswordCorrect = bcryptjs_1.default.compareSync(password, user.password);
                if (!isPasswordCorrect) {
                    return res.status(400).json({ message: 'Password is incorrect' });
                }
                const token = jsonwebtoken_1.default.sign({ user: user }, process.env.JWT_SECRET, {
                    expiresIn: '1d'
                });
                res.json({ message: 'Login successful', token });
            })
                .catch(error => next(error));
        }
        catch (error) {
            next(error);
        }
    }
    logout(req, res, next) {
        try {
            res.clearCookie('token');
            res.json({ message: 'Logout successful' });
        }
        catch (error) {
            next(error);
        }
    }
    me(req, res, next) {
        try {
            // validate and verify token to get user details
            const token = req.cookies.token;
            if (!token) {
                return res.status(400).json({ message: 'Token not found' });
            }
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (error, decoded) => {
                if (error) {
                    return res.status(400).json({ message: 'Token is invalid' });
                }
                const user = decoded.user;
                res.json({ user });
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
