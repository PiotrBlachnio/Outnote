import faker from 'faker';
import account from '../lib/account-handlers';
import { Token, Mail } from '../../assets/enums';

describe('Forgot password success event', () => {
    const token: string = faker.random.uuid();

    const services = {
        token: {
            generateToken: jest.fn().mockReturnValue(token)
        },
        email: {
            sendMail: jest.fn() 
        }
    };
    
    const id: string = faker.random.uuid();
    const email: string = faker.internet.email();

    it('Should call generate token function', async (done) => {
        //@ts-ignore-start
        await account.forgotPasswordSuccessHandler({ id, email }, services);

        expect(services.token.generateToken).toHaveBeenCalled();
        done();
    });

    it('Should pass correct parameters to the generate token function', async (done) => {
        expect(services.token.generateToken.mock.calls[0]).toEqual([Token.RESET_PASSWORD, { id }]);
        done();
    });

    it('Should call send mail function', (done) => {
        expect(services.email.sendMail).toHaveBeenCalled();
        done();
    });

    it('Should pass correct parameters to the send mail function', (done) => {
        expect(services.email.sendMail.mock.calls[0]).toEqual([Mail.RESET_PASSWORD, { id, email, token }]);
        done();
    });
});