import EmailService from "../email-service";
import faker from 'faker';
import { Mail } from "../../assets/enums";

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
        });
    });
});