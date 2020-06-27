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

export default async (data: { id: string, email: string }, services: IServices = defaultServices): Promise<void> => {
    const token: string = services.tokenService.generateToken(Token.RESET_PASSWORD, { id: data.id });

    services.emailService.sendMail(Mail.RESET_PASSWORD, {
        id: data.id,
        email: data.email,
        token: token
    });
};