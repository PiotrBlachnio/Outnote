import { IAccessTokenPayload, TokenPayload, IConfirmEmailTokenPayload, IResetPasswordTokenPayload, IConfirmIdentityTokenPayload } from "../types/tokens";
import jwt, { VerifyErrors } from 'jsonwebtoken';
import config from "../assets/config";
import { Token } from "../assets/enums";

class TokenService {
    public generateToken(type: Token, payload: TokenPayload): string {
        if(!payload) {
            throw new Error('Payload must be provided!');
        };

        let token: string = '';

        switch(type) {
            case Token.ACCESS:
                token = jwt.sign(payload, config.ACCESS_TOKEN_SECRET);
                break;
            case Token.CONFIRM_EMAIL:
                token = jwt.sign(payload, config.CONFIRM_EMAIL_TOKEN_SECRET, { expiresIn: '1h' });
                break;
            case Token.RESET_PASSWORD:
                token = jwt.sign(payload, config.RESET_PASSWORD_TOKEN_SECRET, { expiresIn: '1h' });
                break;
            case Token.CONFIRM_IDENTITY:
                token = jwt.sign(payload, config.CONFIRM_IDENTITY_TOKEN_SECRET, { expiresIn: '1h' });
                break;
            default:
                throw new Error('Token type is invalid!');
        };

        return token;
    };

    public verifyToken(type: Token.ACCESS, token: string): IAccessTokenPayload
    public verifyToken(type: Token.CONFIRM_EMAIL, token: string): IConfirmEmailTokenPayload
    public verifyToken(type: Token.RESET_PASSWORD, token: string): IResetPasswordTokenPayload
    public verifyToken(type: Token.CONFIRM_IDENTITY, token: string): IConfirmIdentityTokenPayload
    public verifyToken(type: Token, token: string): TokenPayload {
        if(!token || typeof token !== 'string') {
            return null;
        };

        let data: TokenPayload = null;

        if(token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        };

        switch(type) {
            case Token.ACCESS:
                jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err: VerifyErrors | null, payload) => {
                    if(err) {
                        data = null;
                    } else {
                        data = (payload as IAccessTokenPayload);
                    };  
                });

                break;
            case Token.CONFIRM_EMAIL:
                jwt.verify(token, config.CONFIRM_EMAIL_TOKEN_SECRET, (err: VerifyErrors | null, payload) => {
                    if(err) {
                        data = null;
                    } else {
                        data = (payload as IConfirmEmailTokenPayload);
                    };  
                });

                break;
            case Token.RESET_PASSWORD:
                jwt.verify(token, config.RESET_PASSWORD_TOKEN_SECRET, (err: VerifyErrors | null, payload) => {
                    if(err) {
                        data = null;
                    } else {
                        data = (payload as IResetPasswordTokenPayload);
                    };       
                });

                break;
            case Token.CONFIRM_IDENTITY:
                jwt.verify(token, config.CONFIRM_IDENTITY_TOKEN_SECRET, (err: VerifyErrors | null, payload) => {
                    if(err) {
                        data = null;
                    } else {
                        data = (payload as IConfirmIdentityTokenPayload);
                    };  
                });

                break;
            default:
                throw new Error('Token type is invalid!');
        };

        return data;
    };

    public isTokenExpired(type: Token, token: string): boolean {
        if(!token || typeof token !== 'string') {
            return false;
        };

        let isExpired: boolean = false;

        if(token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        };

        switch(type) {
            case Token.ACCESS:
                jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err: VerifyErrors | null) => {
                    if(err && err.name === 'TokenExpiredError') {
                        isExpired = true;
                    };
                });

                break;
            case Token.CONFIRM_EMAIL:
                jwt.verify(token, config.CONFIRM_EMAIL_TOKEN_SECRET, (err: VerifyErrors | null) => {
                    if(err && err.name === 'TokenExpiredError') {
                        isExpired = true;
                    };
                });

                break;
            case Token.RESET_PASSWORD:
                jwt.verify(token, config.RESET_PASSWORD_TOKEN_SECRET, (err: VerifyErrors | null) => {
                    if(err && err.name === 'TokenExpiredError') {
                        isExpired = true;
                    };
                });

                break;
            case Token.CONFIRM_IDENTITY:
                jwt.verify(token, config.CONFIRM_IDENTITY_TOKEN_SECRET, (err: VerifyErrors | null) => {
                    if(err && err.name === 'TokenExpiredError') {
                        isExpired = true;
                    };
                });

                break;
            default:
                throw new Error('Token type is invalid!');
        };

        return isExpired;
    };
};

export default TokenService;