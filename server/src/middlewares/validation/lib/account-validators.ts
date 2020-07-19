import { NextFunction, Request, Response } from "express";
import { IncorrectInputError, InvalidUserError, ExpiredOrInvalidTokenError, UserNotFoundError, InvalidPasswordError, EmailNotConfirmedError, LocationAlreadyAddedError, EmailAlreadyConfirmedError, AlreadyLoggedInError } from "../../../assets/errors";
import validator from '../../../utils/validators';
import { IUser } from "../../../types/models";
import { IConfirmIdentityTokenPayload, IConfirmEmailTokenPayload, IResetPasswordTokenPayload } from "../../../types/tokens";
import bcrypt from 'bcryptjs';
import { Token } from "../../../assets/enums";

async function validateAddLocationRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id, token } = req.body;

    try {
        if(!validator.validateInput({ id })) {
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

async function validateConfirmEmailRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
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

async function validateForgotPasswordRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email } = req.body;

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

async function validateResetPasswordRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
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

async function validateSendConfirmationMailRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
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

export default {
    addLocation: validateAddLocationRoute,
    confirmEmail: validateConfirmEmailRoute,
    forgotPassword: validateForgotPasswordRoute,
    resetPassword: validateResetPasswordRoute,
    sendConfirmationMail: validateSendConfirmationMailRoute
};