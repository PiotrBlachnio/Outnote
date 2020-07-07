import hasMinLength from "./has-min-length";
import hasMaxLength from "./has-max-length";
import isEmail from "./is-email";
import isAlphanumeric from "./is-alphanumeric";
import { Types } from 'mongoose';
import hasType from "./has-type";

const validateSchema = (schema: (() => boolean)[]) => {
    let isValid: boolean = true;

    for(const validationMethod of schema) {
        if(!validationMethod()) {
            isValid = false;
            break;
        }
    };

    return isValid;
};

export default (data: Record<string, unknown>): boolean => {
    let isValid: boolean = true;
    let validationSchema: (() => boolean)[] = [];

    for(const key of Object.keys(data)) {
        if(!isValid) return false;

        switch(key) {
            case 'email':
                const email: unknown = data[key];

                validationSchema = [
                    hasType.bind(null, email, 'string'),
                    hasMinLength.bind(null, email as string, 5),
                    hasMaxLength.bind(null, email as string, 40),
                    isEmail.bind(null, email as string)
                ];

                isValid = validateSchema(validationSchema);

                break;
            case 'password':
                const password: unknown = data[key];

                validationSchema = [
                    hasType.bind(null, password, 'string'),
                    hasMinLength.bind(null, password as string, 6),
                    hasMaxLength.bind(null, password as string, 32)
                ];

                isValid = validateSchema(validationSchema);

                break;
            case 'username':
                const username: unknown = data[key];

                validationSchema = [
                    hasType.bind(null, username, 'string'),
                    hasMinLength.bind(null, username as string, 4),
                    hasMaxLength.bind(null, username as string, 20),
                    isAlphanumeric.bind(null, username as string)
                ];

                isValid = validateSchema(validationSchema);

                break;
            case 'id':
                const id: unknown = data[key];

                validationSchema = [
                    hasType.bind(null, id, 'string'),
                    Types.ObjectId.isValid.bind(null, id as string)
                ];

                isValid = validateSchema(validationSchema);

                break;
        };
    };

    return isValid;
};