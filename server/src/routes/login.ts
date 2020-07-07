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
    
    const accessToken: string = req.services.token.generateToken(Token.ACCESS, {
        id: req.context!.id!,
        username: req.context!.username!,
        email: req.context!.email!,
        ip: req.ip
    });

    res.cookie('jid', accessToken, { httpOnly: true });

    res.status(200).end();
});

export default router;