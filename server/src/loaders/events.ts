import { Request, Response, NextFunction } from 'express';
import EventEmitter from '../events/event-emitter';
import events from '../events/lib';

export default (req: Request, res: Response, next: NextFunction): void => {
    const eventEmitter: EventEmitter = new EventEmitter(events);
    
    req.eventEmitter = eventEmitter;
    next();
};