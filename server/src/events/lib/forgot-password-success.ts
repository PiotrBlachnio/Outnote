import TokenService from "../../services/token-service";
import { Token, Mail } from "../../assets/enums";
import EmailService from "../../services/email-service";

const defaultServices = {
    token: new TokenService(),
    email: new EmailService()
};

export default async (data: { id: string, email: string }, services: typeof defaultServices = defaultServices): Promise<void> => {
    const token: string = services.token.generateToken(Token.RESET_PASSWORD, { id: data.id });

    services.email.sendMail(Mail.RESET_PASSWORD, {
        id: data.id,
        email: data.email,
        token: token
    });
};