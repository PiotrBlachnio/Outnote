import request, { Response } from 'supertest';
import { app } from '../../server';
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

describe('Confirm email route', () => {
    it('Should return correct response', async (done) => {
        const id: string = (await createUser()).id;
        const token: string = new TokenService().generateToken(Token.CONFIRM_EMAIL, { id });

        const response: Response = await request(app).post('/api/v1/confirm-email')
        .send({ id, token })

        expect(response.status).toEqual(200);
        done();
    });
});