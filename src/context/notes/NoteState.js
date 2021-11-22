import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {

  const host = "http://localhost:5000";
  const notesinitial = [];
  const [notes, setNotes] = useState(notesinitial);

  // fetch nots
  const fetchNote = async () => {
    // Api Work
    const response = await fetch(`${host}/api/notes/readnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setNotes(json);
  };


  // add note
  const addNote = async (title, desc, tag) => {

    // Api Work
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, desc, tag}), // body data type must match "Content-Type" header
    });
    const note = await response.json();

    setNotes(notes.concat(note));
  };


  // update note
  const updateNote = async (id, title, desc, tag) => {

    //Api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, desc, tag}), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    let newNotes = JSON.parse(JSON.stringify(notes))

    // logic
    // fist we will traverse all the nodes and find node with same id and then perform updation
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].desc = desc;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };


  // delete note
  const deleteNote = async (id) => {

    // Api Work
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();

    // Logic
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, fetchNote, addNote, updateNote, deleteNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
