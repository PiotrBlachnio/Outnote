import { Router, Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { Roles } from '../assets/enums';
import auth from '../middlewares/auth';
import FileService from '../services/file-service';
import cookieParser from 'cookie-parser';
import { IUser } from '../types/models';
import validate from '../middlewares/validation';

const router: Router = Router();

router.use(cookieParser());

/**
 * @route   PATCH api/v1/user/avatar
 * @desc    Update user's avatar
 * @access  Protected
*/
router.patch('/avatar', auth(Roles.USER), new FileService().middleware.single('avatar'), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const filename: string = await req.services.file.uploadImage(req.file.buffer);
        req.eventEmitter.emit('UPDATE_USER_SUCCESS', req.user!.id, { avatar: filename });

        await logger.log({ type: 'info', message: 'Avatar updated successfully!', place: 'Update avatar route' });
        res.status(200).json({ filename });
    } catch(error) {
        error.place = "Update avatar route";
        next(error);
    };
});

/**
 * @route   GET api/v1/user
 * @desc    Get user's data
 * @access  Protected
*/
router.get('/', auth(Roles.USER), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user: IUser | null = await req.services.user.findOne({ email: req.user?.email }, '-__v -password -trustedIPS -isConfirmed -role');

        await logger.log({ type: 'info', message: 'User\'s data retrieved successfully!', place: 'Get user route' });
        res.status(200).json(user);
    } catch(error) {
        error.place = "Get user route";
        next(error);
    };
});

/**
 * @route   PATCH api/v1/user
 * @desc    Update user's data
 * @access  Protected
*/
router.patch('/', auth(Roles.USER), validate.user.update, async (req: Request, res: Response): Promise<void> => {
    await logger.log({ type: 'info', message: 'User\'s data retrieved successfully!', place: 'Update user route' });
    req.eventEmitter.emit('UPDATE_USER_SUCCESS', req.user!.id, req.context?.updatedData);

    res.status(200).end();
});

export default router;