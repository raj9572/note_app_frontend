import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../Context/noteContext'

const Profile = () => {
    let navigator = useNavigate()
    const {profile,getUserprofile} = useContext(noteContext)
    useEffect(()=>{
        if(localStorage.getItem("token")){
            getUserprofile()
        }
        else{
            navigator("/login")
        }
        // eslint-disable-next-line 
    },[])

  return (
    
           <div className="container">
        <div className="card text-white bg-primary mb-3" style={{maxWidth: "22rem"}}>
        <div className="card-header">Your Details</div>
        <div className="card-body">
            <h5 className="card-title">Your name:{profile.name} </h5>
            <p className="card-text">Your Email:{profile.email}</p>
        </div>
         </div>
      </div>
  )
}

export default Profile
