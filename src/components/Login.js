import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../Context/noteContext'

const Login = (props) => {
    const host=process.env.REACT_APP_SERVER_BASE_URL
    const { showTostify } = useContext(noteContext)
    const { showAlert } = props
    let navigator = useNavigate()
    const [error, setError] = useState('')
    const [credential, setCredential] = useState({ email: '', password: '' })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(credential)
        })
        const json = await res.json()
        if (json.success) {
            // redirect
            localStorage.setItem("token", json.token)
            navigator('/')
            showAlert('success', 'Login is successfully')
            showTostify('success', 'Login is successfully')

        } else {
            showTostify('error', json.error)
            setError(json.error)
            showAlert('danger', 'Invalid Credential')
        }

    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="my-3">
                <h2>Login to countinue to inotebook5</h2>
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" onChange={onChange} className="form-control w-75" name='email' id="email" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="text" onChange={onChange} className="form-control w-75" name='password' id="password" />
            </div>
            <p style={{ color: 'red', fontSize: '15px' }}>{error}</p>

            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    )
}

export default Login
