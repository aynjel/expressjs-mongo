import { Request, Response, NextFunction } from 'express';

export class AuthController {
  public register(req: Request, res: Response, next: NextFunction) {
    // Implement registration logic here
    const { username, password } = req.body;

    // Example: Save user to database
    // User.create({ username, password })
    //   .then(user => res.json(user))
    //   .catch(error => next(error));

    res.json({ message: 'User registered successfully' });
  }

  public login(req: Request, res: Response, next: NextFunction) {
    // Implement login logic here
    const { username, password } = req.body;

    // Example: Check user credentials
    // User.findOne({ where: { username, password } })
    //   .then(user => {
    //     if (user) {
    // Generate JWT token and send it in response
    //       const token = generateToken(user);
    //       res.json({ token });
    //     } else {
    //       res.status(401).json({ message: 'Invalid username or password' });
    //     }
    //   })
    //   .catch(error => next(error));

    res.json({ message: 'User logged in successfully' });
  }

  public logout(req: Request, res: Response, next: NextFunction) {
    // Implement logout logic here
    // Example: Invalidate JWT token or remove from session

    res.json({ message: 'User logged out successfully' });
  }

    public me(req: Request, res: Response, next: NextFunction) {
        // Implement me logic here
        // Example: Get user from database using id from JWT token
    
        res.json({ message: 'User retrieved successfully' });
    }
}