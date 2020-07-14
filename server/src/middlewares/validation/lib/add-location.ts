import { NextFunction, Request, Response } from "express";
import { IncorrectInputError, InvalidUserError, ExpiredOrInvalidTokenError, UserNotFoundError, InvalidPasswordError, EmailNotConfirmedError, LocationAlreadyAddedError } from "../../../assets/errors";
import validator from '../../../utils/validators';
import { IUser } from "../../../types/models";
import { IConfirmIdentityTokenPayload } from "../../../types/tokens";
import bcrypt from 'bcryptjs';
import { Token } from "../../../assets/enums";

async function addLocation(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id, token, password } = req.body;

    try {
        if(!validator.validateInput({ id, password })) {
            throw new IncorrectInputError();
        };

        const payload: IConfirmIdentityTokenPayload | null = req.services.token.verifyToken(Token.CONFIRM_IDENTITY, token);

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

        const isPasswordCorrect: boolean = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
            throw new InvalidPasswordError();
        };

        if(!user.isConfirmed) {
            throw new EmailNotConfirmedError();
        };

        if(await validator.validateIP(user.trustedIPS, payload.ip)) {
            throw new LocationAlreadyAddedError();
        };

        req.context = { id: user.id };
        next();
    } catch(error) {
        error.place = 'Add location route';
        next(error);
    };
};

export default addLocation;