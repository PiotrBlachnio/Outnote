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
  100: {
    message: 'Provided data did not pass the validation proccess'
  },
  101: {
    message: 'Token has already expired or is invalid'
  },
  102: {
    message: 'Provided user does not match the decoded user'
  },
  103: {
    message: 'You must log out before performing this action'
  },
  104: {
    message: 'Detected action performed by an unknown identity'
  },
  105: {
    message: 'Token has not expired yet or is invalid'
  },
  106: {
    message: 'Location has already been added to trusted'
  },
  200: {
    message: 'Invalid email or password'
  },
  201: {
    message: 'Detected login attempt from a different location'
  },
  202: {
    message: 'Invalid password'
  },
  203: {
    message: 'You do not have required permissions to perform this action'
  },
  300: {
    message: 'User does not exist'
  },
  301: {
    message: 'Username already exists'
  },
  302: {
    message: 'Email already exists'
  },
  303: {
    message: 'Email has already been confirmed'
  },
  304: {
    message: 'Email has not been confirmed yet'
  }
};
