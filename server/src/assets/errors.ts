/**
 * 0 - Internal server error
 * 
 * ? Auth errors
 * 100 - Invalid email or password
 * 101 - Invalid password
 * 102 - Token has already expired or is invalid
 * 103 - Token has not expired yet or is invalid
 * 
 * ? Forbidden actions
 * 200 - Provided data did not pass the validation proccess
 * 201 - You must log out before performing this action
 * 202 - You do not have required permissions to perform this action
 * 
 * ? Identity errors
 * 300 - Detected action performed by an unknown identity
 * 301 - Detected login attempt from a different location
 * 302 - Location has already been added to trusted
 * 
 * ? User errors
 * 400 - User does not exist
 * 401 - Provided user does not match the decoded user
 * 
 * ? Email & Userame errors
 * 500 - Email has not been confirmed yet
 * 501 - Email has already been confirmed
 * 502 - Email already exists
 * 503 - Username already exists
 * 
 * ? Note & Categories errors
 * 600 - Note does not exist
 * 601 - Category does not exist
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

export class InvalidEmailOrPasswordError extends GenericError {
    constructor() {
        super();

        this.id = 100;
        this.statusCode = 401;
        this.message = 'Invalid email or password';
    };
};

export class InvalidPasswordError extends GenericError {
    constructor() {
        super();

        this.id = 101;
        this.statusCode = 401;
        this.message = 'Invalid password';
    };
};

export class ExpiredOrInvalidTokenError extends GenericError {
    constructor() {
        super();

        this.id = 102;
        this.statusCode = 401;
        this.message = 'Token has already expired or is invalid';
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

export class IncorrectInputError extends GenericError {
    constructor() {
        super();

        this.id = 200;
        this.statusCode = 401;
        this.message = 'Provided data did not pass the validation proccess';
    };
};

export class AlreadyLoggedInError extends GenericError {
    constructor() {
        super();

        this.id = 201;
        this.statusCode = 403;
        this.message = 'You must log out before performing this action';
    };
};

export class AccessDenied extends GenericError {
    constructor() {
        super();

        this.id = 202;
        this.statusCode = 403;
        this.message = 'You do not have required permissions to perform this action';
    };
};

export class UnknownIdentityError extends GenericError {
    constructor() {
        super();

        this.id = 300;
        this.statusCode = 401;
        this.message = 'Detected action performed by an unknown identity';
    };
};

export class UnknownLocationError extends GenericError {
    constructor() {
        super();

        this.id = 301;
        this.statusCode = 401;
        this.message = 'Detected login attempt from a different location';
    };
};

export class LocationAlreadyAddedError extends GenericError {
    constructor() {
        super();

        this.id = 302;
        this.statusCode = 401;
        this.message = 'Location has already been added to trusted';
    };
};

export class UserNotFoundError extends GenericError {
    constructor() {
        super();

        this.id = 400;
        this.statusCode = 401;
        this.message = 'User does not exist';
    };
};

export class InvalidUserError extends GenericError {
    constructor() {
        super();

        this.id = 401;
        this.statusCode = 401;
        this.message = 'Provided user does not match the decoded user';
    };
};

export class EmailNotConfirmedError extends GenericError {
    constructor() {
        super();

        this.id = 500;
        this.statusCode = 403;
        this.message = 'Email has not been confirmed yet';
    };
};

export class EmailAlreadyConfirmedError extends GenericError {
    constructor() {
        super();

        this.id = 501;
        this.statusCode = 403;
        this.message = 'Email has already been confirmed';
    };
};

export class EmailAlreadyExistError extends GenericError {
    constructor() {
        super();

        this.id = 502;
        this.statusCode = 401;
        this.message = 'Email already exists';
    };
};

export class UsernameAlreadyExistError extends GenericError {
    constructor() {
        super();

        this.id = 503;
        this.statusCode = 401;
        this.message = 'Username already exists';
    };
};

export class NoteNotFoundError extends GenericError {
    constructor() {
        super();

        this.id = 600;
        this.statusCode = 404;
        this.message = 'Note does not exist';
    };
};

export class CategoryNotFoundError extends GenericError {
    constructor() {
        super();

        this.id = 601;
        this.statusCode = 404;
        this.message = 'Category does not exist';
    };
};