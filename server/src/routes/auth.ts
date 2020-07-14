import { Router, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import validate from '../middlewares/validation/index';
import logger from '../utils/logger';
import { Token } from '../assets/enums';

const router: Router = Router();

/**
 * @route   POST api/v1/auth/register
 * @desc    Register new user
 * @access  Public
 */
router.post('/register', cookieParser(), validate.auth.register, async (req: Request, res: Response): Promise<void> => {
    await logger.log({ type: 'info', message: 'Registered successfully!', place: 'Register route' });
    
    req.eventEmitter.emit('REGISTER_SUCCESS', {
        username: req.context!.username,
        email: req.context!.email,
        password: req.context!.password,
        ip: req.ip
    });

    res.status(201).end();
});

/**
 * @route   POST api/v1/auth/login
 * @desc    Auth user
 * @access  Public
*/
router.post('/login', cookieParser(), validate.auth.login, async (req: Request, res: Response): Promise<void> => {
    await logger.log({ type: 'info', message: 'Logged in successfully!', place: 'Login route' });
    
    const accessToken: string = req.services.token.generateToken(Token.ACCESS, {
        id: req.context!.id!,
        username: req.context!.username!,
        email: req.context!.email!,
        ip: req.ip
    });

    res.cookie('jid', accessToken, { httpOnly: true });

    res.status(200).end();
});

/**
 * @route   POST api/v1/auth/logout
 * @desc    Remove user's refresh token
 * @access  Public
*/
router.post('/logout', async (req: Request, res: Response): Promise<void> => {
    await logger.log({ type: 'info', message: 'Logged out successfully!', place: 'Logout route' });
    
    res.cookie('jid', '', { httpOnly: true });
    res.status(200).end();
});


export default router;