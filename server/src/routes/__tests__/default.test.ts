import request, { Response } from 'supertest';
import { app } from '../../server';
import faker from 'faker';

describe('Confirm email route', () => {
    it('Should return correct response', async (done) => {
        const response: Response = await request(app).get('/' + faker.random.uuid());

        expect(response.status).toEqual(404);
        expect(response.text).toEqual('Route not found! Check your url and try again!');

        done();
    });
});