import { Router, Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { Roles } from '../assets/enums';
import auth from '../middlewares/auth';
import { ICategory } from '../types/models';
import { NoteNotFoundError, IncorrectInputError } from '../assets/errors';
import cookieParser from 'cookie-parser';
import validator from '../utils/validators';
import validate from '../middlewares/validators/index';

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
router.post('/', auth(Roles.USER), validate.category.create ,async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await logger.log({ type: 'info', message: 'Category create successfully!', place: 'Create category route' });
    res.status(201).json({ category: req.context?.category });
});

/**
 * @route   DELETE api/v1/category/:id
 * @desc    Delete single create by providing valid id
 * @access  Protected
*/
router.delete('/:id', auth(Roles.USER), validate.category.delete, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await logger.log({ type: 'info', message: 'Category deleted successfully!', place: 'Delete category route' });
    req.eventEmitter.emit('DELETE_CATEGORY_SUCCESS', req.context?.id);

    res.status(200).end();
});

/**
 * @route   PATCH api/v1/category/:id
 * @desc    Update single category by providing valid id
 * @access  Protected
*/
router.patch('/:id', auth(Roles.USER), validate.category.update, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await logger.log({ type: 'info', message: 'Category updated successfully!', place: 'Update category route' });
    req.eventEmitter.emit('UPDATE_CATEGORY_SUCCESS', req.context?.id, req.context?.updatedData);

    res.status(200).end();
});

export default router;