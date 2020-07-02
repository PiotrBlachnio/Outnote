import request, { Response } from 'supertest';
import { app } from '../../server';
import faker from 'faker';
import bcrypt from 'bcryptjs';
import { connectDatabase, clearDatabase, createUser } from '../../utils/test-utils';
import TokenService from '../../services/token-service';
import { Token } from '../../assets/enums';

beforeAll(async () => {
    await connectDatabase();
});

afterAll(async () => {
    await clearDatabase();
});

describe('Add location route', () => {
    it('Should return correct response', async (done) => {
        const password: string = faker.random.alphaNumeric(10);
        const id: string = (await createUser({ password: await bcrypt.hash(password, 12), isConfirmed: true })).id;
        const token: string = new TokenService().generateToken(Token.CONFIRM_IDENTITY, { id });

        const response: Response = await request(app).post('/api/v1/add-location')
        .send({ password, id, token })

        expect(response.status).toEqual(200);
        done();
    });
});