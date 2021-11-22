import React, {useContext, useState} from "react";
import noteContext from "../context/notes/NoteContext";

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [text, setText] = useState({title: "", desc: "", tag: "personal"});

    const handleSubmit = async(e) =>{
      e.preventDefault();
      addNote(text.title, text.desc, text.tag)
    }

    const progressText = async(e) =>{
      setText({...text, [e.target.name]: e.target.value})
    }

  return (
    <div>
        <h1>Add a note</h1>
        <div className="container">
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name = "title"
                aria-describedby="emailHelp"
                onChange={progressText}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="desc" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                name = "desc"
                id="desc"
                onChange={progressText}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <input
                type="text"
                className="form-control"
                name = "tag"
                id="tag"
                onChange={progressText}
              />
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Add Note
            </button>
          </form>
        </div>
    </div>
  );
};

export default AddNote;
