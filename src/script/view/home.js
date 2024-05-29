import Utils from "../utils";
import NotesApi from "../data/remote/notes-api.js";

const showLoader = () => {
    const loader = document.querySelector(".loader");
    if (loader) {
        loader.classList.remove("loader--hidden");
        Utils.showElement(loader);
    }
};

const hideLoader = () => {
    const loader = document.querySelector(".loader");
    if (loader) {
        loader.classList.add("loader--hidden");
    }
};

const home = () => {
    const getNote = async () => {
        showLoader();
        try {
            const notes = await NotesApi.getAllNotes();
            hideLoader();
            renderAllNote(notes);
        } catch (error) {
            hideLoader();
            showResponseMessage(error.message);
        }
    };

    const insertNote = async (note) => {
        showLoader();
        try {
            const response = await NotesApi.addNote(note);
            hideLoader();
            showResponseMessage(response.message);
            getNote();
        } catch (error) {
            hideLoader();
            showResponseMessage(error.message);
        }
    };

    const removeNote = async (noteId) => {
        showLoader();
        try {
            const response = await NotesApi.deleteNoteById(noteId);
            hideLoader();
            showResponseMessage(response.message);
            getNote();
        } catch (error) {
            hideLoader();
            showResponseMessage(error.message);
        }
    };

    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };

    const renderAllNote = (notes) => {
        const noteListContainerElement = document.querySelector("#notesListContainer");
        noteListContainerElement.innerHTML = "";

        const noteListElement = document.createElement('note-list');
        noteListElement.notes = notes;
        noteListContainerElement.appendChild(noteListElement);

        noteListElement.addEventListener('note-removed', (event) => {
            removeNote(event.detail.id);
        });
    };

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelector("#addNoteBtn").addEventListener("click", function () {
            const note = {
                title: document.querySelector("#noteTitle").value,
                body: document.querySelector("#noteBody").value,
            };
            insertNote(note);
        });

        getNote();
    });

    const form = document.querySelector(".notes-form");
    const titleInput = form.elements.noteTitle;
    const descInput = form.elements.noteDesc;

    form.addEventListener("submit", (e) => e.preventDefault());

    titleInput.addEventListener("invalid", (e) => {
        e.target.setCustomValidity("");

        if (!e.target.validity.valid) {
            e.target.setCustomValidity("Wajib diisi.");
        }
    });

    descInput.addEventListener("invalid", (e) => {
        e.target.setCustomValidity("");

        if (!e.target.validity.valid) {
            e.target.setCustomValidity("Wajib diisi.");
        }
    });
};

export default home;
