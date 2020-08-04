import { Router, Request, Response } from 'express';
import logger from '../utils/logger';
import { Roles } from '../assets/enums';
import auth from '../middlewares/auth';
import cookieParser from 'cookie-parser';
import validate from '../middlewares/validation/index';

const router: Router = Router();

router.use(cookieParser());

/**
 * @route   GET api/v1/note/:id
 * @desc    Get a single note by providing a valid id
 * @access  Protected
*/
router.get('/:id', auth(Roles.USER), validate.note.getById, async (req: Request, res: Response): Promise<void> => {
    await logger.log({ type: 'info', message: 'Note retrieved successfully!', place: 'Get note by id route' });
    res.status(200).json({ note: req.context?.note });
});

/**
 * @route   GET api/v1/note/public/:userId/:noteId
 * @desc    Get a note's data which must have a public access
 * @access  Public
*/
router.get('/public/:userId/:noteId', validate.note.getPublic, async (req: Request, res: Response): Promise<void> => {
    await logger.log({ type: 'info', message: 'Public note retrieved successfully!', place: 'Get public note route' });
    res.status(200).json({ note: req.context?.note });
});

/**
 * @route   GET api/v1/note
 * @desc    Get all notes in the specific category
 * @access  Protected
*/
router.get('/', auth(Roles.USER), validate.note.getAll, async (req: Request, res: Response): Promise<void> => {
    await logger.log({ type: 'info', message: 'Notes retrieved successfully!', place: 'Get all notes route' });
    res.status(200).json({ notes: req.context?.notes });
});

/**
 * @route   POST api/v1/note
 * @desc    Create new note
 * @access  Protected
*/
router.post('/', auth(Roles.USER), validate.note.create, async (req: Request, res: Response): Promise<void> => {
    await logger.log({ type: 'info', message: 'Note create successfully!', place: 'Create note route' });
    res.status(201).json({ note: req.context?.note });
});

/**
 * @route   DELETE api/v1/note/:id
 * @desc    Delete single note by providing valid id
 * @access  Protected
*/
router.delete('/:id', auth(Roles.USER), validate.note.delete, async (req: Request, res: Response): Promise<void> => {
    await logger.log({ type: 'info', message: 'Note deleted successfully!', place: 'Delete note route' });
    req.eventEmitter.emit('DELETE_NOTE_SUCCESS', req.context?.id);

    res.status(200).end();
});

/**
 * @route   PUT api/v1/note
 * @desc    Update multiple notes
 * @access  Protected
*/
router.put('/', auth(Roles.USER), validate.note.update, async (req: Request, res: Response): Promise<void> => {
    await logger.log({ type: 'info', message: 'Notes updated successfully!', place: 'Update notes route' });
    req.eventEmitter.emit('UPDATE_NOTES_SUCCESS', req.context?.updatedNotes);
    
    res.status(200).end();
});

export default router;