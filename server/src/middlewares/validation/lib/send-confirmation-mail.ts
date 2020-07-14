import { NextFunction, Request, Response } from "express";
import { AlreadyLoggedInError, IncorrectInputError, UserNotFoundError, EmailAlreadyConfirmedError } from "../../../assets/errors";
import { IUser } from "../../../types/models";
import validator from '../../../utils/validators';
import { Token } from "../../../assets/enums";

async function sendConfirmationMail(req: Request, res: Response, next: NextFunction): Promise<void> {
    const email: string = req.body.email;

    try {
        if(req.services.token.verifyToken(Token.ACCESS, req.cookies.jid)) {
            throw new AlreadyLoggedInError();
        };
        
        if(!validator.validateInput({ email })) {
            throw new IncorrectInputError();
        };
        
        const user: IUser | null = await req.services.user.findOne({ email });
        if(!user) {
            throw new UserNotFoundError();
        };

        if(user.isConfirmed) {
            throw new EmailAlreadyConfirmedError();
        };

        req.context = {
            email: user.email,
            id: user.id
        };
        
        next();
    } catch(error) {
        error.place = 'Send confirmation mail route';
        next(error);
    };
};

export default sendConfirmationMail;