import { Router, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import validate from '../middlewares/validators/index';
import logger from '../utils/logger';
import { Token } from '../assets/enums';

const router: Router = Router();

/**
 * @route   POST api/v1/refresh-token
 * @desc    Get access token by providing valid refresh token
 * @access  Protected
*/
router.post('/', cookieParser(), validate.refreshToken, async (req: Request, res: Response): Promise<void> => {
    await logger.log({ type: 'info', message: 'Token refresh successfully!', place: 'Refresh token route' });

    const token: string = req.services.token.generateToken(Token.ACCESS, {
        id: req.context!.id!,
        username: req.context!.username!,
        email: req.context!.email!,
        ip: req.ip
    });

    res.status(200).json({ token });
});

export default router;