import { Schema, model, Model } from 'mongoose';
import { Roles } from '../assets/enums';
import { IUser } from '../types/models';

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    joinedAt: {
        type: Number,
        default: Date.now()
    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
    trustedIPS: {
        type: [String],
        required: true
    },
    role: {
        type: Number,
        default: Roles.USER
    },
    avatar: {
        type: String,
        default: 'default.jpeg'
    }
});

const User: Model<IUser> = model('User', UserSchema);

export default User;