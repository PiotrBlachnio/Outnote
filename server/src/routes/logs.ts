import { Router, Request, Response } from 'express';
import logger from '../utils/logger';

const router: Router = Router();

/**
 * @route   /logs
 * @desc    Return all server logs
 * @access  Public
*/
router.get('/', async (req: Request, res: Response): Promise<void> => {
    const logs: Record<string, unknown>[] = await logger.findLogs({});

    res.status(200).json(logs);
});

/**
 * @route   /logs
 * @desc    Delete all logs
 * @access  Public
*/
router.delete('/', async (req: Request, res: Response): Promise<void> => {
    await logger.removeLogs();

    res.status(200).end();
});

export default router;