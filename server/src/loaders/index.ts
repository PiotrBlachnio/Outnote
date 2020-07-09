import http from 'http';
import https from 'https';
import { Application } from "express";
import expressLoader from './express';
import logger from '../utils/logger';
import connectDatabase from "../utils/connect-database";
import initAgenda from '../tasks';

export default async (app: Application): Promise<void> => {
    process.on('uncaughtException', async (error) => {
        console.log(error);
        await logger.log({ type: 'error', message: error.message, place: 'UncaughtException' });
        
        process.exit(1);
    });

    process.on('unhandledRejection', async (error) => {
        console.log(error);
        await logger.log({ type: 'error', message: error, place: 'UnhandledRejection'});
    });

    http.globalAgent.maxSockets = Infinity;
    https.globalAgent.maxSockets = Infinity;
    
    connectDatabase();

    await initAgenda();

    expressLoader(app);
};