import UserService from "../../services/user-service";
import bcrypt from 'bcryptjs';

const defaultServices = {
    user: new UserService()
};

export default async (data: { userId: string, ip: string }, services: typeof defaultServices = defaultServices): Promise<void> => {
    const hashedIP: string = await bcrypt.hash(data.ip, 12);

    await services.user.updateOne({ _id: data.userId }, { $push: { trustedIPS: hashedIP }});
};