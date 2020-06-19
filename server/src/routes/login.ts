import { Router, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import validate from '../middlewares/validators/index';
import logger from '../utils/logger';
import { Token } from '../assets/enums';

const router: Router = Router();

/**
 * @route   POST api/v1/login
 * @desc    Auth user
 * @access  Public
*/
router.post('/', cookieParser(), validate.login, async (req: Request, res: Response): Promise<void> => {
    await logger.log({ type: 'info', message: 'Logged in successfully!', place: 'Login route' });
    req.eventEmitter.emit('LOGIN_SUCCESS', req.context!.banId);
    
    const refreshToken: string =  req.services.token.generateToken(Token.REFRESH, {
        id: req.context!.id!,
        ip: req.ip
    });

    const accessToken: string = req.services.token.generateToken(Token.ACCESS, {
        id: req.context!.id!,
        username: req.context!.username!,
        email: req.context!.email!,
        ip: req.ip
    });

    res.cookie('jid', refreshToken, { httpOnly: true });

    res.status(200).json({
        id: req.context!.id!,
        token: accessToken
    });
});

export default router;