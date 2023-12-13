import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'


//components
import Navbar from './components/Navbar'
import Footer from './components/Footer'


//pages
import Login from './pages/Auth/Login'
import Home from './pages/Home/Home'
import Register from './pages/Auth/Register'
import EditProfile from './pages/EditProfile/EditProfile'


//hooks
import { useAuth } from '../hooks/useAuth'
import Profile from './pages/Profile/Profile'


function App() {
  const {auth, loading} = useAuth();

  if(loading){
    return <p>Carregando...</p>
  }
  
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <div className='container'>
        <Routes>
          <Route path="/" element = {auth ? <Home/> : <Navigate to = "/login"/>}/>
          <Route path = "/login" element={!auth ? <Login/> : <Navigate to = "/"/>}></Route>
          <Route path = "/register" element={!auth ? <Register/> : <Navigate to = "/"/>}></Route>
          <Route path = "/profile" element={auth ? <EditProfile/> : <Navigate to = "/"/>}></Route>
          <Route path = "/users/:id" element={auth ? <Profile/> : <Navigate to = "/"/>}></Route>
        </Routes>

      </div>
        
      <Footer/>
      
      </BrowserRouter>

    </>
  )
}

export default App
