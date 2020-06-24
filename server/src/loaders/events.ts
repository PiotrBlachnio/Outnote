import { Request, Response, NextFunction } from 'express';
import eventEmitter from '../events/event-emitter';

export default (req: Request, res: Response, next: NextFunction): void => {    
    req.eventEmitter = eventEmitter;
    next();
};