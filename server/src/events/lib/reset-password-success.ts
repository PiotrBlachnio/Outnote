import bcrypt from 'bcryptjs';
import UserService from '../../services/user-service';

interface IServices {
    userService: UserService
};

const defaultServices: IServices = {
    userService: new UserService()
};

export default async (data: { userId: string, password: string }, services: IServices = defaultServices): Promise<void> => {
    const hashedPassword: string = await bcrypt.hash(data.password, 12);

    await services.userService.updateOne({ _id: data.userId }, { password: hashedPassword });
};