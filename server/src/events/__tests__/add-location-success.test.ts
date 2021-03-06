import faker from 'faker';
import account from "../lib/account-handlers";

describe('Add location success event', () => {
    const services = {
        user: {
            updateOne: jest.fn() 
        }
    };
    
    const userId: string = faker.random.uuid();
    const ip: string = faker.internet.ip();

    it('Should call update one function', async (done) => {
        //@ts-ignore-start
        await account.addLocationSuccessHandler({ userId, ip }, services);

        expect(services.user.updateOne).toHaveBeenCalled();
        done();
    });

    it('Should pass correct parameters to the update one function', async (done) => {
        expect(services.user.updateOne.mock.calls[0][0]).toEqual({ _id: userId });
        done();
    });
});