import { useContext, useState } from "react"
import noteContext from '../contexts/noteContext';


function NoteItem(props) {
    const { note, updateNote } = props
    const context = useContext(noteContext);
    const {deleteNote} = context;
    function dropNote() {
        deleteNote(note._id)
    }
    function editNote() {
        updateNote(note)
    }
    return (
        <div>
            <div className="container mt-10">
                <div className="card mx-10">
                    <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h5>{note.title}</h5>
                        <div style={{ display: 'flex' }}>
                            <i className="ri-file-edit-fill" style={{ fontSize: 25, color: '#004ef4', cursor:'pointer' }}
                            onClick={editNote}></i>
                            <i className="ri-close-circle-fill" style={{ fontSize: 25, color: '#f41e00', cursor: 'pointer' }}
                            onClick={dropNote}></i>
                        </div>

                    </div>
                    <div className="card-body">
                        <p className="card-text">{note.description}</p>
                    </div>
                    <div className="card-footer text-body-secondary">
                        Created on: {note.time.split("T")[0]}, {note.time.split("T")[1].split(".")[0].slice(0,5)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem