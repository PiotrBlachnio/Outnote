import User from "../models/User";
import faker from 'faker';
import { IUser, INote, ICategory } from "../types/models";
import config from "../assets/config";
import logger from "./logger";
import { connect, connection } from "mongoose";
import Note from "../models/Note";
import Category from "../models/Category";

export async function createUser(data: Record<string, unknown> = {}): Promise<IUser> {
    const user: IUser = new User({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    });

    Object.keys(data).forEach((key: string) => {
        user[key] = data[key];
    });

    await user.save();
    return user;
};

export async function createNote(data: Record<string, unknown> = {}): Promise<INote> {
    const note: INote = new Note({
        title: faker.random.word(),
        categoryId: faker.random.uuid(),
        ownerId: faker.random.uuid(),
        isPrivate: faker.random.boolean()
    });

    Object.keys(data).forEach((key: string) => {
        note[key] = data[key];
    });

    await note.save();
    return note;
};

export async function createCategory(data: Record<string, unknown> = {}): Promise<ICategory> {
    const category: ICategory = new Category({
        name: faker.random.word(),
        userId: faker.random.uuid()
    });

    Object.keys(data).forEach((key: string) => {
        category[key] = data[key];
    });

    await category.save();
    return category;
};

export async function clearDatabase(): Promise<void> {
    if(connection.name) {
        await User.deleteMany({});
        await Note.deleteMany({});
        await Category.deleteMany({});
        
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
