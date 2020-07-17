import faker from 'faker';
import account from '../lib/account-handlers';

describe('Reset password success event', () => {
    const services = {
        user: {
            updateOne: jest.fn() 
        }
    };
    
    const userId: string = faker.random.uuid();

    it('Should call update one function', async (done) => {
        //@ts-ignore-start
        await account.resetPasswordSuccessHandler({ userId: userId, password: faker.internet.password() }, services);

        expect(services.user.updateOne).toHaveBeenCalled();
        done();
    });

    it('Should pass correct parameters to the update one function', async (done) => {
        expect(services.user.updateOne.mock.calls[0][0]).toEqual({ _id: userId });
        done();
    });
});