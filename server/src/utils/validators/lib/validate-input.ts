import hasMinLength from "./has-min-length";
import hasMaxLength from "./has-max-length";
import { Types } from 'mongoose';
import hasType from "./has-type";
import config from "../../../assets/config";
import matchRegex from "./match-regex";
import isCorrectField from "./is-correct-field";

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
        case 'name':
        case 'title':
            schema = [
                hasType.bind(null, value, 'string'),
                hasMinLength.bind(null, value, 1),
            ];

            break;
        case 'isPrivate':
            schema = [
                hasType.bind(null, value, 'boolean'),
            ];

            break;
        case 'content':
            schema = [
                hasType.bind(null, value, 'string'),
            ];

            break;
        case 'tags':
            schema = [
                Array.isArray.bind(null, value)
            ];

            break;
        case 'field':
            schema = [
                hasType.bind(null, value, 'string'),
                isCorrectField.bind(null, value)
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