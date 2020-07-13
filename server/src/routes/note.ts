import { Router, Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { Roles } from '../assets/enums';
import auth from '../middlewares/auth';
import { INote, ICategory } from '../types/models';
import { NoteNotFoundError, IncorrectInputError, CategoryNotFoundError } from '../assets/errors';
import cookieParser from 'cookie-parser';
import validator from '../utils/validators';
import validate from '../middlewares/validators/index';

const router: Router = Router();

router.use(cookieParser());

/**
 * @route   GET api/v1/note/:id
 * @desc    Get a single note by providing a valid id
 * @access  Protected
*/
router.get('/:id', auth(Roles.USER), validate.note.getById, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await logger.log({ type: 'info', message: 'Note retrieved successfully!', place: 'Get note by id route' });
    res.status(200).json({ note: req.context?.note });
});

/**
 * @route   GET api/v1/note
 * @desc    Get all user's notes
 * @access  Protected
*/
router.get('/', auth(Roles.USER), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const notes: INote[] = await req.services.note.find({ ownerId: req.user!.id });

    await logger.log({ type: 'info', message: 'Notes retrieved successfully!', place: 'Get all notes route' });
    res.status(200).json({ notes });
});

/**
 * @route   POST api/v1/note
 * @desc    Create new note
 * @access  Protected
*/
router.post('/', auth(Roles.USER), validate.note.create, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await logger.log({ type: 'info', message: 'Note create successfully!', place: 'Create note route' });
    res.status(201).json({ note: req.context?.note });
});

/**
 * @route   DELETE api/v1/note/:id
 * @desc    Delete single note by providing valid id
 * @access  Protected
*/
router.delete('/:id', auth(Roles.USER), validate.note.delete, async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    await logger.log({ type: 'info', message: 'Note deleted successfully!', place: 'Delete note route' });
    req.eventEmitter.emit('DELETE_NOTE_SUCCESS', req.context?.id);

    res.status(200).end();
});

/**
 * @route   PATCH api/v1/note/:id
 * @desc    Update single note by providing valid id
 * @access  Protected
*/
router.patch('/:id', auth(Roles.USER), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { field, value } = req.body;

        if(!validator.validateInput({ field: field, [field]: value, id: req.params.id })) {
            throw new IncorrectInputError;
        };

        const note: INote | null = await req.services.note.findOne({ _id: req.params.id, ownerId: req.user!.id });

        if(!note) {
            throw new NoteNotFoundError();
        }

        await req.services.note.updateOne({ _id: note.id }, { [field]: value });
        await logger.log({ type: 'info', message: 'Note updated successfully!', place: 'Update note route' });
        
        res.status(200).end();
    } catch(error) {
        error.place = 'Update note route';
        next(error);
    };
});

export default router;