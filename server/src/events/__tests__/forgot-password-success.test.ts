import faker from 'faker';
import forgotPasswordSuccess from '../lib/forgot-password-success';
import { Token, Mail } from '../../assets/enums';

describe('Forgot password success event', () => {
    const token: string = faker.random.uuid();

    const services = {
        tokenService: {
            generateToken: jest.fn().mockReturnValue(token)
        },
        emailService: {
            sendMail: jest.fn() 
        }
    };
    
    const id: string = faker.random.uuid();
    const email: string = faker.internet.email();

    it('Should call generate token function', async (done) => {
        //@ts-ignore-start
        await forgotPasswordSuccess({ id, email }, services);

        expect(services.tokenService.generateToken).toHaveBeenCalled();
        done();
    });

    it('Should pass correct parameters to the generate token function', async (done) => {
        expect(services.tokenService.generateToken.mock.calls[0]).toEqual([Token.RESET_PASSWORD, { id }]);
        done();
    });

    it('Should call send mail function', (done) => {
        expect(services.emailService.sendMail).toHaveBeenCalled();
        done();
    });

    it('Should pass correct parameters to the send mail function', (done) => {
        expect(services.emailService.sendMail.mock.calls[0]).toEqual([Mail.RESET_PASSWORD, { id, email, token }]);
        done();
    });
});