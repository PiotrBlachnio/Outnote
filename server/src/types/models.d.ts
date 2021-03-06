import { Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    joinedDate: number;
    isConfirmed: boolean;
    trustedIPS: string[];
    role: number;
    avatar: string;
}

export interface INote extends Document {
    title: string;
    content: string;
    categoryId: string;
    tags: string[];
    createdAt: number;
    lastEditedAt: number;
    isPrivate: boolean;
    ownerId: string;
}

export interface ICategory extends Document {
    name: string;
    ownerId: string;
    createdAt: string;
}