import { Application, Router } from 'express';
import routes from '../routes';
import config from '../assets/config';

export default (app: Application): void => {
    const rootRouter: { path: string, router: Router }[] = [
        { path: 'login', router: routes.login },
        { path: 'register', router: routes.register },
        { path: 'add-location', router: routes.addLocation },
        { path: 'logs', router: routes.logs }
    ];

    rootRouter.forEach(object => {
        app.use(`${config.API_PATH}/${object.path}`, object.router);
    });
    
    app.use('*', routes.defaultRoute);
};