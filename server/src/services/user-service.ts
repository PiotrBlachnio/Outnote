import User from '../models/User';
import mongoose from 'mongoose';
import { IUser } from '../types/models';

class UserService {
    public async findOne(data: object): Promise<IUser | null> {
        try {
            const user: IUser | null = await User.findOne(data);
            return user;
        } catch(error) {
            if(error.name === 'CastError') return null;

            throw error;
        };
    };

    public async findById(id: string): Promise<IUser | null> {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        };

        const user: IUser | null = await User.findById(id);
        return user;
    };

    public async updateOne(searchData: object, updateData: object): Promise<void> {
        await User.updateOne(searchData, updateData);
    };

    public async create(data: object): Promise<IUser> {
        const user: IUser = new User(data);
        await user.save();

        return user;
    };

    public async deleteOne(searchData: object): Promise<void> {
        await User.deleteOne(searchData);
    };
};

export default UserService;