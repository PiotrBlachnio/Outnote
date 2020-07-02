import request, { Response } from 'supertest';
import { app } from '../../server';

describe('Logout route', () => {
    it('Should return correct response', async (done) => {
        const response: Response = await request(app).post('/api/v1/logout')

        expect(response.status).toEqual(200);
        done();
    });
});