import { NextFunction, Request, Response } from "express";
import validator from '../../../utils/validators';
import { AlreadyLoggedInError, IncorrectInputError, UsernameAlreadyExistError, EmailAlreadyExistError } from "../../../assets/errors";
import { IUser } from "../../../types/models";
import { Token } from "../../../assets/enums";

async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
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

export default register;