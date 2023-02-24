import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import noteContext from '../Context/noteContext'

const Navbar = () => {
  const {getUserprofile} = useContext(noteContext)
  let navigator = useNavigate()
  let location = useLocation();
  const handleLogout=()=>{
    localStorage.removeItem("token")
    navigator('/login')
  }

  // const handleProfile = ()=>{
  //    navigator('/profile')
     
  // }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.path === '/'?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.path === '/about'?"active":""}`} to="/about">About</Link>
        </li>
        
        
      </ul>
      <Link className='btn btn-primary mx-2' to="/profile" role="button" onClick={()=>getUserprofile()}>Your Profile</Link>
      {!localStorage.getItem("token") ? <form className="d-flex align-content-center">
      <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
      <Link className="btn btn-primary " to="/signup" role="button">SignUp</Link>
      </form> : <button className='btn btn-primary' onClick={handleLogout}>Logout</button>}
      
    </div>
  </div>
</nav>
  )
}

export default Navbar
