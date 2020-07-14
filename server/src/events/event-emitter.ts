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

        this.on('RESET_PASSWORD_SUCCESS', this._events.resetPasswordSuccess);

        this.on('SEND_CONFIRMATION_MAIL_SUCCESS', this._events.sendConfirmationMailSuccess);

        this.on('DELETE_NOTE_SUCCESS', this._events.deleteNoteSuccess);

        this.on('UPDATE_NOTE_SUCCESS', this._events.updateNoteSuccess);

        this.on('DELETE_CATEGORY_SUCCESS', this._events.deleteCategorySuccess);

        this.on('UPDATE_CATEGORY_SUCCESS', this._events.updateCategorySuccess);
    };
};

export default new EventEmitter(events);