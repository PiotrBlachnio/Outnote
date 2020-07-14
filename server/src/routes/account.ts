import { Router, Request, Response } from 'express';
import validate from '../middlewares/validation/index';
import logger from '../utils/logger';
import cookieParser from 'cookie-parser';

const router: Router = Router();

/**
 * @route   POST api/v1/account/add-location
 * @desc    Add new location to user's trusted locations
 * @access  Protected
 */
router.post('/add-location', validate.account.addLocation, async (req: Request, res: Response): Promise<void> => {
    await logger.log({ type: 'info', message: 'Location has been added successfully!', place: 'Add location route' });

    req.eventEmitter.emit('ADD_LOCATION_SUCCESS', {
        userId: req.context!.id,
        ip: req.ip
    });

    res.status(200).end();
});

/**
 * @route   POST api/v1/account/confirm-email
 * @desc    Confirm user account
 * @access  Public
 */
router.post('/confirm-email', validate.account.confirmEmail, async (req: Request, res: Response): Promise<void> => {
    await logger.log({ type: 'info', message: 'Email confirmed successfully!', place: 'Confirm email route' });
    
    req.eventEmitter.emit('CONFIRM_EMAIL_SUCCESS', req.context!.id);
    
    res.status(200).end();
});

/**
 * @route   POST api/v1/account/forgot-password
 * @desc    Get reset password link
 * @access  Public
 */
router.post('/forgot-password', cookieParser(), validate.account.forgotPassword, async (req: Request, res: Response): Promise<void> => {
    await logger.log({ type: 'info', message: 'Mail sent successfully!', place: 'Forgot password route' });

    req.eventEmitter.emit('FORGOT_PASSWORD_SUCCESS', {
        id: req.context!.id,
        email: req.context!.email
    });

    res.status(200).end();
});

/**
 * @route   POST api/v1/account/reset-password
 * @desc    Reset user's password
 * @access  Public
 */
router.post('/reset-password', cookieParser(), validate.account.resetPassword, async (req: Request, res: Response): Promise<void> => {
    await logger.log({ type: 'info', message: 'Password reseted successfully!', place: 'Reset password route' });

    req.eventEmitter.emit('RESET_PASSWORD_SUCCESS', {
        id: req.context!.id,
        password: req.context!.password
    });

    res.status(200).end();
});

/**
 * @route   POST api/v1/account/send-confirmation-mail
 * @desc    Send confirmation mail to user
 * @access  Public
*/
router.post('/send-confirmation-mail', cookieParser(), validate.account.sendConfirmationMail, async (req: Request, res: Response): Promise<void> => {
    await logger.log({ type: 'info', message: 'Sent confirmation mail successfully!', place: 'Send confirmation mail route' });
    
    req.eventEmitter.emit('SEND_CONFIRMATION_MAIL_SUCCESS', {
        email: req.context!.email,
        id: req.context!.id
    });

    res.status(200).end();
});

export default router;