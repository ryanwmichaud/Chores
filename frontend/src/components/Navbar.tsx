import React, {useContext} from 'react'
import { GlobalContext } from '../GlobalContext.js'; 


const Navbar = ()=>{
    const {profile, setProfile} = useContext(GlobalContext);
    console.log(profile)


    return(
        <div className='navbar'>
            <div className='navbar-content'>
                <p>Chores</p>
                <p id="profile_username">{profile.username}</p>
            </div>
            


        </div>
    )

}

export default Navbar