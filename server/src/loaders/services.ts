import { Request, Response, NextFunction } from 'express';
import EmailService from '../services/email-service';
import TokenService from '../services/token-service';
import UserService from '../services/user-service';

export default (req: Request, res: Response, next: NextFunction): void => {
    req.services = {
        email: new EmailService(),
        token: new TokenService(),
        user: new UserService()
    };

    next();
};