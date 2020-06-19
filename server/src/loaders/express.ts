import { Application, json } from 'express';
import renderRoutes from './render-routes';

export default (app: Application): void => {
    app.use(json({ limit: '10kb' }));
    app.set('trust proxy', 'uniquelocal');

    renderRoutes(app);
};