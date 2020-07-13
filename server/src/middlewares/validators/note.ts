import { NextFunction, Request, Response } from "express";
import validator from '../../utils/validators';
import { NoteNotFoundError } from "../../assets/errors";
import { INote } from "../../types/models";

async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
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

export default {
    getById
}