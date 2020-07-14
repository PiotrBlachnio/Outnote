import UserService from "../../services/user-service";
import bcrypt from 'bcryptjs';
import TokenService from "../../services/token-service";
import EmailService from "../../services/email-service";
import { Token, Mail } from "../../assets/enums";

const defaultServices = {
    user: new UserService()
};

const secondaryDefaultServices = {
    token: new TokenService(),
    email: new EmailService()
};

async function addLocationSuccessHandler(data: { userId: string, ip: string }, services: typeof defaultServices = defaultServices): Promise<void> {
    const hashedIP: string = await bcrypt.hash(data.ip, 12);

    await services.user.updateOne({ _id: data.userId }, { $push: { trustedIPS: hashedIP }});
};

async function confirmEmailSuccessHandler(userId: string, services: typeof defaultServices = defaultServices): Promise<void> {
    await services.user.updateOne({ _id: userId }, { isConfirmed: true });
};

async function forgotPasswordSuccessHandler(data: { id: string, email: string }, services: typeof secondaryDefaultServices = secondaryDefaultServices): Promise<void> {
    const token: string = services.token.generateToken(Token.RESET_PASSWORD, { id: data.id });

    services.email.sendMail(Mail.RESET_PASSWORD, {
        id: data.id,
        email: data.email,
        token: token
    });
};

async function resetPasswordSuccessHandler(data: { userId: string, password: string }, services: typeof defaultServices = defaultServices): Promise<void> {
    const hashedPassword: string = await bcrypt.hash(data.password, 12);

    await services.user.updateOne({ _id: data.userId }, { password: hashedPassword });
};

async function sendConfirmationMailSuccessHandler(data: { email: string, id: string }, services: typeof secondaryDefaultServices = secondaryDefaultServices): Promise<void> {
    const token: string = services.token.generateToken(Token.CONFIRM_EMAIL, { id: data.id });

    services.email.sendMail(Mail.CONFIRM_EMAIL, { 
        email: data.email,
        id: data.id,
        token: token
    });
};

export default {
    addLocationSuccessHandler,
    confirmEmailSuccessHandler,
    forgotPasswordSuccessHandler,
    resetPasswordSuccessHandler,
    sendConfirmationMailSuccessHandler
};