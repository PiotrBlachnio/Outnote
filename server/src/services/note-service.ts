import Note from '../models/Note';
import mongoose from 'mongoose';
import { INote } from '../types/models';

class NoteService {
    public async find(data: Record<string, unknown>): Promise<INote[]> {
        try {
            const notes: INote[] = await Note.find(data);
            return notes;
        } catch(error) {
            throw error;
        };
    };

    public async findOne(data: Record<string, unknown>): Promise<INote | null> {
        try {
            const note: INote | null = await Note.findOne(data);
            return note;
        } catch(error) {
            if(error.name === 'CastError') return null;

            throw error;
        };
    };

    public async findById(id: string): Promise<INote | null> {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        };

        const note: INote | null = await Note.findById(id);
        return note;
    };

    public async updateOne(searchData: Record<string, unknown>, updateData: Record<string, unknown>): Promise<void> {
        if('content' in updateData) updateData = { ...updateData, lastEditedAt: Date.now() };
        
        await Note.updateOne(searchData, updateData);
    };

    public async create(data: Record<string, unknown>): Promise<INote> {
        const note: INote = new Note(data);
        await note.save();

        return note;
    };

    public async deleteOne(searchData: Record<string, unknown>): Promise<void> {
        await Note.deleteOne(searchData);
    };
};

export default NoteService;