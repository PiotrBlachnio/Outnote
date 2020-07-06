/**
 * 0 - Internal server error
 * 
 * 100 - Provided data did not pass the validation proccess
 * 101 - Token has already expired or is invalid
 * 102 - Provided user does not match the decoded user
 * 103 - You must log out before performing this action
 * 104 - Detected action performed by an unknown identity
 * 105 - Token has not expired yet or is invalid
 * 106 - Location has already been added to trusted
 * 
 * 200 - Invalid email or password
 * 201 - Detected login attempt from a different location
 * 202 - Invalid password
 * 203 - You do not have required permissions to perform this action
 * 
 * 300 - User does not exist
 * 301 - Username already exists
 * 302 - Email already exists
 * 303 - Email has already been confirmed
 * 304 - Email has not been confirmed yet
 * 
 * 400 - Note does not exist
 */
export class GenericError extends Error {
    public id: number = 0;
    public statusCode: number = 500;
    public message: string = 'Internal server error';
    public place: string = '';

    constructor() {
        super();
    };
};

export class IncorrectInputError extends GenericError {
    constructor() {
        super();

        this.id = 100;
        this.statusCode = 401;
        this.message = 'Provided data did not pass the validation proccess';
    };
};

export class ExpiredOrInvalidTokenError extends GenericError {
    constructor() {
        super();

        this.id = 101;
        this.statusCode = 401;
        this.message = 'Token has already expired or is invalid';
    };
};

export class InvalidUserError extends GenericError {
    constructor() {
        super();

        this.id = 102;
        this.statusCode = 401;
        this.message = 'Provided user does not match the decoded user';
    };
};

export class AlreadyLoggedInError extends GenericError {
    constructor() {
        super();

        this.id = 103;
        this.statusCode = 403;
        this.message = 'You must log out before performing this action';
    };
};

export class UnknownIdentityError extends GenericError {
    constructor() {
        super();

        this.id = 104;
        this.statusCode = 401;
        this.message = 'Detected action performed by an unknown identity';
    };
};

export class NotExpiredYetOrInvalidTokenError extends GenericError {
    constructor() {
        super();

        this.id = 105;
        this.statusCode = 401;
        this.message = 'Token has not expired yet or is invalid';
    };
};

export class LocationAlreadyAddedError extends GenericError {
    constructor() {
        super();

        this.id = 106;
        this.statusCode = 401;
        this.message = 'Location has already been added to trusted';
    };
};

export class InvalidEmailOrPasswordError extends GenericError {
    constructor() {
        super();

        this.id = 200;
        this.statusCode = 401;
        this.message = 'Invalid email or password';
    };
};

export class UnknownLocationError extends GenericError {
    constructor() {
        super();

        this.id = 201;
        this.statusCode = 401;
        this.message = 'Detected login attempt from a different location';
    };
};

export class InvalidPasswordError extends GenericError {
    constructor() {
        super();

        this.id = 202;
        this.statusCode = 401;
        this.message = 'Invalid password';
    };
};

export class AccessDenied extends GenericError {
    constructor() {
        super();

        this.id = 203;
        this.statusCode = 403;
        this.message = 'You do not have required permissions to perform this action';
    };
};

export class UserNotFoundError extends GenericError {
    constructor() {
        super();

        this.id = 300;
        this.statusCode = 401;
        this.message = 'User does not exist';
    };
};

export class UsernameAlreadyExistError extends GenericError {
    constructor() {
        super();

        this.id = 301;
        this.statusCode = 401;
        this.message = 'Username already exists';
    };
};

export class EmailAlreadyExistError extends GenericError {
    constructor() {
        super();

        this.id = 302;
        this.statusCode = 401;
        this.message = 'Email already exists';
    };
};

export class EmailAlreadyConfirmedError extends GenericError {
    constructor() {
        super();

        this.id = 303;
        this.statusCode = 403;
        this.message = 'Email has already been confirmed';
    };
};

export class EmailNotConfirmedError extends GenericError {
    constructor() {
        super();

        this.id = 304;
        this.statusCode = 403;
        this.message = 'Email has not been confirmed yet';
    };
};

export class NoteNotFoundError extends GenericError {
    constructor() {
        super();

        this.id = 400;
        this.statusCode = 404;
        this.message = 'Note does not exist';
    };
};