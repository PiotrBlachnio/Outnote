import request, { Response } from 'supertest';
import { app } from '../../server';
import { connectDatabase, clearDatabase, createUser } from '../../utils/test-utils';
import { IUser } from '../../types/models';
import bcrypt from 'bcryptjs';
import faker from 'faker';

beforeAll(async () => {
    jest.useFakeTimers()
    await connectDatabase();
});

afterAll(async () => {
    await clearDatabase();
});

describe('Login route', () => {
    it('Should return correct response', async (done) => {
        const password: string = faker.random.alphaNumeric(10);
        const user: IUser = await createUser({ isConfirmed: true, trustedIPS: [await bcrypt.hash('::ffff:127.0.0.1', 12)], password: await bcrypt.hash(password, 12) });

        const response: Response = await request(app).post('/api/v1/login')
        .send({
            email: user.email,
            password: password
        });

        expect(response.status).toEqual(200);
        expect(response.body.id).toEqual(user.id);
        expect(response.body.token).toBeDefined();

        done();
    });
});