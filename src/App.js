import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import { useContext, useEffect, useState } from 'react';
import Profile from './components/Profile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import noteContext from './Context/noteContext';
import LoadingBar from 'react-top-loading-bar'

function App() {
  const [alert,setAlert] = useState(null)
  const {tostify,topLoadingBar} = useContext(noteContext)
  const [progress, setProgress] = useState(0)
  
  
  useEffect(()=>{
    setProgress(topLoadingBar)

  },[topLoadingBar])
  
  const showAlert = (type,msg)=>{
    setAlert({
      type:type,
      msg:msg
    })
    setTimeout(() => {
      setAlert(null)
    }, 1400);
  }

  useEffect(()=>{
    // eslint-disable-next-line
    switch(tostify?.type){
      case 'success':
        toast.success(tostify?.message)
      break;
      case 'error':
        toast.error(tostify?.message)
      break;

    }
  },[tostify])


  return (
    <div >
      <BrowserRouter>
      <Navbar/>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Alert alert={alert} />
      <div className="container">
        <Routes>
          <Route exact element={<Home showAlert={showAlert}/>} path="/" ></Route>
          <Route exact element={<About/>} path="/about" ></Route>
          <Route exact element={<Login showAlert={showAlert}/>} path="/login" ></Route>
          <Route exact element={<Signup showAlert={showAlert}/>} path="/signup" ></Route>
          <Route exact element={<Profile />} path="/profile" ></Route>
        </Routes>
       
      </div>
      </BrowserRouter>
      <ToastContainer position= "top-center" />
     

    </div>
  );
}

export default App;