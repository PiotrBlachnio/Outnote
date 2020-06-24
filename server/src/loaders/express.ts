import { Application, json } from 'express';
import renderRoutes from './render-routes';
import handleErrors from '../middlewares/handle-errors';
import cors from 'cors';
import initServices from './services';
import initEvents from './events';

export default (app: Application): void => {
    app.use(cors());
    
    app.use(json({ limit: '10kb' }));
    app.set('trust proxy', 'uniquelocal');

    app.use(initServices);
    app.use(initEvents);

    renderRoutes(app);
    app.use(handleErrors);
};