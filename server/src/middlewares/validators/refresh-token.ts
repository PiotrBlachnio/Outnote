import { NextFunction, Request, Response } from "express";
import { ExpiredOrInvalidTokenError, UserNotFoundError, NotExpiredYetOrInvalidTokenError, EmailNotConfirmedError, UnknownIdentityError } from "../../assets/errors";
import { Types } from "mongoose";
import { IUser } from "../../types/models";
import { IRefreshTokenPayload } from "../../types/tokens";
import { Token } from "../../assets/enums";

async function refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    const refreshToken: string = req.cookies.jid;
    const accessToken: string = req.body.accessToken;

    try {
        const refreshTokenPayload: IRefreshTokenPayload | null = req.services.token.verifyToken(Token.REFRESH, refreshToken);

        if(!refreshTokenPayload) {
            throw new ExpiredOrInvalidTokenError();
        };

        if(!Types.ObjectId.isValid(refreshTokenPayload.id)) {
            throw new UserNotFoundError();
        };
        
        const isExpired: boolean = req.services.token.isTokenExpired(Token.ACCESS, accessToken);

        if(!isExpired) {
            throw new NotExpiredYetOrInvalidTokenError();
        };

        const user: IUser | null = await req.services.user.findById(refreshTokenPayload.id);
        if(!user) {
            throw new UserNotFoundError();
        };

        if(!user.isConfirmed) {
            throw new EmailNotConfirmedError();
        };

        if(refreshTokenPayload.ip !== req.ip) {
            throw new UnknownIdentityError();
        };

        req.context = {
            id: user.id,
            email: user.email,
            username: user.username
        };
        
        next();
    } catch(error) {
        error.place = 'Refresh token route';
        next(error);
    };
};

export default refreshToken;