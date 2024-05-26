const BASE_URL = 'https://notes-api.dicoding.dev/v2';

class NotesApi {
  static async getAllNotes() {
    try {
      const response = await fetch(`${BASE_URL}/notes`);
      if (response.status >= 200 && response.status < 300) {
        const responseJson = await response.json();
        const { data: { notes } } = responseJson;
        return notes;
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async addNote(note) {
    try {
      const response = await fetch(`${BASE_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      });
      if (response.status >= 200 && response.status < 300) {
        const responseJson = await response.json();
        const { message, data: { note } } = responseJson;
        return { message, note };
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async deleteNoteById(noteId) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
        method: 'DELETE',
      });
      if (response.status >= 200 && response.status < 300) {
        const responseJson = await response.json();
        const { message } = responseJson;
        return { message };
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default NotesApi;
