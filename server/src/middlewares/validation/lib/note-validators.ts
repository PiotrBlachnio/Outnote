import { NextFunction, Request, Response } from "express";
import validator from '../../../utils/validators';
import { NoteNotFoundError, IncorrectInputError, CategoryNotFoundError, InaccessibleNoteError } from "../../../assets/errors";
import { INote, ICategory } from "../../../types/models";

async function validateGetNoteByIdRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if(!validator.validateInput({ id: req.params.id })) {
            throw new NoteNotFoundError;
        };

        const note: INote | null = await req.services.note.findOne({ _id: req.params.id, ownerId: req.user!.id });

        if(!note) {
            throw new NoteNotFoundError;
        }

        req.context = { note };
        next();
    } catch(error) {
        error.place = 'Get note by id route';
        next(error);
    };
};

async function validateGetPublicNoteRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if(!validator.validateInput({ id: req.params.noteId })) {
            throw new NoteNotFoundError();
        };

        const note: INote | null = await req.services.note.findOne({ _id: req.params.noteId, ownerId: req.params.userId });

        if(!note) {
            throw new NoteNotFoundError;
        }

        if(note.isPrivate) {
            throw new InaccessibleNoteError;
        };

        req.context = { note };
        next();
    } catch(error) {
        error.place = 'Get public note route';
        next(error);
    };
};

async function validateGetAllNotesRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id: string | undefined = req.query.id as string;

        if(!validator.validateInput({ id })) {
            throw new CategoryNotFoundError;
        };

        const category: ICategory | null = await req.services.category.findById(id);
        if(!category) {
            throw new CategoryNotFoundError;
        };

        const notes: INote[] = await req.services.note.find({ categoryId: id, ownerId: req.user!.id });

        req.context = { notes: notes.reduce((obj, item) => {
            return {
                ...obj,
                [item.id]: item
            }
        }, {})};
        
        next();
    } catch(error) {
        error.place = 'Get all notes route';
        next(error);
    };
};

async function validateCreateNoteRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { categoryId } = req.body;

        if(!validator.validateInput({ id: categoryId })) {
            throw new IncorrectInputError;
        };

        const category: ICategory | null = await req.services.category.findById(categoryId);
        if(!category) {
            throw new CategoryNotFoundError;
        };

        const note: INote = await req.services.note.create({
            categoryId: categoryId,
            ownerId: req.user!.id,
        });

        req.context = { note };
        next();
    } catch(error) {
        error.place = 'Create note route';
        next(error);
    };
};

async function validateDeleteNoteRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if(!validator.validateInput({ id: req.params.id })) {
            throw new IncorrectInputError;
        };

        const note: INote | null = await req.services.note.findOne({ _id: req.params.id, ownerId: req.user!.id });

        if(!note) {
            throw new NoteNotFoundError;
        }

        req.context = { id: req.params.id };
        next();
    } catch(error) {
        error.place = 'Delete note route';
        next(error);
    };
};

async function validateUpdateNotesRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { notes }: { notes: Record<string, Record<string, unknown>> } = req.body;

        for(const [id, note] of Object.entries(notes)) {
            for(const [key, value] of Object.entries(note)) {
                if(!validator.validateInput({ field: key, [key as string]: value })) {
                    throw new IncorrectInputError;
                };
    
                const existingNote: INote | null = await req.services.note.findOne({ _id: id, ownerId: req.user!.id });
    
                if(!existingNote) {
                    throw new NoteNotFoundError;
                };
            };
        };

        req.context = { updatedNotes: notes };
        next();
    } catch(error) {
        error.place = 'Update notes route';
        next(error);
    };
};

export default {
    getById: validateGetNoteByIdRoute,
    getPublic: validateGetPublicNoteRoute,
    getAll: validateGetAllNotesRoute,
    create: validateCreateNoteRoute,
    update: validateUpdateNotesRoute,
    delete: validateDeleteNoteRoute
}