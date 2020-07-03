import { clearDatabase, connectDatabase, createUser } from "../../utils/test-utils";
import TokenService from "../../services/token-service";
import UserService from "../../services/user-service";
import addLocation from '../validators/add-location';
import { IncorrectInputError, ExpiredOrInvalidTokenError, InvalidUserError, UserNotFoundError, InvalidPasswordError, EmailNotConfirmedError, LocationAlreadyAddedError } from "../../assets/errors";
import faker from 'faker';
import { Token } from "../../assets/enums";
import { IUser } from "../../types/models";
import bcrypt from 'bcryptjs';

beforeAll(async () => {
    await connectDatabase();
});

afterAll(async () => {
    await clearDatabase();
});

describe('Add location validator', () => {
    const services = {
        token: new TokenService(),
        user: new UserService()
    };

    const req = {
        context: {
            id: ''
        },
        body: {
            token: '',
            id: '',
            password: ''
        },
        services: services
    };

    const password: string = faker.random.alphaNumeric(10);
    const ip: string = faker.internet.ip();

    let user: IUser;

    describe('When input is not valid', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();

            //@ts-ignore-start
            await addLocation(req, {}, next);

            expect(next).toHaveBeenCalledWith(new IncorrectInputError);
            done();
        });
    });

    describe('When token is invalid', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();

            req.body = {
                id: '5ef4429ccc4ff01ad85c009a',
                password: faker.random.alphaNumeric(10),
                token: ''
            };

            //@ts-ignore-start
            await addLocation(req, {}, next);

            expect(next).toHaveBeenCalledWith(new ExpiredOrInvalidTokenError);
            done();
        });
    });

    describe('When user is invalid', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            req.body.token = services.token.generateToken(Token.CONFIRM_IDENTITY, { id: faker.random.alphaNumeric(10) });

            //@ts-ignore-start
            await addLocation(req, {}, next);

            expect(next).toHaveBeenCalledWith(new InvalidUserError);
            done();
        });
    });

    describe('When user does not exist', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            req.body.token = services.token.generateToken(Token.CONFIRM_IDENTITY, { id: req.body.id })

            //@ts-ignore-start
            await addLocation(req, {}, next);

            expect(next).toHaveBeenCalledWith(new UserNotFoundError);
            done();
        });
    });

    describe('When password is invalid', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            user = await createUser({ password: await bcrypt.hash(password, 12) });

            req.body.id = user.id;
            req.body.token = services.token.generateToken(Token.CONFIRM_IDENTITY, { id: user.id, ip: ip })

            //@ts-ignore-start
            await addLocation(req, {}, next);

            expect(next).toHaveBeenCalledWith(new InvalidPasswordError);
            done();
        });
    });

    describe('When email is not confirmed', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();
            req.body.password = password;

            //@ts-ignore-start
            await addLocation(req, {}, next);

            expect(next).toHaveBeenCalledWith(new EmailNotConfirmedError);
            done();
        });
    });

    describe('When location is already added', () => {
        it('Should throw an error', async (done) => {
            const next: jest.Mock = jest.fn();

            const hashedIP: string = await bcrypt.hash(ip, 12);
            await services.user.updateOne({ _id: user.id }, { isConfirmed: true, trustedIPS: [hashedIP] });

            //@ts-ignore-start
            await addLocation(req, {}, next);

            expect(next).toHaveBeenCalledWith(new LocationAlreadyAddedError);
            done();
        });
    });

    describe('When valid data was provided', () => {
        it('Should assign correct ', async (done) => {
            const next: jest.Mock = jest.fn();
            await services.user.updateOne({ _id: user.id }, { trustedIPS: [] });

            //@ts-ignore-start
            await addLocation(req, {}, next);

            expect(req.context.id).toEqual(user.id);
            done();
        });
    });
});
