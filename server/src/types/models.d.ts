import { Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    joinedDate: number;
    isConfirmed: boolean;
    trustedIPS: string[];
    role: number;
}