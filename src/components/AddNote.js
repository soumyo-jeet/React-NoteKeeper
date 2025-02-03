import { useContext, useState } from "react"
import noteContext from '../contexts/noteContext';


function AddNote() {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setnote] = useState({title: "", description: "", tag: ""})

    

    function onClick() {
        addNote(note.title, note.description, note.tag);
        setnote({title: "", description: "", tag: ""});
       
    }
    function onChange(e) {
        setnote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <div className="container">
                <h3>Import New Note</h3>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" id="exampleFormControlInput1" placeholder="Title..." onChange={onChange} value={note.title}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Tag</label>
                    <input type="text" className="form-control" name="tag" id="exampleFormControlInput1" placeholder="General" onChange={onChange}  value={note.tag}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleformControlTextarea1" className="form-label">Description</label>
                    <textarea className="form-control" name="description" id="exampleformControlTextarea1" rows="3" placeholder="Write your note here..." onChange={onChange} value={note.description}></textarea>
                </div>
                <button type="button" className="btn btn-success" onClick={onClick}>Create</button>
            </div>
        </div>
    )
}

export default AddNote