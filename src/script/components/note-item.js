class NoteItem extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this._shadowRoot.querySelector('.button-delete').addEventListener('click', () => {
      const id = this.getAttribute('id');
      const event = new CustomEvent('delete-note', {
        bubbles: true,
        composed: true,
        detail: { id: id }
      });
      this.dispatchEvent(event);
    });
  }

  render() {
    const title = this.getAttribute('title');
    const body = this.getAttribute('body');
    const createdAt = this.getAttribute('created-at');

    this._shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: #fff;
          color: #333;
          border-radius: 8px;
          box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
          padding: 16px;
          margin-bottom: 20px;
        }
        h3 {
          font-size: 1.5em;
          margin-bottom: 10px;
        }
        p {
          font-size: 1em;
          margin-bottom: 10px;
        }
        small {
          font-size: 0.8em;
          color: #777;
        }
        button {
          background: linear-gradient(#e8dfca, #4f6f52);
          color: white;
          border: none;
          padding: 10px;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover{
          background: #e74c3c;
        }
        
      </style>
      <div class="note-item">
        <h3>${title}</h3>
        <p>${body}</p>
        <small>${createdAt}</small>
        <button type="button" class="button-delete">Delete</button>
      </div>
    `;
  }
}

customElements.define('note-item', NoteItem);
