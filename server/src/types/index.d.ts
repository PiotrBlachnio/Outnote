import UserService from "../services/user-service";
import EmailService from "../services/email-service";
import TokenService from "../services/token-service";
import EventEmitter from "../events/event-emitter";

export {};

declare module 'express-serve-static-core' {
    interface Request {
       user?: {
          id?: string,
          username?: string,
          email?: string;
       }
       context?: {
           username?: string;
           email?: string;
           password?: string;
           id?: string;
           banId?: string;
       },
       services: {
           email: EmailService;
           token: TokenService;
           user: UserService;
       },
       eventEmitter: typeof EventEmitter
    }
}