import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'

import {GlobalProvider} from './GlobalContext.js'



const App =  () => {

  return(
    <GlobalProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
          </Routes>
        </div>
      </Router>

    </GlobalProvider>
   
  )
}

export default App;
