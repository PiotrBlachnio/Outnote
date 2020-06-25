import TokenService from "../../services/token-service";
import { Token, Mail } from "../../assets/enums";
import EmailService from "../../services/email-service";

interface IServices {
    tokenService: TokenService,
    emailService: EmailService
};

const defaultServices: IServices = {
    tokenService: new TokenService(),
    emailService: new EmailService()
};

export default async (data: { email: string, id: string }, services: IServices = defaultServices): Promise<void> => {
    const token: string = services.tokenService.generateToken(Token.CONFIRM_EMAIL, { id: data.id });

    services.emailService.sendMail(Mail.CONFIRM_EMAIL, { 
        email: data.email,
        id: data.id,
        token: token
    });
};