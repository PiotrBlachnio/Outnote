import { Request, Response, NextFunction } from 'express';
import eventEmitter from '../events/event-emitter';
import config from '../assets/config';

export default (req: Request, res: Response, next: NextFunction): void => {
    if(config.NODE_ENV === 'test') {
        req.eventEmitter = {
            //@ts-ignore-start
            emit: () => {}
        }
    } else req.eventEmitter = eventEmitter;
    
    next();
};