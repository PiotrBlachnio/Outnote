import NoteService from "../../services/note-service";

const defaultServices = {
    note: new NoteService
};

async function deleteNoteSuccessHandler(id: string, services: typeof defaultServices = defaultServices): Promise<void> {
    await services.note.deleteOne({ _id: id });
};

async function updateNotesSuccessHandler(updatedNotes: Record<string, Record<string, unknown>>, services: typeof defaultServices = defaultServices): Promise<void> {
    for(const [id, note] of Object.entries(updatedNotes)) {
        await services.note.updateOne({ _id: id }, note);
    }
};

export default {
    deleteNoteSuccessHandler,
    updateNotesSuccessHandler
};