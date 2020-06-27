import { NextFunction, Request, Response } from "express";
import { AlreadyLoggedInError, IncorrectInputError, UserNotFoundError, EmailAlreadyConfirmedError } from "../../assets/errors";
import { IUser } from "../../types/models";
import validator from '../../utils/validators';
import { Token } from "../../assets/enums";

async function sendConfirmationMail(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id: string = req.body.id;

    try {
        if(req.services.token.verifyToken(Token.REFRESH, req.cookies.jid)) {
            throw new AlreadyLoggedInError();
        };
        
        if(!validator.validateInput({ id })) {
            throw new IncorrectInputError();
        };
        
        const user: IUser | null = await req.services.user.findById(id);
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