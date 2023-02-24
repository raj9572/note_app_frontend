import React, { useState } from 'react'
import noteContext from './noteContext'

const NoteState = (props) => {
    const host = process.env.REACT_APP_SERVER_BASE_URL
    const noteInitial = []
    const [note, setNote] = useState(noteInitial)
    const [profile, setProfile] = useState({ name: "raj", email: "rajali@gmail.com" })
    const [tostify, setTostify] = useState()
    const [topLoadingBar, setTopLoadingBar] = useState(0)

    // getUserDetails
    const getUserprofile = async () => {
        if (!localStorage.getItem("token")) {
            return
        }
        setTopLoadingBar(30)
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }
        })
        setTopLoadingBar(70)
        const json = await response.json()
        setProfile(json)
        setTopLoadingBar(100)
        //  setView(true)
    }

    // getAllNote 
    const getAllNote = async () => {
        setTopLoadingBar(20)
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                'content-type': "application/json",
                'auth-token': localStorage.getItem("token")
            }
        })
        setTopLoadingBar(50)
        const allNotes = await response.json()

        setNote(allNotes)
        setTopLoadingBar(100)

    }

    // Add a Note


    const addNote = async (title, description, tag) => {
        //Todo Api call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        })
        const addedNote = await response.json()

        setNote(note.concat(addedNote))

    }



    // Delete a Note
    const deleteNote = async (id) => {
        // todo delteNotes
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
        })
        await response.json()

        const newNotes = note.filter(element => element._id !== id)
        setNote(newNotes)
        

    }



    // Edit a Note'
    const editNote = async (id, title, description, tag) => {
        // todo ApiCall
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        })
        await response.json()

        const newNotes = note.map((element) => {
            if (element._id === id) {
                element.title = title
                element.description = description
                element.tag = tag
                return element
            }
            return element
        })

        setNote(newNotes)
    }

    const showTostify = (type, message) => {
        setTostify({
            type, message
        })
    }

    return (
        <noteContext.Provider value={{ topLoadingBar, tostify, showTostify, note, profile, setNote, addNote, deleteNote, editNote, getAllNote, getUserprofile }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState
