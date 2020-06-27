import { clearDatabase, connectDatabase, createUser } from "../../utils/test-utils";
import UserService from "../user-service";
import { IUser } from "../../types/models";
import faker from 'faker';

beforeAll(async () => {
    await connectDatabase();
});

afterAll(async () => {
    await clearDatabase();
});

describe('User service', () => {
    const userService: UserService = new UserService();
    let user: IUser;

    describe('Find one function', () => {
        describe('When object does not exist', () => {
            it('Should return null', async (done) => {
                const foundUser: IUser | null = await userService.findOne({ _id: '1' });

                expect(foundUser).toBeNull();
                done();
            });
        });

        describe('When object exists', () => {
            it('Should return object', async (done) => {
                user = await createUser();
                const foundUser: IUser | null = await userService.findOne({ _id: user._id });

                expect(foundUser?.id).toEqual(user.id);
                done();
            });
        });
    });

    describe('Find by id function', () => {
        describe('When object does not exist', () => {
            it('Should return null', async (done) => {
                const foundUser: IUser | null = await userService.findById('1vsffgs41541');

                expect(foundUser).toBeNull();
                done();
            });
        });

        describe('When object exists', () => {
            it('Should return object', async (done) => {
                const foundUser: IUser | null = await userService.findById(user.id);

                expect(foundUser?.id).toEqual(user.id);
                done();
            });
        });
    });

    describe('Update one function', () => {
        it('Should successfully update object in the database', async (done) => {
            await userService.updateOne({  _id: user._id }, { username: 'Jeff' });
            const updatedUser: IUser | null = await userService.findById(user._id);

            expect(updatedUser?.username).toEqual('Jeff');
            done();
        });
    });

    describe('Create function', () => {
        it('Should successfully create object in the database', async (done) => {
            const createdUser: IUser = await userService.create({ username: faker.internet.userName(), email: faker.internet.email(), password: faker.internet.password(), trustedIPS: [faker.internet.ip()] });
            const foundUser: IUser | null = await userService.findById(createdUser.id);

            expect(createdUser.username).toEqual(foundUser?.username);
            done();
        });
    });

    describe('Delete one function', () => {
        it('Should successfully delete object from the database', async (done) => {
            const createdUser: IUser = await userService.create({ username: faker.internet.userName(), email: faker.internet.email(), password: faker.internet.password(), trustedIPS: [faker.internet.ip()] });
            await userService.deleteOne({ _id: createdUser.id });

            const foundUser: IUser | null = await userService.findById(createdUser.id);

            expect(foundUser).toBeNull();
            done();
        });
    });
});