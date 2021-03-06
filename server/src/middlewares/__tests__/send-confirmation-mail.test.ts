import { clearDatabase, connectDatabase, createUser } from '../../utils/test-utils';
import UserService from '../../services/user-service';
import TokenService from '../../services/token-service';
import { IncorrectInputError, UserNotFoundError, AlreadyLoggedInError, EmailAlreadyConfirmedError } from '../../assets/errors';
import { Token } from '../../assets/enums';
import { IUser } from '../../types/models';
import account from '../validation/lib/account-validators';
import faker from 'faker';

beforeAll(async () => {
    await connectDatabase();
});

afterAll(async () => {
    await clearDatabase();
});

describe('Send confirmation mail validator', () => {
    const services = {
        token: new TokenService(),
        user: new UserService()
    };

    const req = {
        context: {
            id: '',
            email: ''
        },
        body: {
            email: ''
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
            await account.sendConfirmationMail(req, {}, next);

            expect(next).toHaveBeenCalledWith(new AlreadyLoggedInError);
            done();
        });
    });
    
    describe('When input is invalid', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            req.cookies.jid = '';

            // @ts-ignore-start
            await account.sendConfirmationMail(req, {}, next);

            expect(next).toHaveBeenCalledWith(new IncorrectInputError);
            done();
        });
    });

    describe('When user does not exist', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();

            req.body.email = faker.internet.email();

            // @ts-ignore-start
            await account.sendConfirmationMail(req, {}, next);

            expect(next).toHaveBeenCalledWith(new UserNotFoundError);
            done();
        });
    });

    describe('When user is already confirmed', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();

            user = await createUser({ isConfirmed: true });
            req.body.email = user.email;

            // @ts-ignore-start
            await account.sendConfirmationMail(req, {}, next);

            expect(next).toHaveBeenCalledWith(new EmailAlreadyConfirmedError);
            done();
        });
    });

    describe('When valid data was provided', () => {
        it('Should assign req context property', async (done) => {
            const next: jest.Mock = jest.fn();
            await services.user.updateOne({ _id: user.id }, { isConfirmed: false });

            // @ts-ignore-start
            await account.sendConfirmationMail(req, {}, next);

            expect(req.context.id).toEqual(user.id);
            expect(req.context.email).toEqual(req.body.email);

            done();
        });
    });
});