import UserService from "../../services/user-service";

interface IServices {
    userService: UserService
};

const defaultServices: IServices = {
    userService: new UserService()
};

export default async (userId: string, services: IServices = defaultServices): Promise<void> => {
    await services.userService.updateOne({ _id: userId }, { isConfirmed: true });
};