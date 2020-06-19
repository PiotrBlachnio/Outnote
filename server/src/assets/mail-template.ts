import config from "./config";
import getLocalization from "../utils/get-localization";
import { IConfirmEmailTemplateData, IMailTemplate, IConfirmIdentityTemplateData, IResetPasswordTemplateData } from "../types/mails";

class MailTemplate {
    public confirmEmail(data: IConfirmEmailTemplateData): IMailTemplate {
        return {
            from: config.MAIL_USER!,
            to: data.email,
            subject: 'Email confirmation',
            html: `<b>Thanks for joining Realms community!</b><br></br>
                      Please confirm that your email address is correct to continue. Your confirmation link: https://www.frontend.com/confirm-emai?user=${data.id}&token=${data.token}
                    
            `
        };
    };

    public async confirmIdentity(data: IConfirmIdentityTemplateData): Promise<IMailTemplate> {
        const localization = await getLocalization(data.ip);
        const localizationMessage: string = (!localization.data.country_name) ? 'non-determinable' : `${localization.data.city}, ${localization.data.region_name}, ${localization.data.country_name}`;

        return {
            from: config.MAIL_USER!,
            to: data.email,
            subject: '[Security alert] Someone is trying to login to your account from a different device!',
            html: `
                      Detected login attemp from ip: <b>${data.ip}</b>, localization: <b>${localizationMessage}</b>
                      Click here to confirm your identity: https://www.frontend.com/confirm-identity?user=${data.id}&token=${data.token}
            `
        };
    };

    public resetPassword(data: IResetPasswordTemplateData): IMailTemplate {
        return {
            from: config.MAIL_USER!,
            to: data.email,
            subject: 'Reset password',
            html: `<b>Reset password request</b><br></br>
                      Click here to reset your password: https://www.frontend.com/reset-password?user=${data.id}&token=${data.token}
                    
            `
        };
    };
};

export default MailTemplate;