import React, { useState } from 'react';
import NoteContext from './noteContext';

function NoteState(props) {
  const host = 'http://localhost:5000';
  const initNote = [];
  const total_notes = 0;

  const [total, setTotal] = useState(total_notes)
  const [notes, setNote] = useState(initNote)
  const [alertMsg, setalertMsg] = useState(null);
  const [alertType, setalertType] = useState(null);

  // Fetch all notes
  async function fetchNotes() {
    // Api call
    const url = `${host}/api/notes/fetchnotes`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })

    const json = await response.json()
    setNote(json.notes)
    setTotal(json.total_notes)
  }


  // Add new notes
  async function addNote(title, description, tag) {
    try {
      // Api call
      const url = `${host}/api/notes/addnotes`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      })
      const json = await response.json();
      if (response.status === 200) {
        console.log(json)
        const note = {
          "_id": json.saved_note._id,
          "user": "67727fe0a50ce677de1c0c16",
          "title": title,
          "description": description,
          "tag": json.saved_note.tag,
          "time": json.saved_note.time,
          "__v": 0
        }
        setNote(notes.concat(note))
        setTotal(notes.length + 1)
        setalertMsg("Your note has been successfully created");
        setalertType("success");
        console.log(alertMsg);
      }
      else if (response.status === 400) {
        setalertMsg(json.errors[0].msg);
        setalertType("warning");
        console.log(alertMsg);
      }
      else {
        setalertMsg("You are not eligible to do that.");
        setalertType("danger");
      }


    } catch (error) {
      setalertMsg("Internal server down! Please try again later...")
      setalertType("primary")
    }


  }


  // Delete notes
  async function deleteNote(id) {
    try {
      const url = `${host}/api/notes/deletenote/${id}`
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      })

      const json = await response.json()
      console.log(json)

      const newNotes = notes.filter((note) => {
        return note._id !== id
      })

      setNote(newNotes)
      setTotal(notes.length - 1)
      setalertMsg("Deleted Successfully!!")
      setalertType("success")
      console.log(alertMsg)

    } catch (error) {
      setalertMsg("Server Down... try again later.")
      setalertType("primary")
    }

  }

  // Update notes
  async function editNote(id, title, description, tag) {
    try {
      // Api call
      const url = `${host}/api/notes/updatenote/${id}`
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      })
      const json = await response.json();

      if (response.status === 200) {
        // Logic to update
        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if (element._id === id) {
            notes[index].title = title;
            notes[index].description = description;
            notes[index].tag = tag;
            console.log(notes[index]);
            break;
          }
        }
        // console.log(notes);
        setNote(notes);
        fetchNotes()
        setalertMsg("Updated Successfully.")
        setalertType("success")
        // console.log(notes);
      }

      else if (response.status === 400) {
        setalertMsg(json.errors[0].msg);
        setalertType("warning")
      }
    } catch (error) {
      // console.log(error)
    }


  }


  return (
    <NoteContext.Provider value={{ notes, total, alertMsg, alertType, fetchNotes, addNote, deleteNote, editNote }}>
      {props.children};
    </NoteContext.Provider>
  )
}

export default NoteState;