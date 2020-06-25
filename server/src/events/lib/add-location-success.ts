import UserService from "../../services/user-service";
import bcrypt from 'bcryptjs';

interface IServices {
    userService: UserService
};

const defaultServices: IServices = {
    userService: new UserService()
};

export default async (data: { userId: string, ip: string }, services: IServices = defaultServices): Promise<void> => {
    const hashedIP: string = await bcrypt.hash(data.ip, 12);

    await services.userService.updateOne({ _id: data.userId }, { $push: { trustedIPS: hashedIP }});
};