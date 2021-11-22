import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import noteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, fetchNote, updateNote } = context;
  const history = useHistory();

  const [text, setText] = useState({id: "", etitle: "", edesc: "", etag: ""});

  const handleSubmit = async(e) =>{
    e.preventDefault();
    updateNote(text.id, text.etitle, text.edesc, text.etag);
    refClose.current.click();
  }

  const progressText = async(e) =>{
    setText({...text, [e.target.name]: e.target.value})
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      fetchNote();
    }else{
      history.push('/login');
    }
  }, []);

  const updateNotea = (currentNote) => {
    ref.current.click();
    setText({id: currentNote._id, etitle:currentNote.title, edesc:currentNote.desc, etag:currentNote.tag});
  }

  const ref = useRef(null);
  const refClose = useRef(null);

  return (
    <>
      <AddNote />
      <button
        type="button"
        className="btn btn-primary d-none"
        ref={ref}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label" >
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={progressText}
                    value = {text.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edesc" className="form-label" >
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="edesc"
                    id="edesc"
                    onChange={progressText}
                    value = {text.edesc}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="etag"
                    id="etag"
                    onChange={progressText}
                    value = {text.etag}
                  />
                </div>
                {/* <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Add Note
                </button> */}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your Notes</h1>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} note={note} updateNotea={updateNotea} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
