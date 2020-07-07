export interface IAccessTokenPayload {
    id: string;
    username: string;
    email: string;
    ip: string;
}

export interface IConfirmEmailTokenPayload {
    id: string;
}

export interface IResetPasswordTokenPayload {
    id: string;
}

export interface IConfirmIdentityTokenPayload {
    id: string;
    ip: string;
}

export type TokenPayload = 
    IAccessTokenPayload |
    IConfirmEmailTokenPayload | 
    IResetPasswordTokenPayload |
    IConfirmIdentityTokenPayload |
    null;