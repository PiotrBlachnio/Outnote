import { Schema, model, Model } from 'mongoose';
import { INote } from '../types/models';

const NoteSchema: Schema = new Schema({
    title: {
        type: String,
        default: 'Untitled'
    },
    content: {
        type: String,
        default: ''
    },
    categoryId: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Number,
        default: Date.now()
    },
    lastEditedAt: {
        type: Number,
        default: Date.now()
    },
    ownerId: {
        type: String,
        required: true
    },
    isPrivate: {
        type: Boolean,
        default: true
    }
});

const Note: Model<INote> = model('Note', NoteSchema);

export default Note;