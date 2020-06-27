import faker from 'faker';
import resetPasswordSuccess from '../lib/reset-password-success';

describe('Reset password success event', () => {
    const services = {
        userService: {
            updateOne: jest.fn() 
        }
    };
    
    const userId: string = faker.random.uuid();

    it('Should call update one function', async (done) => {
        //@ts-ignore-start
        await resetPasswordSuccess({ userId: userId, password: faker.internet.password() }, services);

        expect(services.userService.updateOne).toHaveBeenCalled();
        done();
    });

    it('Should pass correct parameters to the update one function', async (done) => {
        expect(services.userService.updateOne.mock.calls[0][0]).toEqual({ _id: userId });
        done();
    });
});