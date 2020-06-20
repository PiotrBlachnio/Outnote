import handleErrors from '../handle-errors';
import { Forbidden } from '../../assets/errors';

describe('Handle errors middleware', () => {
    let res: {
        status?: jest.Mock<any, any>,
        json?: jest.Mock<any, any>
    } = {};

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    describe('When error is instance of Generic Error', () => {
        it('Should call res status with correct parameter', async (done) => {
            // @ts-ignore-start
            await handleErrors(new Forbidden('Test error!', 2), {}, res, {})

            expect(res.status).toBeCalledWith(403);
            done();
        });

        it('Should call res json with correct parameter', (done) => {
            expect(res.json).toBeCalledWith({
                error: {
                    message: 'Test error!',
                    id: 2
                }
            });
            done();
        });
    });

    describe('When error is not instance of Generic Error', () => {
        const error: Error = new Error('Basic error');

        it('Should call res status with 500 parameter', async (done) => {
            // @ts-ignore-start
            await handleErrors(error, {}, res, {})

            expect(res.status).toHaveBeenCalledWith(500);
            done();
        });

        it('Should call res json with correct parameter', (done) => {
            expect(res.json).toBeCalledWith({
                error: {
                    message: error.message,
                    id: 0
                }
            });
            done();
        });
    });
});