class NoteForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div id="noteForm">
          <input type="text" id="noteTitle" placeholder="Enter note title" required>
          <textarea id="noteBody" placeholder="Enter note body" required></textarea>
          <button id="addNoteBtn">Add Note</button>
      </div>
    `;

    this.querySelector('#addNoteBtn').addEventListener('click', () => {
      this.addNote();
    });
  }

  addNote() {
    // Mendapatkan nilai dari input judul dan body catatan
    const title = this.querySelector('#noteTitle').value;
    const body = this.querySelector('#noteBody').value;

    // Memeriksa apakah judul dan body tidak kosong
    if (title && body) {
      // Membuat objek catatan baru
      const newNote = {
        id: 'note-' + Date.now(), // Menggunakan timestamp sebagai ID unik
        title: title,
        body: body,
        createdAt: new Date().toISOString(),
        archived: false,
      };

      // Mendapatkan elemen note-list
      const noteList = document.querySelector('note-list');

      // Menambahkan catatan baru ke dalam data catatan dan merender ulang daftar catatan
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