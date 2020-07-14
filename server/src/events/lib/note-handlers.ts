import NoteService from "../../services/note-service";

const defaultServices = {
    note: new NoteService
};

async function deleteNoteSuccessHandler(id: string, services: typeof defaultServices = defaultServices): Promise<void> {
    await services.note.deleteOne({ id });
};

async function updateNoteSuccessHandler(id: string, updatedData: Record<string, unknown>, services: typeof defaultServices = defaultServices): Promise<void> {
    await services.note.updateOne({ id }, updatedData);
};

export default {
    deleteNoteSuccessHandler,
    updateNoteSuccessHandler
};