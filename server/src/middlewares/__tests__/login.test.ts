import { clearDatabase, connectDatabase, createUser } from '../../utils/test-utils';
import UserService from '../../services/user-service';
import TokenService from '../../services/token-service';
import { IncorrectInputError, AlreadyLoggedInError, EmailNotConfirmedError, InvalidEmailOrPasswordError, UnknownLocationError } from '../../assets/errors';
import { Token, Mail } from '../../assets/enums';
import { IUser } from '../../types/models';
import login from '../validators/login';
import faker from 'faker';
import bcrypt from 'bcryptjs';

beforeAll(async () => {
    await connectDatabase();
});

afterAll(async () => {
    await clearDatabase();
});

describe('Login validator', () => {
    const services = {
        token: new TokenService(),
        user: new UserService()
    };

    const generateTokenMock: jest.Mock = jest.fn().mockReturnValue('test-token');
    const sendMailMock: jest.Mock = jest.fn();

    const req = {
        context: {
            ban: '',
            id: '',
            email: '',
            username: ''
        },
        body: {
            email: '',
            password: ''
        },
        cookies: {
            jid: ''
        },
        services: {
            token: {
                generateToken: generateTokenMock,
                verifyToken: services.token.verifyToken
            },
            email: {
                sendMail: sendMailMock
            },
            user: services.user
        },
        ip: faker.internet.ip()
    };

    let user: IUser;
    const password: string = 'Jeff1234';
    
    describe('When user is already logged in', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            req.cookies.jid =  services.token.generateToken(Token.ACCESS, { id: faker.random.uuid() });

            // @ts-ignore-start
            await login(req, {}, next);

            expect(next).toHaveBeenCalledWith(new AlreadyLoggedInError);
            done();
        });
    });

    describe('When input is invalid', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            req.cookies.jid = '';

            // @ts-ignore-start
            await login(req, {}, next);

            expect(next).toHaveBeenCalledWith(new IncorrectInputError);
            done();
        });
    });
    
    describe('When user does not exist', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            req.body.email = faker.internet.email();
            req.body.password = 'Jeff1234';

            // @ts-ignore-start
            await login(req, {}, next);

            expect(next).toHaveBeenCalledWith(new InvalidEmailOrPasswordError);
            done();
        });
    });

    describe('When password is invalid', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            user = await createUser({ password: await bcrypt.hash(password, 12) });

            req.body.email = user.email;
            req.body.password = password + '5';

            // @ts-ignore-start
            await login(req, {}, next);

            expect(next).toHaveBeenCalledWith(new InvalidEmailOrPasswordError);
            done();
        });
    });

    describe('When user\'s account is not confirmed yet', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            req.body.password = password;

            // @ts-ignore-start
            await login(req, {}, next);

            expect(next).toHaveBeenCalledWith(new EmailNotConfirmedError);
            done();
        });
    });

    describe('When user location is not confirmed yet', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            await services.user.updateOne({ _id: user.id }, { isConfirmed: true });

            // @ts-ignore-start
            await login(req, {}, next);

            expect(next).toHaveBeenCalledWith(new UnknownLocationError);
            done();
        });

        it('Should call generate token function', (done) => {
            expect(generateTokenMock).toHaveBeenCalled();
            done();
        });

        it('Should pass correct parameters to generate token function', (done) => {
            expect(generateTokenMock.mock.calls[0]).toEqual([Token.CONFIRM_IDENTITY, { id: user.id, ip: req.ip }])
            done();
        });

        it('Should call send mail function', (done) => {
            expect(sendMailMock).toHaveBeenCalled();
            done();
        });

        it('Should pass correct parameters to send mail function', (done) => {
            expect(sendMailMock.mock.calls[0]).toEqual([Mail.CONFIRM_IDENTITY, { 
                email: user.email,
                id: user.id,
                ip: req.ip,
                token: 'test-token'
            }]);
            done();
        });
    });

    describe('When valid data was provided', () => {
        it('Should assign req context property', async (done) => {
            const next: jest.Mock = jest.fn();
            await services.user.updateOne({ _id: user.id }, { trustedIPS: [await bcrypt.hash(req.ip, 12)] });

            // @ts-ignore-start
            await login(req, {}, next);

            expect(req.context.ban).toBeUndefined();
            expect(req.context.email).toEqual(user.email);
            expect(req.context.id).toEqual(user.id);
            expect(req.context.username).toEqual(user.username);

            done();
        });
    });
});