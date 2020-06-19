import 'dotenv/config';

const secrets = {
    NODE_ENV: process.env.NODE_ENV!,
    DATABASE_CONN: process.env.DATABASE_CONN!,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET!,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
    CONFIRM_EMAIL_TOKEN_SECRET: process.env.CONFIRM_EMAIL_TOKEN_SECRET!,
    RESET_PASSWORD_TOKEN_SECRET: process.env.RESET_PASSWORD_TOKEN_SECRET!,
    CONFIRM_IDENTITY_TOKEN_SECRET: process.env.CONFIRM_IDENTITY_TOKEN_SECRET!
};

const defaults = {
    PORT: '4000',
    DATABASE_NAME: 'Main',
    TEST_DATABASE_NAME: 'test',
    API_PATH: '/api/v1'
};

export default {
    ...defaults,
    ...secrets
};