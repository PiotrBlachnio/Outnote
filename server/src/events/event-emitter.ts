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

        this.on('ADD_LOCATION_SUCCESS', this._events.addLocationSuccess);

        this.on('FORGOT_PASSWORD_SUCCESS', this._events.forgotPasswordSuccess);

        this.on('CONFIRM_EMAIL_SUCCESS', this._events.confirmEmailSuccess);
    };
};

export default new EventEmitter(events);