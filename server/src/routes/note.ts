import { Router, Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { Roles } from '../assets/enums';
import auth from '../middlewares/auth';
import { INote } from '../types/models';
import { NoteNotFoundError } from '../assets/errors';

const router: Router = Router();

/**
 * @route   GET api/v1/note/:id
 * @desc    Get a single note by providing a valid id
 * @access  Protected
*/
router.get('/:id', auth(Roles.USER), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const note: INote | null = await req.services.note.findOne({ _id: req.params.id, ownerId: req.user!.id });

        if(!note) {
            throw new NoteNotFoundError();
        }

        await logger.log({ type: 'info', message: 'Note retrieved successfully!', place: 'Get note by id route' });
        res.status(200).json({ note });
    } catch(error) {
        error.place = 'Get note by id route';
        next(error);
    };
});

export default router;