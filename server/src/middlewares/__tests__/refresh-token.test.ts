import { clearDatabase, connectDatabase, createUser } from '../../utils/test-utils';
import UserService from '../../services/user-service';
import TokenService from '../../services/token-service';
import { ExpiredOrInvalidTokenError, UserNotFoundError, NotExpiredYetOrInvalidTokenError, EmailNotConfirmedError, UnknownIdentityError } from '../../assets/errors';
import { Token } from '../../assets/enums';
import { IUser } from '../../types/models';
import faker from 'faker';
import refreshToken from '../validators/refresh-token';
import jwt from 'jsonwebtoken';
import config from '../../assets/config';

beforeAll(async () => {
    await connectDatabase();
});

afterAll(async () => {
    await clearDatabase();
});

describe('Refresh token validator', () => {
    const services = {
        token: new TokenService(),
        user: new UserService()
    };

    const req = {
        context: {
            email: '',
            username: '',
            id: ''
        },
        body: {
            id: '',
            accessToken: ''
        },
        cookies: {
            jid: ''
        },
        services: services,
        ip: faker.internet.ip()
    };

    const ip: string = faker.internet.ip();
    let user: IUser;
    
    describe('When token is invalid', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            req.body.id = (await createUser()).id;

            // @ts-ignore-start
            await refreshToken(req, {}, next);

            expect(next).toHaveBeenCalledWith(new ExpiredOrInvalidTokenError);
            done();
        });
    });

    describe('When user\'s id has invalid format', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            req.cookies.jid = services.token.generateToken(Token.REFRESH, { id: faker.random.uuid() });

            // @ts-ignore-start
            await refreshToken(req, {}, next);

            expect(next).toHaveBeenCalledWith(new UserNotFoundError);
            done();
        });
    });

    describe('When access token has not expired yet or is invalid', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            user = await createUser();

            req.cookies.jid = services.token.generateToken(Token.REFRESH, { id: user.id });
            req.body.accessToken = services.token.generateToken(Token.ACCESS, { id: user.id });

            // @ts-ignore-start
            await refreshToken(req, {}, next);

            expect(next).toHaveBeenCalledWith(new NotExpiredYetOrInvalidTokenError);
            done();
        });
    });

    describe('When user does not exist', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            await services.user.deleteOne({ _id: user.id });

            req.body.accessToken = jwt.sign({ id: user.id }, config.ACCESS_TOKEN_SECRET, { expiresIn: '0.001s' });

            // @ts-ignore-start
            await refreshToken(req, {}, next);

            expect(next).toHaveBeenCalledWith(new UserNotFoundError);
            done();
        });
    });

    describe('When user\'s account is not confirmed yet', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            user = await createUser();

            req.cookies.jid = services.token.generateToken(Token.REFRESH, { id: user.id, ip: ip });

            // @ts-ignore-start
            await refreshToken(req, {}, next);

            expect(next).toHaveBeenCalledWith(new EmailNotConfirmedError);
            done();
        });
    });

    describe('When user is trying to perform action from unknown location', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            await services.user.updateOne({ _id: user.id }, { isConfirmed: true })

            // @ts-ignore-start
            await refreshToken(req, {}, next);

            expect(next).toHaveBeenCalledWith(new UnknownIdentityError);
            done();
        });
    });
    describe('When valid data was provided', () => {
        it('Should assign req context property', async (done) => {
            const next: jest.Mock = jest.fn();
            req.ip = ip;

            // @ts-ignore-start
            await refreshToken(req, {}, next);

            expect(req.context.id).toEqual(user.id);
            expect(req.context.email).toEqual(user.email);
            expect(req.context.username).toEqual(user.username);

            done();
        });
    });
});