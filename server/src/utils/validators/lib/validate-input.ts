import hasMinLength from "./has-min-length";
import hasMaxLength from "./has-max-length";
import isEmail from "./is-email";
import isAlphanumeric from "./is-alphanumeric";
import { Types } from 'mongoose';
import hasType from "./has-type";

const createSchema = (schemaType: string, value: string): (() => boolean)[] => {
    let schema: (() => boolean)[] = [];

    switch(schemaType) {
        case 'email':
            schema = [
                hasType.bind(null, value, 'string'),
                hasMinLength.bind(null, value, 5),
                hasMaxLength.bind(null, value, 40),
                isEmail.bind(null, value)
            ];

            break;
        case 'username':
            schema = [
                hasType.bind(null, value, 'string'),
                hasMinLength.bind(null, value, 4),
                hasMaxLength.bind(null, value, 20),
                isAlphanumeric.bind(null, value)
            ];

            break;
        case 'password':
            schema = [
                hasType.bind(null, value, 'string'),
                hasMinLength.bind(null, value, 6),
                hasMaxLength.bind(null, value, 32)
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