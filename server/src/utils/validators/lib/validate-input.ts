import hasMinLength from "./has-min-length";
import hasMaxLength from "./has-max-length";
import { Types } from 'mongoose';
import hasType from "./has-type";
import config from "../../../assets/config";
import matchRegex from "./match-regex";

const createSchema = (schemaType: string, value: string): (() => boolean)[] => {
    let schema: (() => boolean)[] = [];

    switch(schemaType) {
        case 'email':
            schema = [
                hasType.bind(null, value, 'string'),
                hasMinLength.bind(null, value, config.validation.email.MIN_LENGTH),
                hasMaxLength.bind(null, value, config.validation.email.MAX_LENGTH),
                matchRegex.bind(null, value, config.validation.email.REGEX)
            ];

            break;
        case 'username':
            schema = [
                hasType.bind(null, value, 'string'),
                hasMinLength.bind(null, value, config.validation.username.MIN_LENGTH),
                hasMaxLength.bind(null, value, config.validation.username.MAX_LENGTH),
                matchRegex.bind(null, value, config.validation.username.REGEX)
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
        case 'title':
            schema = [
                hasType.bind(null, value, 'string'),
                hasMinLength.bind(null, value, config.validation.title.MIN_LENGTH),
            ];

            break;
        case 'isPrivate':
            schema = [
                hasType.bind(null, value, 'boolean'),
            ];
        default:
            throw new Error('Validation field is invalid!');
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