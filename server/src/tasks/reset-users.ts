import { IUser } from "../types/models";
import UserService from "../services/user-service";
import logger from "../utils/logger";

export default async (): Promise<void> => {
    const userService: UserService = new UserService();
    let deletedUsers: number = 0;

    const DAYS3: number = 259200000;
    const users: IUser[] = await userService.find({ isConfirmed: false });

    for(const user of users) {
        if(Date.now() - user.joinedDate > DAYS3) {
            deletedUsers++;
            await userService.deleteOne({ id: user.id });
        };
    };

    await logger.log({ type: 'info', message: `${deletedUsers} users have been deleted successfully!`, place: 'Reset users task' });
};