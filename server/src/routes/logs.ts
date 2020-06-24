import { Router, Request, Response } from 'express';
import logger from '../utils/logger';

const router: Router = Router();

/**
 * @route   /logs
 * @desc    Return all server logs
 * @access  Public
*/
router.get('/', async (req: Request, res: Response): Promise<Response<any> | void> => {
    const logs: object[] = await logger.findLogs({});
    res.status(200).json(logs);
});

export default router;