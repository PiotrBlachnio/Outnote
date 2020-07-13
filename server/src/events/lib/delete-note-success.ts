import NoteService from "../../services/note-service";

const defaultServices = {
    note: new NoteService
};

export default async (noteId: string, services: typeof defaultServices = defaultServices): Promise<void> => {
    await services.note.deleteOne({ _id: noteId });
};