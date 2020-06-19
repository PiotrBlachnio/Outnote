import User from "../models/User";
import faker from 'faker';
import { IUser } from "../types/models";
import config from "../assets/config";
import logger from "./logger";
import { connect, connection } from "mongoose";

export async function createUser(data: any = {}): Promise<IUser> {
    const user: IUser = new User({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    });

    Object.keys(data).forEach((key: any) => {
        user[key] = data[key];
    });

    await user.save();
    return user;
};

export async function clearDatabase(): Promise<void> {
    if(connection.name) {
        await User.deleteMany({});
        
        await logger.log({ type: 'info', message: 'Database cleared successfully!', place: 'Clear database function' });
    } else {
        await logger.log({ type: 'error', message: 'Clearing database only allowed in the test environment!', place: 'Clear database function' });
    };
};

export async function connectDatabase(): Promise<void> {
    try {
        await connect(config.DATABASE_CONN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            dbName: config.TEST_DATABASE_NAME
        });

        await logger.log({ type: 'info', message: 'Connected to the test database successfully!', place: 'Connect database function' });
    } catch(error) {
        await logger.log({ type: 'error', message: error.message, place: 'Connect database function' });
    };
};