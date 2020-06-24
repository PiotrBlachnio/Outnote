import { clearDatabase, connectDatabase, createUser } from '../../utils/test-utils';
import UserService from '../../services/user-service';
import TokenService from '../../services/token-service';
import { IncorrectInputError, AlreadyLoggedInError, UsernameAlreadyExistError, EmailAlreadyExistError } from '../../assets/errors';
import { Token } from '../../assets/enums';
import { IUser } from '../../types/models';
import register from '../validators/register';
import faker from 'faker';

beforeAll(async () => {
    await connectDatabase();
});

afterAll(async () => {
    await clearDatabase();
});

describe('Register validator', () => {
    const services = {
        token: new TokenService(),
        user: new UserService()
    };

    const req = {
        context: {
            username: '',
            email: '',
            password: ''
        },
        body: {
            password: 'Jeff12345',
            username: '',
            email: ''
        },
        cookies: {
            jid: ''
        },
        services: services
    };

    let user: IUser;
    
    describe('When user is already logged in', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            req.cookies.jid =  services.token.generateToken(Token.REFRESH, { id: faker.random.uuid() });

            // @ts-ignore-start
            await register(req, {}, next);

            expect(next).toHaveBeenCalledWith(new AlreadyLoggedInError());
            done();
        });
    });

    describe('When input is invalid', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            req.cookies.jid = '';

            // @ts-ignore-start
            await register(req, {}, next);

            expect(next).toHaveBeenCalledWith(new IncorrectInputError());
            done();
        });
    });
    
    describe('When username already exists', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            user = await createUser({ email: 'Jeff@gmail.com', username: 'Jeff123' });

            req.body.username = user.username;
            req.body.email = user.email;
            
            // @ts-ignore-start
            await register(req, {}, next);

            expect(next).toHaveBeenCalledWith(new UsernameAlreadyExistError());
            done();
        });
    });

    describe('When email already exists', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            req.body.username = 'Jeff1234';

            // @ts-ignore-start
            await register(req, {}, next);

            expect(next).toHaveBeenCalledWith(new EmailAlreadyExistError());
            done();
        });
    });

    describe('When valid data was provided', () => {
        it('Should assign req context property', async (done) => {
            const next: jest.Mock = jest.fn();
            req.body.email = 'Jeff2@gmail.com';

            // @ts-ignore-start
            await register(req, {}, next);

            expect(req.context.username).toEqual('Jeff1234');
            expect(req.context.email).toEqual('Jeff2@gmail.com');
            expect(req.context.password).toEqual(req.body.password);

            done();
        });
    });
});