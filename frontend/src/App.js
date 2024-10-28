import './App.css';
import "./components/Navbar.css"
import "./components/Chore.css"
import "./pages/Pages.css"

import React from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login.js'
import Home from './pages/Home.js'
import {GlobalProvider} from './GlobalContext.js'



const App =  () => {

  return(
    <GlobalProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/" element={<Login/>} />
          </Routes>
        </div>
      </Router>

    </GlobalProvider>
   
  )
}

export default App;
