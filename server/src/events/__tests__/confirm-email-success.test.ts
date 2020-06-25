import faker from 'faker';
import confirmEmailSuccess from '../lib/confirm-email-success';

describe('Confirm email success event', () => {
    const services = {
        userService: {
            updateOne: jest.fn() 
        }
    };

    const userId: string = faker.random.uuid();

    it('Should call update one function', async (done) => {
        //@ts-ignore-start
        await confirmEmailSuccess(userId, services);

        expect(services.userService.updateOne).toHaveBeenCalled();
        done();
    });

    it('Should pass correct parameters to the update one function', async (done) => {
        expect(services.userService.updateOne.mock.calls[0]).toEqual([{ _id: userId }, { isConfirmed: true }]);
        done();
    });
});