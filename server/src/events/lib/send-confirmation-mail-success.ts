import TokenService from "../../services/token-service";
import { Token, Mail } from "../../assets/enums";
import EmailService from "../../services/email-service";

const defaultServices = {
    token: new TokenService(),
    email: new EmailService()
};

export default async (data: { email: string, id: string }, services: typeof defaultServices = defaultServices): Promise<void> => {
    const token: string = services.token.generateToken(Token.CONFIRM_EMAIL, { id: data.id });

    services.email.sendMail(Mail.CONFIRM_EMAIL, { 
        email: data.email,
        id: data.id,
        token: token
    });
};