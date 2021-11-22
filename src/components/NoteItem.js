import React, {useContext} from "react";
import noteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext)
  const { deleteNote } = context;
  const { note, updateNotea } = props;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.desc}</p>
          {/* <a href="#" className="btn btn-primary">
            Go To Note
          </a> */}
          <i className="far fa-trash-alt mx-2" onClick={()=>deleteNote(note._id)}></i>
          <i className="far fa-edit mx-2" onClick={()=>updateNotea(note)}></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
