import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from './../GlobalContext.js'; 
import Navbar from '../components/Navbar.js';


const Home = ()=>{
    const navigate = useNavigate()



    return(
        <div>
            <Navbar></Navbar>
            <div className='page'>Home</div>

        </div>
        
    )

}

export default Home