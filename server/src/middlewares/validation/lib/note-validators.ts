import { NextFunction, Request, Response } from "express";
import validator from '../../../utils/validators';
import { NoteNotFoundError, IncorrectInputError, CategoryNotFoundError } from "../../../assets/errors";
import { INote, ICategory } from "../../../types/models";

async function validateGetNoteByIdRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if(!validator.validateInput({ id: req.params.id })) {
            throw new NoteNotFoundError();
        };

        const note: INote | null = await req.services.note.findOne({ _id: req.params.id, ownerId: req.user!.id });

        if(!note) {
            throw new NoteNotFoundError();
        }

        req.context = { note };
    } catch(error) {
        error.place = 'Get note by id route';
        next(error);
    };
};

async function validateGetAllNotesRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.body;

        if(!validator.validateInput({ id })) {
            throw new NoteNotFoundError();
        };

        const category: ICategory | null = await req.services.category.findById(id);
        if(!category) {
            throw new CategoryNotFoundError;
        };

        const notes: INote[] = await req.services.note.find({ categoryId: id, ownerId: req.user!.id });

        req.context = { notes };
    } catch(error) {
        error.place = 'Get note by id route';
        next(error);
    };
};

async function validateCreateNoteRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { title, categoryId, isPrivate } = req.body;

        if(!validator.validateInput({ id: categoryId, title, isPrivate })) {
            throw new IncorrectInputError;
        };

        const category: ICategory | null = await req.services.category.findById(categoryId);
        if(!category) {
            throw new CategoryNotFoundError;
        };

        const note: INote = await req.services.note.create({
            title,
            categoryId,
            isPrivate,
            ownerId: req.user!.id,
        });

        req.context = { note };
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
            throw new NoteNotFoundError();
        }

        req.context = { id: req.params.id };
    } catch(error) {
        error.place = 'Delete note route';
        next(error);
    };
};

async function validateUpdateNoteRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { field, value } = req.body;

        if(!validator.validateInput({ field: field, [field]: value, id: req.params.id })) {
            throw new IncorrectInputError;
        };

        const note: INote | null = await req.services.note.findOne({ _id: req.params.id, ownerId: req.user!.id });

        if(!note) {
            throw new NoteNotFoundError();
        }

        req.context = { 
            updatedData: { [field]: value },
            id: req.params.id
        };

    } catch(error) {
        error.place = 'Update note route';
        next(error);
    };
};

export default {
    getById: validateGetNoteByIdRoute,
    getAll: validateGetAllNotesRoute,
    create: validateCreateNoteRoute,
    update: validateUpdateNoteRoute,
    delete: validateDeleteNoteRoute
}