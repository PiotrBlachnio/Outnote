import { Router, Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { Roles } from '../assets/enums';
import auth from '../middlewares/auth';
import { ICategory } from '../types/models';
import { NoteNotFoundError, IncorrectInputError } from '../assets/errors';
import cookieParser from 'cookie-parser';
import validator from '../utils/validators';

const router: Router = Router();

router.use(cookieParser());

/**
 * @route   GET api/v1/category
 * @desc    Get all user's categories
 * @access  Protected
*/
router.get('/', auth(Roles.USER), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const categories: ICategory[] = await req.services.category.find({ ownerId: req.user!.id });

        await logger.log({ type: 'info', message: 'Categories retrieved successfully!', place: 'Get all categories route' });
        res.status(200).json({ categories });
    } catch(error) {
        error.place = 'Get all categories route';
        next(error);
    };
});

/**
 * @route   POST api/v1/category
 * @desc    Create new category
 * @access  Protected
*/
router.post('/', auth(Roles.USER), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name } = req.body;
        
        if(!validator.validateInput({ name })) {
            throw new IncorrectInputError;
        };

        const category: ICategory = await req.services.category.create({
            name: name,
            ownerId: req.user!.id
        });

        await logger.log({ type: 'info', message: 'Category create successfully!', place: 'Create category route' });
        res.status(201).json({ category });
    } catch(error) {
        error.place = 'Create category route';
        next(error);
    };
});

/**
 * @route   DELETE api/v1/category/:id
 * @desc    Delete single create by providing valid id
 * @access  Protected
*/
router.delete('/:id', auth(Roles.USER), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if(!validator.validateInput({ id: req.params.id })) {
            throw new IncorrectInputError;
        };

        const category: ICategory | null = await req.services.category.findOne({ _id: req.params.id, ownerId: req.user!.id });

        if(!category) {
            throw new NoteNotFoundError();
        }

        await req.services.category.deleteOne({ _id: category.id });
        await logger.log({ type: 'info', message: 'Category deleted successfully!', place: 'Delete category route' });

        res.status(200).end();
    } catch(error) {
        error.place = 'Delete category route';
        next(error);
    };
});

/**
 * @route   PATCH api/v1/category/:id
 * @desc    Update single category by providing valid id
 * @access  Protected
*/
router.patch('/:id', auth(Roles.USER), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { field, value } = req.body;

        if(!validator.validateInput({ field: field, [field]: value, id: req.params.id })) {
            throw new IncorrectInputError;
        };

        const category: ICategory | null = await req.services.category.findOne({ _id: req.params.id, ownerId: req.user!.id });

        if(!category) {
            throw new NoteNotFoundError();
        }

        await req.services.category.updateOne({ _id: category.id }, { [req.body.field]: req.body.value });
        await logger.log({ type: 'info', message: 'Category updated successfully!', place: 'Update category route' });
        
        res.status(200).end();
    } catch(error) {
        error.place = 'Update category route';
        next(error);
    };
});

export default router;