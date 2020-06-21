import UserService from "../../services/user-service";
import bcrypt from 'bcryptjs';
import { IUser } from "../../types/models";
import TokenService from "../../services/token-service";
import { Token, Mail } from "../../assets/enums";
import EmailService from "../../services/email-service";

interface IServices {
    userService: UserService,
    tokenService: TokenService,
    emailService: EmailService
};

const defaultServices: IServices = {
    userService: new UserService(),
    tokenService: new TokenService(),
    emailService: new EmailService()
};

export default async (data: { username: string, email: string, password: string, ip: string }, services: IServices = defaultServices): Promise<void> => {
    const hashedPassword: string = await bcrypt.hash(data.password, 12);
    const hashedIP: string = await bcrypt.hash(data.ip, 12);

    const user: IUser = await services.userService.create({
        username: data.username,
        email: data.email,
        password: hashedPassword,
        trustedIPS: [hashedIP]
    });

    const token: string = services.tokenService.generateToken(Token.CONFIRM_EMAIL, { id: user.id });

    services.emailService.sendMail(Mail.CONFIRM_EMAIL, {
        email: data.email,
        id: user.id,
        token: token 
    });
};