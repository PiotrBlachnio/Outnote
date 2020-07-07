import { clearDatabase, connectDatabase, createUser } from '../../utils/test-utils';
import UserService from '../../services/user-service';
import TokenService from '../../services/token-service';
import { IncorrectInputError, ExpiredOrInvalidTokenError, InvalidUserError, UserNotFoundError, AlreadyLoggedInError, EmailNotConfirmedError } from '../../assets/errors';
import { Token } from '../../assets/enums';
import { IUser } from '../../types/models';
import resetPassword from '../validators/reset-password';
import faker from 'faker';

beforeAll(async () => {
    await connectDatabase();
});

afterAll(async () => {
    await clearDatabase();
});

describe('Reset password validator', () => {
    const services = {
        token: new TokenService(),
        user: new UserService()
    };

    const req = {
        context: {
            id: '',
            password: ''
        },
        body: {
            id: '',
            token: '',
            password: ''
        },
        services: services,
        cookies: {
            jid: ''
        }
    };

    let user: IUser;
    
    describe('When user is already logged in', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            req.cookies.jid = services.token.generateToken(Token.ACCESS, { id: '' });

            // @ts-ignore-start
            await resetPassword(req, {}, next);

            expect(next).toHaveBeenCalledWith(new AlreadyLoggedInError);
            done();
        });
    });
    
    describe('When input is invalid', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            req.cookies.jid = '';

            // @ts-ignore-start
            await resetPassword(req, {}, next);

            expect(next).toHaveBeenCalledWith(new IncorrectInputError);
            done();
        });
    });
    
    describe('When token is invalid', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();

            req.body.id = (await createUser()).id;
            req.body.password = faker.random.alphaNumeric(10);

            // @ts-ignore-start
            await resetPassword(req, {}, next);

            expect(next).toHaveBeenCalledWith(new ExpiredOrInvalidTokenError);
            done();
        });
    });

    describe('When user is invalid', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            req.body.token = services.token.generateToken(Token.RESET_PASSWORD, { id: (await createUser()).id });

            // @ts-ignore-start
            await resetPassword(req, {}, next);

            expect(next).toHaveBeenCalledWith(new InvalidUserError);
            done();
        });
    });

    describe('When user does not exist', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();

            await services.user.deleteOne({ _id: req.body.id });
            req.body.token = services.token.generateToken(Token.RESET_PASSWORD, { id: req.body.id });

            // @ts-ignore-start
            await resetPassword(req, {}, next);

            expect(next).toHaveBeenCalledWith(new UserNotFoundError);
            done();
        });
    });

    describe('When user is not confirmed yet', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            user = await createUser({ isConfirmed: false });

            req.body.id = user.id;
            req.body.token = services.token.generateToken(Token.RESET_PASSWORD, { id: user.id });

            // @ts-ignore-start
            await resetPassword(req, {}, next);

            expect(next).toHaveBeenCalledWith(new EmailNotConfirmedError);
            done();
        });
    });

    describe('When valid data was provided', () => {
        it('Should assign req context property', async (done) => {
            const next: jest.Mock = jest.fn();
            await services.user.updateOne({ _id: user.id }, { isConfirmed: true });

            // @ts-ignore-start
            await resetPassword(req, {}, next);

            expect(req.context.id).toEqual(user.id);
            expect(req.context.password).toEqual(req.body.password);

            done();
        });
    });
});