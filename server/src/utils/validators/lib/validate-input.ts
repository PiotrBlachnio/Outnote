import hasMinLength from "./has-min-length";
import hasMaxLength from "./has-max-length";
import isEmail from "./is-email";
import isAlphanumeric from "./is-alphanumeric";
import { Types } from 'mongoose';
import hasType from "./has-type";
import config from "../../../assets/config";

const createSchema = (schemaType: string, value: string): (() => boolean)[] => {
    let schema: (() => boolean)[] = [];

    switch(schemaType) {
        case 'email':
            schema = [
                hasType.bind(null, value, 'string'),
                hasMinLength.bind(null, value, config.validation.email.MIN_LENGTH),
                hasMaxLength.bind(null, value, config.validation.email.MAX_LENGTH),
                isEmail.bind(null, value)
            ];

            break;
        case 'username':
            schema = [
                hasType.bind(null, value, 'string'),
                hasMinLength.bind(null, value, config.validation.username.MIN_LENGTH),
                hasMaxLength.bind(null, value, config.validation.username.MAX_LENGTH),
                isAlphanumeric.bind(null, value)
            ];

            break;
        case 'password':
            schema = [
                hasType.bind(null, value, 'string'),
                hasMinLength.bind(null, value, config.validation.password.MIN_LENGTH),
                hasMaxLength.bind(null, value, config.validation.password.MAX_LENGTH)
            ];

            break;
        case 'id':
            schema = [
                hasType.bind(null, value, 'string'),
                Types.ObjectId.isValid.bind(null, value)
            ];

            break;
    };

    return schema;
};

const validateSchema = (schemaType: string, value: string) => {
    for(const validationMethod of createSchema(schemaType, value)) {
        if(!validationMethod()) return false;
    };

    return true;
};

export default (data: Record<string, string>): boolean => {
    for(const key of Object.keys(data)) {
        if(!validateSchema(key, data[key])) return false;
    };

    return true;
};