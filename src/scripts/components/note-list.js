import Utils from '../utils.js';
import NotesApi from '../data/notes-api.js';

class NoteListComponent extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _notes = [];
 
  _column = 1;
  _gutter = 16;

  static get observedAttributes() {
    return ['column', 'gutter'];
  }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }
    _updateStyle() {
    this._style.textContent = `
                #noteList {
                    margin-top: 20px;
                    grid-tempalate-columns: ${'1fr '.repeat(this.column)};

                    gap: ${this.gutter}px;
                }

                .note {
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    padding: 10px;
                    margin-bottom: 10px;
                }
        `;
  }

  set column(value) {
    const newValue = Number(value);
    if (!Utils.isValidInteger(newValue)) return;

    this._column = value;
  }

  get column() {
    return this._column;
  }

  set gutter(value) {
    const newValue = Number(value);
    if (!Utils.isValidInteger(newValue)) return;

    this._gutter = value;
  }

  get gutter() {
    return this._gutter;
  }

  render() {
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML = `
        <div id="noteList"></div>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'column':
        this.column = newValue;
        break;
      case 'gutter':
        this.gutter = newValue;
        break;
    }

    this.render();
  }

  connectedCallback() {
    NotesApi.getNotes()
      .then(data => {
        this.notes = data.data;
      })
      .catch(error => {
        console.error('Error retrieving notes:', error);
      });

    this.render();
  }

  displayNotes() {
    const noteListElement = this._shadowRoot.querySelector('#noteList');
    noteListElement.innerHTML = '';

    this._notes.forEach((note) => {
        const noteItem = document.createElement('div');
        noteItem.classList.add('note');
        
        const noteItemElement = document.createElement('note-item');
        noteItemElement.note = note.data;
        
        noteItem.appendChild(noteItemElement);
    
        noteListElement.appendChild(noteItem);

        noteListElement.appendChild(noteItem);
    });
  }

  set notes(notes) {
    this._notes = notes || [];
    this.displayNotes();
  }
  
};

customElements.define("note-list-component", NoteListComponent);
