import React, {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../GlobalContext.js'; 
import Navbar from '../components/Navbar.tsx';
import {Chore, MyChore, MyCompletedChore} from '../components/chore.tsx';


const Home = ()=>{

    const ip = process.env.REACT_APP_IP

    const {profile, 
        fetchActiveChores, fetchMyActiveChores, fetchMyCompletedChores,
        activeChores, myActiveChores, myCompletedChores } = useContext(GlobalContext);
    

    
    const navigate = useNavigate()
    if (profile === null){
        navigate("/")
    }




    useEffect(()=>{

        const fethData = async () =>{
            await fetchActiveChores()
            await fetchMyActiveChores()
            await fetchMyCompletedChores()
        }
        fethData()
        

    }, []) 




 

    return(
        <div> 
            <Navbar></Navbar>
            <div className='page'>Home
  
        {/*
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
        */}

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
            
            <div>
                <p>My Completed Chores</p>
                {myCompletedChores.map((chore, index)=>{
                    return  <MyCompletedChore 
                                key={index}
                                chore={chore[0]}
                                assigned={chore[1]} 
                                due={chore[2]} 
                                completed={chore[3]}
                            >
                            </MyCompletedChore>
                })}

            </div>


        

            </div>

        </div>
        
    )

}

export default Home