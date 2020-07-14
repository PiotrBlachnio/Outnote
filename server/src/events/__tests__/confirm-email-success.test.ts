import faker from 'faker';
import account from '../lib/account-handlers';

describe('Confirm email success event', () => {
    const services = {
        userService: {
            updateOne: jest.fn() 
        }
    };

    const userId: string = faker.random.uuid();

    it('Should call update one function', async (done) => {
        //@ts-ignore-start
        await account.confirmEmailSuccessHandler(userId, services);

        expect(services.userService.updateOne).toHaveBeenCalled();
        done();
    });

    it('Should pass correct parameters to the update one function', async (done) => {
        expect(services.userService.updateOne.mock.calls[0]).toEqual([{ _id: userId }, { isConfirmed: true }]);
        done();
    });
});