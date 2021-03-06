import { Application, json } from 'express';
import compression from 'compression';
import renderRoutes from './render-routes';
import handleErrors from '../middlewares/handle-errors';
import helmet from 'helmet';
import cors from 'cors';
import initServices from './services';
import initEvents from './events';
import { spamLimiter } from '../middlewares/speed-limiter';

export default (app: Application): void => {
    app.use(helmet());
    app.use(compression());

    const corsConfig = {
        credentials: true,
        origin: true
    };

    app.use(cors(corsConfig));
    app.options('*', cors(corsConfig));
    
    app.use(json({ limit: '10kb' }));
    app.set('trust proxy', 'uniquelocal');

    app.use(spamLimiter);
    
    app.use(initServices);
    app.use(initEvents);

    renderRoutes(app);
    app.use(handleErrors);
};