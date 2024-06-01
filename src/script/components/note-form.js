class NoteForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div id="noteForm">
          <input type="text" id="noteTitle" placeholder="Enter note title" required>
          <textarea id="noteBody" placeholder="Enter note body" required></textarea>
          <button id="addNoteBtn">Add Note</button>
      </div>
    `;
  }

  addNote() {
    const title = this.querySelector('#noteTitle').value;
    const body = this.querySelector('#noteBody').value;

    if (title && body) {
      const newNote = {
        id: 'note-' + Date.now(),
        title: title,
        body: body,
        createdAt: new Date().toISOString(),
        archived: false,
      };

      const noteList = document.querySelector('note-list');

      if (noteList) {
        noteList.addNoteToList(newNote);

        this.querySelector('#noteTitle').value = '';
        this.querySelector('#noteBody').value = '';
      } else {
        console.error('note-list element not found');
      }
    } else {
      alert('Please enter both title and body for the note.');
    }
  }
}

customElements.define('note-form', NoteForm);
