import request, { Response } from 'supertest';
import { app } from '../../server';
import faker from 'faker';
import { connectDatabase, clearDatabase, createUser } from '../../utils/test-utils';
import TokenService from '../../services/token-service';
import { Token } from '../../assets/enums';

beforeAll(async () => {
    jest.useFakeTimers()
    await connectDatabase();
});

afterAll(async () => {
    await clearDatabase();
});

describe('Reset password route', () => {
    it('Should return correct response', async (done) => {
        const password: string = faker.random.alphaNumeric(10);
        const id: string = (await createUser({ isConfirmed: true })).id;
        const token: string = new TokenService().generateToken(Token.RESET_PASSWORD, { id });

        const response: Response = await request(app).post('/api/v1/reset-password')
        .send({ password, id, token })

        expect(response.status).toEqual(200);
        done();
    });
});