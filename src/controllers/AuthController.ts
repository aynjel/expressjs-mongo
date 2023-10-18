import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthController {
  public register(req: Request, res: Response, next: NextFunction): void {
    try{
      const hashedPassword = bcryptjs.hashSync(req.body.password, 10);
      User.create({
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
    }catch(error){
      next(error);
    }
  }

  public login(req: Request, res: Response, next: NextFunction) {
    try{
      const { username, password } = req.body;
      User.findOne({ username })
        .then(user => {
          if (!user) {
            return res.status(400).json({ message: 'Username is incorrect' });
          }
          const isPasswordCorrect = bcryptjs.compareSync(password, user.password);
          if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Password is incorrect' });
          }
          const token = jwt.sign({ user: user }, process.env.JWT_SECRET as string, {
            expiresIn: '1d'
          });
          res.json({ message: 'Login successful', token });
        })
        .catch(error => next(error));
    }catch(error){
      next(error);
    }
  }

  public logout(req: Request, res: Response, next: NextFunction) {
    try{
      res.clearCookie('token');
      res.json({ message: 'Logout successful' });
    }catch(error){
      next(error);
    }
  }

  public me(req: Request, res: Response, next: NextFunction) {
    try{
      // validate and verify token to get user details
      const token = req.cookies.token;
      if (!token) {
        return res.status(400).json({ message: 'Token not found' });
      }
      jwt.verify(token, process.env.JWT_SECRET as string, (error: any, decoded: any) => {
        if (error) {
          return res.status(400).json({ message: 'Token is invalid' });
        }
        const user = decoded.user;
        res.json({ user });
      });
    }catch(error){
      next(error);
    }
  }
}
