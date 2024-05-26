function notesApi() {
  const BASE_URL = "https://notes-api.dicoding.dev/v2";

  const getNote = () => {
    fetch(`${BASE_URL}/notes`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((responseJson) => {
        renderAllNotes(responseJson.data.notes);
      })
      .catch((error) => {
        showResponseMessage(error.message);
      });
  };

  const insertNote = (note) => {
    fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((responseJson) => {
        showResponseMessage(responseJson.message);
        getNote();
      })
      .catch((error) => {
        showResponseMessage(error.message);
      });
  };

  const updateNote = (note) => {
    fetch(`${BASE_URL}/edit/${note.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((responseJson) => {
        showResponseMessage(responseJson.message);
        getNote();
      })
      .catch((error) => {
        showResponseMessage(error.message);
      });
  };

  const removeNote = (noteId) => {
    fetch(`${BASE_URL}/notes/${noteId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((responseJson) => {
        showResponseMessage(responseJson.message);
        getNote();
      })
      .catch((error) => {
        showResponseMessage(error.message);
      });
  };

  const showResponseMessage = (message = "Check your internet connection") => {
    alert(message);
  };

  return {
    getNote,
    insertNote,
    updateNote,
    removeNote,
  };
}

export default notesApi;
