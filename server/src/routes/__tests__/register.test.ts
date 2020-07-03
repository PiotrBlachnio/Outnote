import request, { Response } from 'supertest';
import { app } from '../../server';
import { connectDatabase, clearDatabase } from '../../utils/test-utils';
import faker from 'faker';

beforeAll(async () => {
    await connectDatabase();
});

afterAll(async () => {
    await clearDatabase();
});

describe('Refresh token route', () => {
    it('Should return correct response', async (done) => {
        const response: Response = await request(app).post('/api/v1/register')
        .send({
            username: faker.random.alphaNumeric(10),
            email: faker.internet.email(),
            password: faker.random.alphaNumeric(10)
        });

        expect(response.status).toEqual(201);
        done();
    });
});