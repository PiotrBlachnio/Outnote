import logger from "./logger";
import { connect } from "mongoose";
import config from "../assets/config";

export default async (): Promise<void> => {
    try {
        await connect(config.DATABASE_CONN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            dbName: config.DATABASE_NAME
        });

        await logger.log({ type: 'info', message: 'Connected to the database successfully!', place: 'Connect database function' });
    } catch(error) {
        await logger.log({ type: 'error', message: error.message, place: 'Connect database function' });
    };
};