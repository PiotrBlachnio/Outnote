import { Router, Request, Response } from 'express';
import validate from '../middlewares/validation/index';
import logger from '../utils/logger';
import cookieParser from 'cookie-parser';

const router: Router = Router();

/**
 * @route   POST api/v1/reset-password
 * @desc    Reset user's password
 * @access  Public
 */
router.post('/', cookieParser(), validate.resetPassword, async (req: Request, res: Response): Promise<void> => {
    await logger.log({ type: 'info', message: 'Password reseted successfully!', place: 'Reset password route' });

    req.eventEmitter.emit('RESET_PASSWORD_SUCCESS', {
        id: req.context!.id,
        password: req.context!.password
    });

    res.status(200).end();
});

export default router;