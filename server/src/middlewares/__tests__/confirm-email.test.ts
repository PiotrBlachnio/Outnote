import { clearDatabase, connectDatabase, createUser } from '../../utils/test-utils';
import UserService from '../../services/user-service';
import TokenService from '../../services/token-service';
import { IncorrectInputError, ExpiredOrInvalidTokenError, InvalidUserError, UserNotFoundError, EmailAlreadyConfirmedError } from '../../assets/errors';
import { Token } from '../../assets/enums';
import { IUser } from '../../types/models';
import account from '../validation/lib/account-validators';

beforeAll(async () => {
    await connectDatabase();
});

afterAll(async () => {
    await clearDatabase();
});

describe('Confirm email validator', () => {
    const services = {
        token: new TokenService(),
        user: new UserService()
    };

    const req = {
        context: {
            id: ''
        },
        body: {
            id: '',
            token: ''
        },
        services: services
    };

    let tempId: string;
    let user: IUser;
    
    describe('When input is invalid', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            tempId = (await createUser()).id;
            
            // @ts-ignore-start
            await account.confirmEmail(req, {}, next);

            expect(next).toHaveBeenCalledWith(new IncorrectInputError);
            done();
        });
    });
    
    describe('When token is invalid', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            req.body.id = (await createUser()).id;

            // @ts-ignore-start
            await account.confirmEmail(req, {}, next);

            expect(next).toHaveBeenCalledWith(new ExpiredOrInvalidTokenError);
            done();
        });
    });

    describe('When user is invalid', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            req.body.token = services.token.generateToken(Token.CONFIRM_EMAIL, { id: tempId });

            // @ts-ignore-start
            await account.confirmEmail(req, {}, next);

            expect(next).toHaveBeenCalledWith(new InvalidUserError);
            done();
        });
    });

    describe('When user does not exist', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            await services.user.deleteOne({ _id: tempId });

            req.body.id = tempId;

            // @ts-ignore-start
            await account.confirmEmail(req, {}, next);

            expect(next).toHaveBeenCalledWith(new UserNotFoundError);
            done();
        });
    });

    describe('When user is already confirmed', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            user = await createUser({ isConfirmed: true });

            req.body.id = user.id;
            req.body.token = services.token.generateToken(Token.CONFIRM_EMAIL, { id: user.id });

            // @ts-ignore-start
            await account.confirmEmail(req, {}, next);

            expect(next).toHaveBeenCalledWith(new EmailAlreadyConfirmedError);
            done();
        });
    });

    describe('When valid data was provided', () => {
        it('Should assign req context property', async (done) => {
            const next: jest.Mock = jest.fn();
            await services.user.updateOne({ _id: user.id }, { isConfirmed: false });

            // @ts-ignore-start
            await account.confirmEmail(req, {}, next);

            expect(req.context.id).toEqual(user.id);
            done();
        });
    });
});