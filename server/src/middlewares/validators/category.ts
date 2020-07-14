import { NextFunction, Request, Response } from "express";
import validator from '../../utils/validators';
import { IncorrectInputError, NoteNotFoundError } from "../../assets/errors";
import { ICategory } from "../../types/models";
import logger from "../../utils/logger";

async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { name } = req.body;
        
        if(!validator.validateInput({ name })) {
            throw new IncorrectInputError;
        };

        const category: ICategory = await req.services.category.create({
            name: name,
            ownerId: req.user!.id
        });

        req.context = { category };
    } catch(error) {
        error.place = 'Create category route';
        next(error);
    };
};

async function deleteById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if(!validator.validateInput({ id: req.params.id })) {
            throw new IncorrectInputError;
        };

        const category: ICategory | null = await req.services.category.findOne({ _id: req.params.id, ownerId: req.user!.id });

        if(!category) {
            throw new NoteNotFoundError();
        }

        req.context = { id: category.id };
    } catch(error) {
        error.place = 'Delete category route';
        next(error);
    };
};

async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
    
};

export default {
    create,
    update,
    delete: deleteById
}