import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './Components/NavBar/NavBar'
import Seller from './Components/Panel/Seller/Seller'
import { Context } from './Components/ContextAPI/ContextAPI'
import Admin from './Components/Panel/Admin/Admin'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

function App() {
  
  return (
    <>
      <NavBar></NavBar>
      <Outlet></Outlet>
      {/* <Seller></Seller> */}
      {/* <Admin></Admin> */}
    </>
  )
}

export default App
