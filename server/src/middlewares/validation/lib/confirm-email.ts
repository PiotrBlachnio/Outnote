import { NextFunction, Request, Response } from "express";
import { IncorrectInputError, ExpiredOrInvalidTokenError, InvalidUserError, UserNotFoundError, EmailAlreadyConfirmedError } from "../../../assets/errors";
import validator from '../../../utils/validators';
import { IUser } from "../../../types/models";
import { IConfirmEmailTokenPayload } from "../../../types/tokens";
import { Token } from "../../../assets/enums";

async function confirmEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id, token } = req.body;

    try {
        if(!validator.validateInput({ id })) {
            throw new IncorrectInputError();
        };

        const payload: IConfirmEmailTokenPayload | null = req.services.token.verifyToken(Token.CONFIRM_EMAIL, token);

        if(!payload) {
            throw new ExpiredOrInvalidTokenError();
        };

        if(payload.id !== id) {
            throw new InvalidUserError();
        };

        const user: IUser | null = await req.services.user.findById(id);
        if(!user) {
            throw new UserNotFoundError();
        };

        if(user.isConfirmed) {
            throw new EmailAlreadyConfirmedError();
        };

        req.context = { id: user.id };
        next();
    } catch(error) {
        error.place = 'Confirm email route';
        next(error);
    };
};

export default confirmEmail;