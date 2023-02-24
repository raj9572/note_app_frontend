import React, { useContext, useState } from 'react'
import noteContext from '../Context/noteContext'

const AddNote = () => {
    const { addNote,showTostify } = useContext(noteContext)
    const [note,setNote] = useState({title:"", description:"",tag:""})


    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }

    const handleClick = (e)=>{
        e.preventDefault()
        addNote(note.title,note.description,note.tag)
        setNote({title:"", description:"",tag:""})
        showTostify('success','addNotes successfully')
    }
  return (
    <div>
      <h2>Add a Notes</h2>
      <form className='mt-3' onSubmit={handleClick}>
        <div className="mb-1">
          <label htmlFor="title" className="form-label">title</label>
          <input type="text" value={note.title} onChange={onChange} minLength={5} required name="title" className="form-control" id="title" aria-describedby="emailHelp" />
        </div>
        <div className="mb-1">
          <label htmlFor="description" className="form-label">description</label>
          <input type="text" value={note.description} onChange={onChange} minLength={5} required name="description" className="form-control" id="description" aria-describedby="emailHelp" />
        </div>
        <div className="mb-1">
          <label htmlFor="tag" className="form-label">tag</label>
          <input type="text" value={note.tag} onChange={onChange} minLength={5} required name="tag" className="form-control" id="tag" aria-describedby="emailHelp" />
        </div>

        <button disabled={note.title.length < 5 || note.description.length < 5}  type="submit" className="btn btn-primary" onClick={handleClick} >Add Note</button>

      </form>
    </div>
  )
}

export default AddNote
