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

export default (data: Record<string, string>): boolean => {
    let isValid: boolean = true;
    let validationSchema: (() => boolean)[] = [];

    for(const key of Object.keys(data)) {
        if(!isValid) return false;

        switch(key) {
            case 'email':
                const email: string = data[key];

                validationSchema = [
                    hasType.bind(null, email, 'string'),
                    hasMinLength.bind(null, email, 5),
                    hasMaxLength.bind(null, email, 40),
                    isEmail.bind(null, email)
                ];

                isValid = validateSchema(validationSchema);

                break;
            case 'password':
                const password: string = data[key];

                validationSchema = [
                    hasType.bind(null, password, 'string'),
                    hasMinLength.bind(null, password, 6),
                    hasMaxLength.bind(null, password, 32)
                ];

                isValid = validateSchema(validationSchema);

                break;
            case 'username':
                const username: string = data[key];

                validationSchema = [
                    hasType.bind(null, username, 'string'),
                    hasMinLength.bind(null, username, 4),
                    hasMaxLength.bind(null, username, 20),
                    isAlphanumeric.bind(null, username)
                ];

                isValid = validateSchema(validationSchema);

                break;
            case 'id':
                const id: string = data[key];

                validationSchema = [
                    hasType.bind(null, id, 'string'),
                    Types.ObjectId.isValid.bind(null, id)
                ];

                isValid = validateSchema(validationSchema);

                break;
        };
    };

    return isValid;
};