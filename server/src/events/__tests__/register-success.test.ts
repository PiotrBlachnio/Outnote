import faker from 'faker';
import { Token, Mail } from '../../assets/enums';
import auth from '../lib/auth-handlers';

describe('Register success event', () => {
    const id: string = faker.random.uuid();
    const token: string = faker.random.uuid();

    const services = {
        userService: {
            create: jest.fn().mockReturnValue({ id })
        },
        tokenService: {
            generateToken: jest.fn() .mockReturnValue(token)
        },
        emailService: {
            sendMail: jest.fn() 
        }
    };
    
    const data = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        ip: faker.internet.ip()
    };

    it('Should call create function', async (done) => {
        //@ts-ignore-start
        await auth.registerSuccessHandler(data, services);

        expect(services.userService.create).toHaveBeenCalled();
        done();
    });

    it('Should call generate token function', async (done) => {
        expect(services.tokenService.generateToken).toHaveBeenCalled();
        done();
    });

    it('Should pass correct parameters to the generate token function', async (done) => {
        expect(services.tokenService.generateToken.mock.calls[0]).toEqual([Token.CONFIRM_EMAIL, { id }]);
        done();
    });

    it('Should call send mail function', (done) => {
        expect(services.emailService.sendMail).toHaveBeenCalled();
        done();
    });

    it('Should pass correct parameters to the send mail function', (done) => {
        expect(services.emailService.sendMail.mock.calls[0]).toEqual([Mail.CONFIRM_EMAIL, {
            email: data.email,
            id: id,
            token: token 
        }]);
        done();
    });
});