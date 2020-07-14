import { Application, Router } from 'express';
import routes from '../routes';
import config from '../assets/config';

export default (app: Application): void => {
    const rootRouter: { path: string, router: Router }[] = [
        { path: 'logs', router: routes.logs },
        { path: 'account', router: routes.account },
        { path: 'note', router: routes.note },
        { path: 'category', router: routes.category },
        { path: 'user', router: routes.user },
        { path: 'auth', router: routes.auth }
    ];

    rootRouter.forEach(object => {
        app.use(`${config.API_PATH}/${object.path}`, object.router);
    });
    
    app.use('*', routes.defaultRoute);
};