import { Router, Request, Response } from 'express';
import validate from '../middlewares/validation/index';
import logger from '../utils/logger';
import cookieParser from 'cookie-parser';

const router: Router = Router();

/**
 * @route   POST api/v1/forgot-password
 * @desc    Get reset password link
 * @access  Public
 */
router.post('/', cookieParser(), validate.forgotPassword, async (req: Request, res: Response): Promise<void> => {
    await logger.log({ type: 'info', message: 'Mail sent successfully!', place: 'Forgot password route' });

    req.eventEmitter.emit('FORGOT_PASSWORD_SUCCESS', {
        id: req.context!.id,
        email: req.context!.email
    });

    res.status(200).end();
});

export default router;