import { Router, Request, Response } from 'express';
import logger from '../utils/logger';
import { Token, Roles } from '../assets/enums';
import auth from '../middlewares/auth';

const router: Router = Router();

/**
 * @route   PATCH api/v1/user/avatar
 * @desc    Update user's avatar
 * @access  Protected
*/
router.patch('/', auth(Roles.USER), async (req: Request, res: Response): Promise<void> => {
    await logger.log({ type: 'info', message: 'Avatar updated successfully!', place: 'Update avatar route' });
    
    res.status(200).end();
});

export default router;