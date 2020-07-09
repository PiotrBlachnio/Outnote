import { Application, json } from 'express';
import compression from 'compression';
import renderRoutes from './render-routes';
import handleErrors from '../middlewares/handle-errors';
import cors from 'cors';
import initServices from './services';
import initEvents from './events';
import { spamLimiter } from '../middlewares/speed-limiter';

export default (app: Application): void => {
    app.use(compression());
    app.use(cors());
    
    app.use(json({ limit: '10kb' }));
    app.set('trust proxy', 'uniquelocal');

    app.use(spamLimiter);
    
    app.use(initServices);
    app.use(initEvents);

    renderRoutes(app);
    app.use(handleErrors);
};