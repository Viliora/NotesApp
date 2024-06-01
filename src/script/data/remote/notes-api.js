function notesApi() {
  const BASE_URL = "https://notes-api.dicoding.dev/v2";

  const renderAllNotes = (notes) => {
    const noteListContainerElement = document.querySelector("#notesListContainer");
    noteListContainerElement.innerHTML = "";
    const noteListElement = document.createElement('note-list');
    noteListElement.notes = notes;
    noteListContainerElement.appendChild(noteListElement);
    noteListElement.addEventListener('note-removed', (event) => {
        console.log('Note removed event:', event.detail.id);
        removeNote(event.detail.id);
    });
    
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

 document.querySelector("#addNoteBtn").addEventListener("click", function () {
    const titleElement = document.querySelector("#noteTitle");
    const bodyElement = document.querySelector("#noteBody");
    if (titleElement.value=='' || bodyElement.value=='') {
        console.error('Title or body element not found');
        return;
    }
    console.log(titleElement.value)
    const note = {
        title: titleElement.value,
        body: bodyElement.value
    };
    insertNote(note)
    });
  return {
    getNote,
    insertNote,
    removeNote,
  };
}

export default notesApi;
