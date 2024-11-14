import './App.css';
import "./components/Navbar.css"
import "./components/Chore.css"
import "./pages/Pages.css"

import "./components/Navbar.css"
import "./components/Chore.css"
import "./pages/Pages.css"

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import {GlobalProvider} from './GlobalContext.jsx'


function App() {

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

export default App
