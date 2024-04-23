import Utils from '../utils.js';
import NotesApi from '../data/notes-api.js';

const home = () => {
  const noteListElement = document.querySelector('#noteList');
  const noteLoadingElement = document.querySelector('loading-indicator');
  const noteListContainerElement = document.querySelector('ul');

  const showNote = () => {
    showLoading();

    NotesApi.getNotes()
    .then((result) => {
        displayResult(result.data);
        showNoteList();
    })
    .catch((error) => {
      displayError(error);
    });
  };

  showNote();

  const displayResult = (notes) => {
    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement('note-item');
      noteItemElement.note = note;

      const noteDeleteElement = document.createElement('button');
      noteDeleteElement.textContent = 'Delete';
      noteDeleteElement.addEventListener('click', () => deleteNoteHandler(note.id));

      noteItemElement.appendChild(noteDeleteElement);

      return noteItemElement;
    });

    noteListElement.innerHTML = '';
    noteListElement.append(...noteItemElements);
  };

  const noteList = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
        Utils.hideElement(element);
    });
    Utils.showElement(noteListElement);
  };

  noteList();

  const showLoading = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
        Utils.hideElement(element);
    });
    Utils.showElement(noteLoadingElement);
  };
};

export default home;