import UserService from "../../services/user-service";

const defaultServices = {
    user: new UserService
};

async function updateUserSuccessHandler(id: string, updatedData: Record<string, unknown>, services: typeof defaultServices = defaultServices): Promise<void> {
    await services.user.updateOne({ id }, updatedData);
};

export default {
    updateUserSuccessHandler
};