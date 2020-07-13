import bcrypt from 'bcryptjs';
import UserService from '../../services/user-service';

const defaultServices = {
    user: new UserService()
};

export default async (data: { userId: string, password: string }, services: typeof defaultServices = defaultServices): Promise<void> => {
    const hashedPassword: string = await bcrypt.hash(data.password, 12);

    await services.user.updateOne({ _id: data.userId }, { password: hashedPassword });
};