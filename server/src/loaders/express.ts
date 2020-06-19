import { Application, json } from 'express';
import renderRoutes from './render-routes';
import handleErrors from '../middlewares/handle-errors';

export default (app: Application): void => {
    app.use(json({ limit: '10kb' }));
    app.set('trust proxy', 'uniquelocal');

    renderRoutes(app);
    app.use(handleErrors);
};