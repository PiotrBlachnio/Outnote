import { NextFunction, Request, Response } from "express";
import { AlreadyLoggedInError, IncorrectInputError, ExpiredOrInvalidTokenError, InvalidUserError, UserNotFoundError, EmailNotConfirmedError } from "../../assets/errors";
import validator from '../../utils/validators';
import { IUser } from "../../types/models";
import { IResetPasswordTokenPayload } from "../../types/tokens";
import { Token } from "../../assets/enums";

async function resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id, token, password } = req.body;

    try {
        if(req.services.token.verifyToken(Token.ACCESS, req.cookies.jid)) {
            throw new AlreadyLoggedInError();
        };
        
        if(!validator.validateInput({ id, password })) {
            throw new IncorrectInputError();
        };

        const payload: IResetPasswordTokenPayload | null = req.services.token.verifyToken(Token.RESET_PASSWORD, token);

        if(!payload) {
            throw new ExpiredOrInvalidTokenError();
        };

        if(payload.id !== id) {
            throw new InvalidUserError();
        };

        const user: IUser | null = await req.services.user.findById(id)
        if(!user) {
            throw new UserNotFoundError();
        };

        if(!user.isConfirmed) {
            throw new EmailNotConfirmedError();
        };
        
        req.context = { 
            id: user.id,
            password: password
        };
        
        next();
    } catch(error) {
        error.place = 'Reset password route';
        next(error);
    };
};

export default resetPassword;