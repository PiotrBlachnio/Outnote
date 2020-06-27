import nodemailer, { Transporter } from "nodemailer";
import config from "../assets/config";
import logger from "../utils/logger";
import { Mail } from "../assets/enums";
import MailTemplate from "../assets/mail-template";
import { TMailData, IConfirmEmailTemplateData, IConfirmIdentityTemplateData, IResetPasswordTemplateData } from "../types/mails";

const defaultTransporter: Transporter = nodemailer.createTransport({
    pool: true,
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: config.MAIL_USER,
        refreshToken: config.MAIL_REFRESH_TOKEN,
        clientId: config.MAIL_CLIENT_ID,
        clientSecret: config.MAIL_CLIENT_SECRET
    }
});

class EmailService {
    private readonly _transporter: Transporter;
    
    constructor(transporter: Transporter = defaultTransporter) {
        this._transporter = transporter;

        this._transporter.verify(async (error) => {
            if(error) {
                await logger.log({ type: 'error', message: error.message, place: 'Send mail function' });
            };
        });
    };

    public async sendMail(template: Mail, data: TMailData): Promise<void> {
        switch(template) {
            case Mail.CONFIRM_EMAIL:
                this._transporter.sendMail(new MailTemplate().confirmEmail(data as IConfirmEmailTemplateData));
                break;
            case Mail.CONFIRM_IDENTITY:
                this._transporter.sendMail(await new MailTemplate().confirmIdentity(data as IConfirmIdentityTemplateData));
                break;
            case Mail.RESET_PASSWORD:
                this._transporter.sendMail(new MailTemplate().resetPassword(data as IResetPasswordTemplateData));
                break;
            default:
                throw new Error('Template type is invalid!');
        };
    };
};

export default EmailService;