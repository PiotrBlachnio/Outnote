import { NextFunction, Request, Response } from "express";
import validator from '../../utils/validators';
import { IncorrectInputError } from "../../assets/errors";
import { ICategory } from "../../types/models";

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
    
};

async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
    
};

export default {
    create,
    update,
    delete: deleteById
}