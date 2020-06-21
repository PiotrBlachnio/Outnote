import express, { Application } from 'express';
import initLoaders from './loaders';
import http, { Server as HttpServer } from 'http';
import config from './assets/config';
import { argv } from 'yargs';

class Server {
    public PORT: string;
    public app: Application;
    public server: HttpServer;

    constructor({ port }: { port: string }) {
        this.PORT = port;
        this.app = express();
        this.server = http.createServer(this.app);
    };

    async start(): Promise<void> {
        await initLoaders(this.app);
        if(config.NODE_ENV !== 'test') this.server.listen(this.PORT, (): void => console.log(`Server is running on port ${this.PORT}`));
    };
};

const server: Server = new Server({ port: process.env.PORT || config.PORT });
server.start();

export const app: Application = server.app;