import UserService from "../../services/user-service";
import bcrypt from 'bcryptjs';
import { IUser } from "../../types/models";
import TokenService from "../../services/token-service";
import { Token, Mail } from "../../assets/enums";
import EmailService from "../../services/email-service";

const defaultServices = {
    user: new UserService(),
    token: new TokenService(),
    email: new EmailService()
};

export default async (data: { username: string, email: string, password: string, ip: string }, services: typeof defaultServices = defaultServices): Promise<void> => {
    const hashedPassword: string = await bcrypt.hash(data.password, 12);
    const hashedIP: string = await bcrypt.hash(data.ip, 12);

    const user: IUser = await services.user.create({
        username: data.username,
        email: data.email,
        password: hashedPassword,
        trustedIPS: [hashedIP]
    });

    const token: string = services.token.generateToken(Token.CONFIRM_EMAIL, { id: user.id });

    services.email.sendMail(Mail.CONFIRM_EMAIL, {
        email: data.email,
        id: user.id,
        token: token 
    });
};