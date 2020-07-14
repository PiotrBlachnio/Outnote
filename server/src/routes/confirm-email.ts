import { Router, Request, Response } from 'express';
import validate from '../middlewares/validation/index';
import logger from '../utils/logger';

const router: Router = Router();

/**
 * @route   POST api/v1/confirm-email
 * @desc    Confirm user account
 * @access  Public
 */
router.post('/', validate.confirmEmail, async (req: Request, res: Response): Promise<void> => {
    await logger.log({ type: 'info', message: 'Email confirmed successfully!', place: 'Confirm email route' });
    
    req.eventEmitter.emit('CONFIRM_EMAIL_SUCCESS', req.context!.id);
    
    res.status(200).end();
});

export default router;