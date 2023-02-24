import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const {showAlert} = props
    const host="http://localhost:8000"
    let navigator = useNavigate()
    const [error,setError] = useState('')
    const [credential, setCredential] = useState({name:'',email:'',password:'',cnfpassword:''})

    const onChange = (e)=>{
        setCredential({...credential,[e.target.name]:e.target.value})
    }
    const handleSubmit = async(e)=>{
            e.preventDefault();
            const response = await fetch(`${host}/api/auth/createuser`,{
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkMjM4YzEyYzhlOTE1MzZhMTQ2ZWRhIn0sImlhdCI6MTY3NDcyMTQ4M30.tO5wPIOlrGYj7yOI4jlc-erggE2y2rw--PmwtOo9MlI'
                },
                body: JSON.stringify(credential)
                })
            
            const json = await response.json()

            if(json.success){
                // redirect to login page
                localStorage.setItem("token",json.token)
                navigator('/login')
                showAlert('success',' Accrount created successfully ')
            }else{
                setError(json.error)
                showAlert('danger','Invalid Credential')
            }
            

    }

  return (
    <div className='container'>
        <h2>Create an account to use inotebook5</h2>
      <form className='d-flex flex-column' onSubmit={handleSubmit}>
        <div className="mb-1 w-25">
            <label htmlFor="name" className="form-label">username</label>
            <input type="text" onChange={onChange} name='name' className="form-control" id="name" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-1 w-25">
            <label htmlFor="email" className="form-label">email</label>
            <input type="email" onChange={onChange} name='email' className="form-control" id="email" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-1 w-25">
            <label htmlFor="text" className="form-label">password</label>
            <input type="texpasswordt" onChange={onChange} name='password' className="form-control" id="password" aria-describedby="emailHelp" minLength={5} required/>
        </div>
        <div className="mb-1 w-25">
            <label htmlFor="cnfpassword" className="form-label">conform password</label>
            <input type="text" onChange={onChange} name='cnfpassword' className="form-control" id="cnfpassword" aria-describedby="emailHelp" minLength={5} required/>
        </div>
        <p style={{color:'red', fontSize:'15px'}}>{error}</p>
        
        <button type="submit" className="btn btn-primary w-25">Submit</button>
    </form>
    </div>
  )
}

export default Signup
