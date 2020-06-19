export type TMailData = IConfirmEmailTemplateData | IConfirmIdentityTemplateData | IResetPasswordTemplateData;

export interface IMailTemplate {
    from: string;
    to: string;
    subject: string;
    html: string;
}

export interface IConfirmEmailTemplateData {
    email: string;
    id: string;
    token: string;
}

export interface IConfirmIdentityTemplateData {
    email: string;
    id: string;
    ip: string;
    token: string;
}

export interface IResetPasswordTemplateData {
    email: string;
    id: string;
    token: string;
}