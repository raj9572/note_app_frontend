import React, { useContext } from 'react'
import noteContext from '../Context/noteContext'

const NoteItem = (props) => {
    const {deleteNote,showTostify} = useContext(noteContext)
    const {note,updateNote} = props

    const handleDelete = (_id)=>{
        deleteNote(_id)
        showTostify('success','note is deleted successfully')
    }
    
  return (
    <div className="col-md-3">

    <div className="card my-2" style={{width: "18rem"}}>
        <div className="card-body">
            <div className="d-flex align-items-center justify-content-end">
            <i className="fa-solid fa-trash mx-2" onClick={()=>handleDelete(note._id)}></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=> updateNote(note)}></i>
            </div>
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            
        </div>
    </div>

    </div>
  )
}

export default NoteItem
