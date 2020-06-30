import config from "./config";
import getLocalization from "../utils/get-localization";
import faker from 'faker';
import { IConfirmEmailTemplateData, IMailTemplate, IConfirmIdentityTemplateData, IResetPasswordTemplateData } from "../types/mails";

class MailTemplate {
    public confirmEmail(data: IConfirmEmailTemplateData): IMailTemplate {
        return {
            from: config.MAIL_USER!,
            to: data.email,
            subject: 'Email confirmation',
            html: `<b>Thanks for joining Realms community!</b><br></br>
                      Click <a href="https://localhost:8080/confirm-email?user=${data.id}&token=${data.token}&uniqueKey=${faker.random.uuid()}">here</a> to confirm your email
                    
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
                      Click <a href="https://localhost:8080/confirm-identity?user=${data.id}&token=${data.token}&uniqueKey=${faker.random.uuid()}">here</a> to confirm your identity
            `
        };
    };

    public resetPassword(data: IResetPasswordTemplateData): IMailTemplate {
        return {
            from: config.MAIL_USER!,
            to: data.email,
            subject: 'Reset password',
            html: `<b>Reset password request</b><br></br>
                      Click <a href="http://localhost:8080/reset-password?user=${data.id}&token=${data.token}&uniqueKey=${faker.random.uuid()}">here</a> to reset your password
                    
            `
        };
    };
};

export default MailTemplate;