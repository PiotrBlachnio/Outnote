import express, { Application } from 'express';
import initLoaders from './loaders';
import config from './assets/config';
import cluster from 'cluster';
import os from 'os';

class Server {
    public PORT: string;
    public app: Application;

    constructor({ port }: { port: string }) {
        this.PORT = port;
        this.app = express();
    };

    async start(): Promise<void> {
        await initLoaders(this.app);
        if(config.NODE_ENV !== 'test') this.app.listen(this.PORT);
    }
}

if(cluster.isMaster) {
    const cpus: number = os.cpus().length;
    console.log(`Forking for ${cpus} CPUs ...`);

    for(let i = 0; i < cpus; i++) cluster.fork();

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    console.log(`Worker ${cluster.worker.process.pid} is running`);
    
    const server: Server = new Server({ port: process.env.PORT || config.PORT });
    server.start();
}