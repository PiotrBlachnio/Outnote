import { NextFunction, Request, Response } from "express";
import validator from '../../utils/validators';
import { AlreadyLoggedInError, IncorrectInputError, InvalidEmailOrPasswordError, EmailNotConfirmedError, AccountSuspendedError, UnknownLocationError } from "../../assets/errors";
import bcrypt from 'bcryptjs';
import { IUser } from "../../types/models";
import { Token, Mail } from "../../assets/enums";

async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;

    try {
        if(req.services.token.verifyToken(Token.REFRESH, req.cookies.jid)) {
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

        const ban: IBan | null = await req.services.ban.findOne({ user: user.id });
        if(ban && ban.expirationDate > Date.now()) {
            throw new AccountSuspendedError(ban.reason);
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
            banId: ban ? ban.id : undefined,
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

export default login;