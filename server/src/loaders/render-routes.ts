import { Application, Router } from 'express';
import routes from '../routes';
import config from '../assets/config';
import swaggerUI, { JsonObject } from 'swagger-ui-express';
import yaml from 'yamljs';
import path from 'path';

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
    
    const swaggerDocs: JsonObject = yaml.load(path.join(__dirname, '/../../swagger.yml'));
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

    app.use('*', routes.defaultRoute);
};