import UserService from "../../services/user-service";

const defaultServices = {
    user: new UserService()
};

export default async (userId: string, services: typeof defaultServices = defaultServices): Promise<void> => {
    await services.user.updateOne({ _id: userId }, { isConfirmed: true });
};