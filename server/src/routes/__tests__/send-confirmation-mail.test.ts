import request, { Response } from 'supertest';
import { app } from '../../server';
import { connectDatabase, clearDatabase, createUser } from '../../utils/test-utils';
import { IUser } from '../../types/models';

beforeAll(async () => {
    jest.useFakeTimers()
    await connectDatabase();
});

afterAll(async () => {
    await clearDatabase();
});

describe('Send confirmation mail route', () => {
    it('Should return correct response', async (done) => {
        const user: IUser = await createUser();
        const email: string = user.email;

        const response: Response = await request(app).post('/api/v1/send-confirmation-mail')
        .send({ email });

        expect(response.status).toEqual(200);
        done();
    });
});