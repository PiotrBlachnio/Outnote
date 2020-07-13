import NoteService from "../../services/note-service";

const defaultServices = {
    note: new NoteService
};

export default async (noteId: string, updatedData: Record<string, unknown>, services: typeof defaultServices = defaultServices): Promise<void> => {
    await services.note.updateOne({ _id: noteId }, updatedData);
};