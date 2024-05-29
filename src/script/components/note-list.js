class NoteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._notes = [];
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.addEventListener('delete-note', (event) => {
      this.removeNoteFromList(event.detail.id);
    });
  }

  set notes(value) {
    this._notes = Array.isArray(value) ? value : [];
    this.render();
  }

  get notes() {
    return this._notes;
  }

  render() {
    this.shadowRoot.innerHTML = '';

    if (!this._notes || this._notes.length === 0) {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            padding: 16px;
            background: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
          }
          .empty-message {
            text-align: center;
            color: #777;
            font-size: 1.2em;
          }
        </style>
        <div class="empty-message">No notes available.</div>
      `;
      return;
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 16px;
          background: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
        }
        .note-item {
          margin-bottom: 20px;
        }
      </style>
      <div class="note-list">
        ${this._notes.map(note => `
          <note-item 
            class="note-item"
            title="${this._sanitize(note.title)}" 
            body="${this._sanitize(note.body)}" 
            created-at="${this._sanitize(note.createdAt)}"
            id="${note.id}">
          </note-item>
        `).join('')}
      </div>
    `;
  }

  addNoteToList(note) {
    this._notes.push(note);
    this.render();
  }

  removeNoteFromList(id) {
    this._notes = this._notes.filter(note => note.id !== id);
    this.render();
    this.dispatchEvent(new CustomEvent('note-removed', {
      detail: { id }
    }));
  }

  _sanitize(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  }
}

customElements.define('note-list', NoteList);
