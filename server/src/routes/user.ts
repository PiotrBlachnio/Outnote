import { Router, Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { Roles } from '../assets/enums';
import auth from '../middlewares/auth';
import FileService from '../services/file-service';
import cookieParser from 'cookie-parser';

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
        await req.services.user.updateOne({ _id: req.user!.id }, { avatar: filename });

        await logger.log({ type: 'info', message: 'Avatar updated successfully!', place: 'Update avatar route' });
        res.status(200).json({ filename });
    } catch(error) {
        error.place = "Update avatar route";
        next(error);
    };
});

export default router;