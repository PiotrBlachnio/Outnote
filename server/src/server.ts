import express, { Application } from 'express';
import initLoaders from './loaders';
import config from './assets/config';

class Server {
    public PORT: string;
    public app: Application;

    constructor({ port }: { port: string }) {
        this.PORT = port;
        this.app = express();
    };

    async start(): Promise<void> {
        await initLoaders(this.app);
        if(config.NODE_ENV !== 'test') this.app.listen(this.PORT, (): void => console.log(`Server is running on port ${this.PORT}`));
    };
};

const server: Server = new Server({ port: process.env.PORT || config.PORT });
server.start();

export const app: Application = server.app;