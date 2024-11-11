import React, {useContext} from 'react'
import { GlobalContext } from '../GlobalContext.js'; 


const Navbar = ()=>{
    const {profile} = useContext(GlobalContext)


    return(
        <div className='navbar'>
            <div className='navbar-content'>
                <p>Chores</p>
                <p id="profile_username">{profile}</p>
            </div>
            


        </div>
    )

}

export default Navbar