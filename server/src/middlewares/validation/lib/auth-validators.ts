import { NextFunction, Request, Response } from "express";
import validator from '../../../utils/validators';
import { AlreadyLoggedInError, IncorrectInputError, UsernameAlreadyExistError, EmailAlreadyExistError, InvalidEmailOrPasswordError, EmailNotConfirmedError, UnknownLocationError } from "../../../assets/errors";
import { IUser } from "../../../types/models";
import { Token, Mail } from "../../../assets/enums";
import bcrypt from 'bcryptjs';

async function validateRegisterRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { username, email, password } = req.body;

    try {
        if(req.services.token.verifyToken(Token.ACCESS, req.cookies.jid)) {
            throw new AlreadyLoggedInError();
        };

        if(!validator.validateInput({ email, password, username })) {
            throw new IncorrectInputError();
        };

        const existingUsername: IUser | null = await req.services.user.findOne({ username });
        if(existingUsername) {
            throw new UsernameAlreadyExistError();
        };

        const existingEmail: IUser | null = await req.services.user.findOne({ email });
        if(existingEmail) {
            throw new EmailAlreadyExistError();
        };

        req.context = {
            username,
            email,
            password
        };

        next();
    } catch(error) {
        error.place = 'Register route';
        next(error);
    };
};

async function validateLoginRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;

    try {
        if(req.services.token.verifyToken(Token.ACCESS, req.cookies.jid)) {
            throw new AlreadyLoggedInError();
        };
        
        if(!validator.validateInput({ email, password })) {
            throw new IncorrectInputError();
        };

        const user: IUser | null = await req.services.user.findOne({ email });
        if(!user) {
            throw new InvalidEmailOrPasswordError();
        };

        const isMatch: boolean = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            throw new InvalidEmailOrPasswordError();
        };

        if(!user.isConfirmed) {
            throw new EmailNotConfirmedError();
        };

        const isIPValid: boolean = await validator.validateIP(user.trustedIPS, req.ip);
        if(!isIPValid) {
            const token: string = req.services.token.generateToken(Token.CONFIRM_IDENTITY, { id: user.id, ip: req.ip });

            req.services.email.sendMail(Mail.CONFIRM_IDENTITY, { 
                email: user.email,
                id: user.id,
                ip: req.ip,
                token: token
            });

            throw new UnknownLocationError();
        };

        req.context = {
            id: user.id,
            email: user.email,
            username: user.username
        };

        next();
    } catch(error) {
        error.place = 'Login route';
        next(error);
    };
};

export default {
    register: validateRegisterRoute,
    login: validateLoginRoute
}