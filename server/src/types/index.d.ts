import UserService from "../services/user-service";
import EmailService from "../services/email-service";
import TokenService from "../services/token-service";
import EventEmitter from "../events/event-emitter";
import NoteService from "../services/note-service";
import CategoryService from "../services/category-service";
import FileService from "../services/file-service";
import { INote, ICategory } from "./models";

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
           note?: INote;
           notes?: Record<string, INote>;
           category?: ICategory;
           updatedData?: Record<string, unknown>;
       },
       services: {
           email: EmailService;
           token: TokenService;
           user: UserService;
           note: NoteService;
           category: CategoryService;
           file: FileService;
       },
       eventEmitter: typeof EventEmitter
    }
}