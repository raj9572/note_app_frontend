import React,{useContext, useEffect,useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../Context/noteContext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'

const Notes = (props) => {
    let navigator=useNavigate()
  const {showAlert} = props
  const { note,getAllNote,editNote } = useContext(noteContext)
  const ref = useRef(null)
  const [input,setInput] = useState({_id:"",title:"", description:"",tag:"default"})

  useEffect(()=>{
    if(localStorage.getItem('token')){
        getAllNote()
    }
    else{
        navigator('/login')
    }
     // eslint-disable-next-line
  },[])

  const updateNote = (currentNote)=>{
    ref.current.click()
   setInput(currentNote)
   


  }

  const onChange=(e)=>{
    setInput({...input,[e.target.name]:e.target.value})
  }

  const handleClick = ()=>{
    editNote(input._id,input.title,input.description,input.tag)
    ref.current.click()
    showAlert("success",'successfully Updated')
  }
  return (
    <>
    <AddNote/>

    <button  ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
    </button>

    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">

            <form className='mt-3'>
            <div className="mb-1">
            <label htmlFor="title" className="form-label">title</label>
            <input type="text" value={input.title} onChange={onChange} name="title" minLength={5} required className="form-control" id="title" aria-describedby="emailHelp" />
            </div>
            <div className="mb-1">5
            <label htmlFor="description" className="form-label">description</label>
            <input type="text" value={input.description} onChange={onChange} name="description" minLength={5} required className="form-control" id="description" aria-describedby="emailHelp" />
            </div>
            <div className="mb-1">
            <label htmlFor="tag" className="form-label">tag</label>
            <input type="text" value={input.tag} onChange={onChange} name="tag" minLength={5} required className="form-control" id="tag" aria-describedby="emailHelp" />
            </div>

        </form>

        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button"  className="btn btn-primary" onClick={handleClick}>update Note </button>
        </div>
        </div>
    </div>
    </div>




     <div className="  row my-3">
        <h3>Your Notes</h3>
        {note.length === 0 && 'No notes to display'}
        {note.map(element => <NoteItem updateNote = {updateNote} key={element._id} note = {element}/>)}
      </div>
      </>
  )
}

export default Notes
