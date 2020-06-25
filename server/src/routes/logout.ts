import { Router, Request, Response } from 'express';
import logger from '../utils/logger';

const router: Router = Router();

/**
 * @route   POST api/v1/logout
 * @desc    Remove user's refresh token
 * @access  Public
*/
router.post('/', async (req: Request, res: Response): Promise<void> => {
    await logger.log({ type: 'info', message: 'Logged out successfully!', place: 'Logout route' });
    
    res.cookie('jid', '', { httpOnly: true });
    res.status(204);
});

export default router;