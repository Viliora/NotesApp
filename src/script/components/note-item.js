class NoteItem extends HTMLElement {
  _shadowRoot = null;
  // _style = null;
  // _note = {
  //       idNote: null,
  //       title: null,
  //       body: null,
  //       createdAt: null,
  //       archived: null,
  //     }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    // this._style = document.createElement('style');
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
}
  connectedCallback() {
    const title = this.getAttribute('title') || 'No Title';
    const body = this.getAttribute('body') || 'No Body';
    const createdAt = this.getAttribute('created-at') || 'No Date';

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
      </style>
      <div class="note-item">
        <h3>${title}</h3>
        <p>${body}</p>
        <small>${createdAt}</small>
      </div>
    `;
  }
}

customElements.define('note-item', NoteItem);