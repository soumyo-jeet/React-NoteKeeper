import { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../contexts/noteContext';
import NoteItem from './NoteItem';
import Alert from './Alert';
import AddNote from './AddNote';
import { useNavigate } from 'react-router';
import UserContext from '../contexts/UserContext';

function Notes() {
  // Using the context of all notes
  const context = useContext(noteContext);
  const contextU = useContext(UserContext);
  const { notes, total, alertMsg, alertType, fetchNotes, editNote } = context;
  const { fetchUser, user } =contextU;
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){
      fetchNotes()
      fetchUser()
    }
    else{
      navigate("/Login")
    }
  }, [])

  // Alert setting
  const [alert, setAlert] = useState({alertmsg: alertMsg, type: alertType});
  const timeoutRef = useRef(null); 
  const showAlert = (msg,type) => {
    setAlert({
      alertmsg: msg,
      type : type
    });

  }

  useEffect(() => {
    if (alertMsg) {
      showAlert(alertMsg, alertType);
    }
    // Clear previous timeout if it exists
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Set a new timeout to clear the alert after 1.5 seconds
    timeoutRef.current = setTimeout(() => {
      setAlert({alertmsg: null, type: null}); // Reset alert after 1.5 seconds
    }, 1500);
  }, [alertMsg]);

 
  // Update note modal setting
  const ref = useRef(null);

  const [note, setnote] = useState({ _id: "", etitle: "", edescription: "", etag: "" });

  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({ _id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  }

  function onClick() {
    editNote(note._id, note.etitle, note.edescription, note.etag);
    showAlert(alertMsg)
    // console.log(note._id, note.etitle, note.edescription, note.etag);
  }

  function onChange(e) {
    setnote({ ...note, [e.target.name]: e.target.value })
  }



  return (
    <div>
      <div className="container">
        <Alert alert={alert} />
        <div className="container" style={{ padding: 10, marginTop: 10 }}>
          <h1>Welcome, {user}.</h1>
        </div>
        <AddNote showAlert={showAlert} />
      </div>

      <div className="container my-45">
        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>



        {/* Update Modal */}
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Update Your Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                    <input type="text" className="form-control" name="etitle" id="exampleFormControlInput1" placeholder="Title..." value={note.etitle} onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Tag</label>
                    <input type="text" className="form-control" name="etag" id="exampleFormControlInput1" value={note.etag} onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleformControlTextarea1" className="form-label">Description</label>
                    <textarea className="form-control" name="edescription" id="exampleformControlTextarea1" rows="3" value={note.edescription} onChange={onChange}></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={onClick}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
        <h3>Your Notes</h3>
        <div className="container align-item-centre">
          <p>{total} notes you have.</p>
        </div>

        {/* looping through all notes of of the user and creating its noteitem component to display */}
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </div>
  )
}

export default Notes