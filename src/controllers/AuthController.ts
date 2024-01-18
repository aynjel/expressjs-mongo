import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthController {
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
}
