import hasMinLength from "./has-min-length";
import hasMaxLength from "./has-max-length";
import isEmail from "./is-email";
import isNumeric from "./is-numeric";
import isAlphanumeric from "./is-alphanumeric";
import config from "../../../assets/config";
import { Types } from 'mongoose';

export default (data: Record<string, unknown>): boolean => {
    let isValid: boolean = true;

    for(const key of Object.keys(data)) {
        if(!isValid) return false;

        switch(key) {
            case 'email':
                const email: unknown = data[key];

                if(typeof email !== 'string') {
                    isValid = false;
                    break;
                };

                if(!hasMinLength(email, 5)) {
                    isValid = false;
                    break;
                };

                if(!hasMaxLength(email, 40)) {
                    isValid = false;
                    break;
                };

                if(!isEmail(email)) {
                    isValid = false;
                    break;
                };

                break;
            case 'password':
                const password: unknown = data[key];

                if(typeof password !== 'string') {
                    isValid = false;
                    break;
                };

                if(!hasMinLength(password, 6)) {
                    isValid = false;
                    break;
                };

                if(!hasMaxLength(password, 32)) {
                    isValid = false;
                    break;
                };

                break;
            case 'confirmationCode':
                const confirmationCode: unknown = data[key];

                if(typeof confirmationCode !== 'string') {
                    isValid = false;
                    break;
                };

                if(!isNumeric(confirmationCode)) {
                    isValid = false;
                    break;
                };

                break;
            case 'username':
                const username: unknown = data[key];

                if(typeof username !== 'string') {
                    isValid = false;
                    break;
                };

                if(!hasMinLength(username, 4)) {
                    isValid = false;
                    break;
                };

                if(!hasMaxLength(username, 20)) {
                    isValid = false;
                    break;
                };

                if(!isAlphanumeric(username) && config.NODE_ENV !== 'test') {
                    isValid = false;
                    break;
                };
                break;
            case 'id':
                const id: unknown = data[key];

                if(typeof id !== 'string') {
                    isValid = false;
                    break;
                };
                
                if(!Types.ObjectId.isValid(id)) {
                    isValid = false;
                    break;
                };
                
                if(!id) {
                    isValid = false;
                    break;
                };
                
                break;
            case 'invitationStatus':
                const status: unknown = data[key];

                if(status !== 1 && status !== 2) {
                    isValid = false;
                    break;
                };

                break;
        };
    };

    return isValid;
};