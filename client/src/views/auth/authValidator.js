import { validator } from '@/assets/consts';

export default function(fields) {
  const formFields = fields.map(field => {
    return {
      name: field[0],
      value: field[1]
    };
  });

  formFields.forEach(field => {
    validateMinLength(field);
    validateMaxLength(field);
    validateValueRegex(field);
  });
}

function validateMinLength(field) {
  if (field.value.length < validator[field.name].minLength) {
    throw new Error(`${capitalize(field.name)} is too short!`);
  }
}

function validateMaxLength(field) {
  if (field.value.length > validator[field.name].maxLength) {
    throw new Error(`${capitalize(field.name)} is too long!`);
  }
}

function validateValueRegex(field) {
  const regex = validator[field.name].regex;

  if (regex && !regex.test(field.value)) {
    throw new Error(`${capitalize(field.name)} is incorrect!`);
  }
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.substr(1);
}
