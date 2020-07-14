import UserService from "../../services/user-service";

const defaultServices = {
    user: new UserService
};

export default async (id: string, updatedData: Record<string, unknown>, services: typeof defaultServices = defaultServices): Promise<void> => {
    await services.user.updateOne({ id }, updatedData);
};