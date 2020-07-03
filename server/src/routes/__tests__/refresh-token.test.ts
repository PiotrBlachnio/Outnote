import request, { Response } from 'supertest';
import { app } from '../../server';
import { connectDatabase, clearDatabase, createUser } from '../../utils/test-utils';
import { IUser } from '../../types/models';
import jwt from 'jsonwebtoken';
import config from '../../assets/config';

beforeAll(async () => {
    jest.useFakeTimers()
    await connectDatabase();
});

afterAll(async () => {
    await clearDatabase();
});

describe('Refresh token route', () => {
    it('Should return correct response', async (done) => {
        const user: IUser = await createUser({ isConfirmed: true });
        const accessToken: string = jwt.sign({ id: user.id }, config.ACCESS_TOKEN_SECRET, { expiresIn: '0.0001s' });
        const refreshToken: string = jwt.sign({ id: user.id, ip: '::ffff:127.0.0.1' }, config.REFRESH_TOKEN_SECRET);

        const response: Response = await request(app).post('/api/v1/refresh-token')
        .send({
            accessToken
        })
        .set('Cookie', [
            `jid=${refreshToken}`
        ]);

        expect(response.status).toEqual(200);
        expect(response.body.token).toBeDefined();

        done();
    });
});