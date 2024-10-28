import React, {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../GlobalContext.js'; 
import Navbar from '../components/Navbar.tsx';
import {Chore, MyChore} from '../components/chore.tsx';


const Home = ()=>{

    const ip = process.env.REACT_APP_IP

    const {profile, setProfile} = useContext(GlobalContext);
    

    const [activeChores, setActiveChores] = useState([])
    const [myActiveChores, setMyActiveChores] = useState([])

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    console.log(error)

    
    const navigate = useNavigate()
    if (profile === null){
        navigate("/")
    }




    useEffect(()=>{

        
        const fetchChores = async ()=> {
            try {
                const response = await fetch(`http://${ip}:5000/get-active-chores`)
                if (! response.ok){ 
                    throw new Error('network response was not ok')
                }
                const data = await response.json() 
                setActiveChores(data)
            } catch (error) {
                setError(error.message)
            } finally { 
                setLoading(false) 
            } 
        }
         
        const fetchMyChores = async ()=> {
            const token = localStorage.getItem('token')
            try {
                const response = await fetch(`http://${ip}:5000/get-my-active-chores`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }) 
                if (! response.ok){ 
                    throw new Error('network response was not ok')
                }
                const data = await response.json() 
                setMyActiveChores(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false) 
            } 
        }
        
          
        
        
        fetchChores()
        fetchMyChores()

    }, []) 

    useEffect(()=>{

        console.log("all", activeChores)
        console.log("my", myActiveChores)

    }, [activeChores, myActiveChores]) 


 

    return(
        <div>
            <Navbar></Navbar>
            <div className='page'>Home
  
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <div>
                <p>Active Chores</p>
                {activeChores.map((chore, index)=>{
                    return  <Chore 
                                key={index}
                                username={chore[0]} 
                                chore={chore[1]}
                                assigned={chore[2]}
                                due={chore[3]}
                            >
                            </Chore>
                })} 

            </div>

            <div>
                <p>My Active Chores</p>
                {myActiveChores.map((chore, index)=>{
                    return  <MyChore 
                                key={index}
                                chore={chore[0]}
                                assigned={chore[1]}
                                due={chore[2]}
                            >
                            </MyChore>
                })}

            </div>
            


        

            </div>

        </div>
        
    )

}

export default Home