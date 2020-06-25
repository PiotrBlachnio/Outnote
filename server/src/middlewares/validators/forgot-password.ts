import { NextFunction, Request, Response } from "express";
import { AlreadyLoggedInError, IncorrectInputError, UserNotFoundError, EmailNotConfirmedError } from "../../assets/errors";
import validator from '../../utils/validators';
import { IUser } from "../../types/models";
import { Token } from "../../assets/enums";

async function forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email } = req.body;

    try {
        if(req.services.token.verifyToken(Token.REFRESH, req.cookies.jid)) {
            throw new AlreadyLoggedInError();
        };
        
        if(!validator.validateInput({ email })) {
            throw new IncorrectInputError();
        };

        const user: IUser | null = await req.services.user.findOne({ email });
        if(!user) {
            throw new UserNotFoundError();
        };

        if(!user.isConfirmed) {
            throw new EmailNotConfirmedError();
        };

        req.context = { 
            id: user.id,
            email: email
        };
        
        next();
    } catch(error) {
        error.place = 'Forgot password route';
        next(error);
    };
};

export default forgotPassword;