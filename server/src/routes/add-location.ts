import { Router, Request, Response } from 'express';
import validate from '../middlewares/validation/index';
import logger from '../utils/logger';

const router: Router = Router();

/**
 * @route   POST api/v1/add-location
 * @desc    Add new location to user's trusted locations
 * @access  Protected
 */
router.post('/', validate.addLocation, async (req: Request, res: Response): Promise<void> => {
    await logger.log({ type: 'info', message: 'Location has been added successfully!', place: 'Add location route' });

    req.eventEmitter.emit('ADD_LOCATION_SUCCESS', {
        userId: req.context!.id,
        ip: req.ip
    });

    res.status(200).end();
});

export default router;