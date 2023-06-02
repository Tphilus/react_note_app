import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
// import { nanoid } from '../node_modules/nanoid/nanoid.js';
import NotesList from "./Components/NotesList";
import Search from "./Components/Search";
import Header from "./Components/Header";

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is my first, note!",
      date: "15/04/2021",
    },
    {
      id: nanoid(),
      text: "This is my second note!",
      date: "21/04/2021",
    },
    {
      id: nanoid(),
      text: "This is my third note!",
      date: "28/04/2021",
    },
    {
      id: nanoid(),
      text: "This is my new note!",
      date: "30/04/2021",
    },
  ]);

  // Search Section
  const [searchText, setSearchText] = useState("");

  // DarkMode Section
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saveNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));

    if (saveNotes) {
      setNotes(saveNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
  }, [notes]);

  // Add Notes Section
  const addNote = (text) => {
    // console.log(text);
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  // Delete Notes Section
  const deleteNote = (id) => {
    console.log(id);
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
};

export default App;
