import { Request, Response, NextFunction } from "express";
import { UserNotFoundError, UnknownLocationError, AccessDenied, ExpiredOrInvalidTokenError } from "../assets/errors";
import logger from "../utils/logger";
import { IUser } from "../types/models";
import { Token, Roles } from "../assets/enums";
import { IAccessTokenPayload } from "../types/tokens";

export default (role: Roles) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const token: string = req.headers['Authorization'] as string;
    
        try {
            const payload: IAccessTokenPayload | null = req.services.token.verifyToken(Token.ACCESS, token);
    
            if(!payload) {
                throw new ExpiredOrInvalidTokenError();
            };
    
            const user: IUser | null = await req.services.user.findById(payload.id);
            if(!user) {
                throw new UserNotFoundError();
            };
    
            if(req.ip !== payload.ip) {
                throw new UnknownLocationError();
            };
    
            if(role > user.role) {
                throw new AccessDenied();
            };

            await logger.log({ type: 'info', message: 'User authorized successfully!', place: 'Auth middleware' });
    
            req.user = {
                id: payload.id,
                email: payload.email,
                username: payload.username
            };

            next();
        } catch(error) {
            next(error);
        };  
    };
};