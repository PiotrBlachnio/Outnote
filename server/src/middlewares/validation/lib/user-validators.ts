import { NextFunction, Request, Response } from "express";
import { IUser } from "../../../types/models";
import validator from '../../../utils/validators';
import { IncorrectInputError, UserNotFoundError } from "../../../assets/errors";

async function validateUpdateUserRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { field, value } = req.body;

        if(!validator.validateInput({ field: field, [field]: value, id: req.params.id })) {
            throw new IncorrectInputError;
        };

        const user: IUser | null = await req.services.user.findById(req.user!.id!);
        if(!user) {
            throw new UserNotFoundError;
        };

        req.context = { 
            updatedData: { [field]: value }
        };
        next();
    } catch(error) {
        error.place = "Update user route";
        next(error);
    };
};

export default {
    update: validateUpdateUserRoute
}