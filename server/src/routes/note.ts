import { Router, Request, Response } from 'express';
import logger from '../utils/logger';
import { Roles } from '../assets/enums';
import auth from '../middlewares/auth';

const router: Router = Router();

/**
 * @route   GET api/v1/note/:id
 * @desc    Get a single note by providing a valid id
 * @access  Protected
*/
router.get('/:id', auth(Roles.USER), async (req: Request, res: Response): Promise<void> => {
    try {

    } catch(error) {
        error.place = 'Get note by id route';
        next(error);
    };
});

export default router;