import { IUser } from "../types/models";
import UserService from "../services/user-service";

export default async (): Promise<void> => {
    const DAYS3: number = 259200000;
    const users: IUser[] = await new UserService();
};