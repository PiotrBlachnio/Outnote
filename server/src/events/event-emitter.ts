import { EventEmitter as NodeEventEmitter } from 'events';
import events, { TEvents } from './lib';

export class EventEmitter extends NodeEventEmitter {
    private _events: TEvents;

    constructor(events: TEvents) {
        super();

        this._events = events;
        this.initEvents();
    };

    private initEvents(): void {
        this.on('REGISTER_SUCCESS', this._events.registerSuccess);
    };
};

export default new EventEmitter(events);