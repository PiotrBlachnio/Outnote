import { Application, Router } from 'express';
import routes from '../routes';
import config from '../assets/config';

export default (app: Application): void => {
    const rootRouter: { path: string, router: Router }[] = [
        { path: 'logs', router: routes.logs },
        { path: 'login', router: routes.login },
        { path: 'register', router: routes.register },
        { path: 'add-location', router: routes.addLocation },
        { path: 'confirm-email', router: routes.confirmEmail },
        { path: 'forgot-password', router: routes.forgotPassword },
        { path: 'logout', router: routes.logout },
        { path: 'refresh-token', router: routes.refreshToken },
        { path: 'reset-password', router: routes.resetPassword }
    ];

    rootRouter.forEach(object => {
        app.use(`${config.API_PATH}/${object.path}`, object.router);
    });
    
    app.use('*', routes.defaultRoute);
};