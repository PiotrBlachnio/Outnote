import { NextFunction, Request, Response } from "express";
import validator from '../../../utils/validators';
import { IncorrectInputError, NoteNotFoundError, CategoryNotFoundError } from "../../../assets/errors";
import { ICategory } from "../../../types/models";

async function validateCreateCategoryRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
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

async function validateDeleteCategoryRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if(!validator.validateInput({ id: req.params.id })) {
            throw new IncorrectInputError;
        };

        const category: ICategory | null = await req.services.category.findOne({ _id: req.params.id, ownerId: req.user!.id });

        if(!category) {
            throw new CategoryNotFoundError();
        }

        req.context = { id: category.id };
    } catch(error) {
        error.place = 'Delete category route';
        next(error);
    };
};

async function validateUpdateCategoryRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { field, value } = req.body;

        if(!validator.validateInput({ field: field, [field]: value, id: req.params.id })) {
            throw new IncorrectInputError;
        };

        const category: ICategory | null = await req.services.category.findOne({ _id: req.params.id, ownerId: req.user!.id });

        if(!category) {
            throw new CategoryNotFoundError();
        }

        req.context = {
            id: category.id,
            updatedData: { [req.body.field]: req.body.value }
        };
    } catch(error) {
        error.place = 'Update category route';
        next(error);
    };
};

export default {
    create: validateCreateCategoryRoute,
    update: validateUpdateCategoryRoute,
    delete: validateDeleteCategoryRoute
}