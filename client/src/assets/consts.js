/* eslint-disable */

export const validator = {
  username: {
    minLength: 4,
    maxLength: 20,
    regex: /^[a-zA-Z0-9]+$/
  },
  email: {
    minLength: 5,
    maxLength: 40,
    regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  password: {
    minLength: 6,
    maxLength: 32,
    regex: null
  }
};

export const errors = {
  0: {
    message: 'Internal server error'
  },

  // ? Auth errors
  100: { message: 'Invalid email or password' },
  101: { message: 'Invalid password' },
  102: { message: 'Token has already expired or is invalid' },
  103: { message: 'Token has not expired yet or is invalid' },

  // ? Forbidden action errors
  200: { message: 'Provided data did not pass the validation proccess' },
  201: { message: 'You must log out before performing this action' },
  202: {
    message: 'You do not have required permissions to perform this action'
  },

  // ? Identity errors
  300: { message: 'Detected action performed by an unknown identity' },
  301: { message: 'Detected login attempt from a different location' },
  302: { message: 'Location has already been added to trusted' },

  // ? User errors
  400: { message: 'User does not exist' },
  401: { message: 'Provided user does not match the decoded user' },

  // ? Email & userame errors},
  500: { message: 'Email has not been confirmed yet' },
  501: { message: 'Email has already been confirmed' },
  502: { message: 'Email already exists' },
  503: { message: 'Username already exists' },

  // ? Notes & categories errors},
  600: { message: 'Note does not exist' },
  601: { message: 'Category does not exist' },
  602: { message: 'You do not have access to this note' }
};
