import EmailService from "../email-service";
import faker from 'faker';
import { Mail } from "../../assets/enums";
import MailTemplate from "../../assets/mail-template";
import { IConfirmEmailTemplateData, IConfirmIdentityTemplateData, IResetPasswordTemplateData } from "../../types/mails";

describe('Email service', () => {
    describe('Send mail function', () => {
        const data = {
            id: faker.random.uuid(),
            email: faker.internet.email(),
            token: faker.random.uuid()
        };

        describe('Confirm email mail', () => {
            const transporter = {
                sendMail: jest.fn(),
                verify: jest.fn()
            };
        
            //@ts-ignore-start
            const emailService: EmailService = new EmailService(transporter);

            it('Should call send mail function', (done) => {
                emailService.sendMail(Mail.CONFIRM_EMAIL, data);

                expect(transporter.sendMail).toHaveBeenCalled();
                done();
            });

            it('Should pass correct parameters to send mail function', (done) => {
                expect(transporter.sendMail.mock.calls[0][0]).toEqual(new MailTemplate().confirmEmail(data as IConfirmEmailTemplateData))
                done();
            });
        });

        describe('Confirm identity mail', () => {
            const transporter = {
                sendMail: jest.fn(),
                verify: jest.fn()
            };
        
            //@ts-ignore-start
            const emailService: EmailService = new EmailService(transporter);

            it('Should call send mail function', async (done) => {
                await emailService.sendMail(Mail.CONFIRM_IDENTITY, data);

                expect(transporter.sendMail).toHaveBeenCalled();
                done();
            });

            it('Should pass correct parameters to send mail function', async (done) => {
                expect(transporter.sendMail.mock.calls[0][0]).toEqual(await new MailTemplate().confirmIdentity(data as IConfirmIdentityTemplateData))
                done();
            });
        });

        describe('Reset password mail', () => {
            const transporter = {
                sendMail: jest.fn(),
                verify: jest.fn()
            };
        
            //@ts-ignore-start
            const emailService: EmailService = new EmailService(transporter);

            it('Should call send mail function', (done) => {
                emailService.sendMail(Mail.RESET_PASSWORD, data);

                expect(transporter.sendMail).toHaveBeenCalled();
                done();
            });

            it('Should pass correct parameters to send mail function', (done) => {
                expect(transporter.sendMail.mock.calls[0][0]).toEqual(new MailTemplate().resetPassword(data as IResetPasswordTemplateData))
                done();
            });
        });
    });
});