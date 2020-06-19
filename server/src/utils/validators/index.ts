import HasMinLength from './lib/has-min-length';
import HasMaxLength from './lib/has-max-length';
import IsAlphanumeric from './lib/is-alphanumeric';
import IsEmail from './lib/is-email';
import IsNumeric from './lib/is-numeric';
import ValidateInput from './lib/validate-input';
import ValidateIP from './lib/validate-ip';

namespace Validator {
    export const hasMinLength = HasMinLength;
    export const hasMaxLength = HasMaxLength;
    export const isAlphanumeric = IsAlphanumeric;
    export const isEmail = IsEmail;
    export const isNumeric = IsNumeric;
    export const validateInput = ValidateInput;
    export const validateIP = ValidateIP;
}

export default Validator;