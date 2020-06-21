import { Router, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import validate from '../middlewares/validators/index';
import logger from '../utils/logger';

const router: Router = Router();

/**
 * @route   POST api/v1/register
 * @desc    Register new user
 * @access  Public
 */
router.post('/', cookieParser(), validate.register, async (req: Request, res: Response): Promise<void> => {
    await logger.log({ type: 'info', message: 'Registered successfully!', place: 'Register route' });
    
    req.eventEmitter.emit('REGISTER_SUCCESS', {
        username: req.context!.username!,
        email: req.context!.email!,
        password: req.context!.password!,
        ip: req.ip
    });

    res.status(201);
});

export default router;