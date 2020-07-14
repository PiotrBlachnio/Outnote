import { Router, Request, Response } from 'express';
import validate from '../middlewares/validation/index';
import logger from '../utils/logger';
import cookieParser from 'cookie-parser';

const router = Router();

/**
 * @route   POST api/v1/send-confirmation-mail
 * @desc    Send confirmation mail to user
 * @access  Public
*/
router.post('/', cookieParser(), validate.sendConfirmationMail, async (req: Request, res: Response): Promise<void> => {
    await logger.log({ type: 'info', message: 'Sent confirmation mail successfully!', place: 'Send confirmation mail route' });
    
    req.eventEmitter.emit('SEND_CONFIRMATION_MAIL_SUCCESS', {
        email: req.context!.email,
        id: req.context!.id
    });

    res.status(200).end();
});

export default router;