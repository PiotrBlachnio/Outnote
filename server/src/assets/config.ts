import 'dotenv/config';

const secrets = {
    NODE_ENV: process.env.NODE_ENV!
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