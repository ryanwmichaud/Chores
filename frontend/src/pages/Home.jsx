import React, {useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../GlobalContext.jsx'; 
import Navbar from '../components/Navbar.tsx';
import {Chore, MyChore, MyCompletedChore} from '../components/chore.tsx';


const Home = ()=>{


    const {profile, 
        fetchActiveChores, fetchMyActiveChores, fetchMyCompletedChores, fetchLeaderboard,
        activeChores, myActiveChores, myCompletedChores, leaderboard} = useContext(GlobalContext);
    

    
    const navigate = useNavigate()



    useEffect(()=>{
        
        if (profile === null){
            navigate("/")
        }

        const fethData = async () =>{
            await fetchActiveChores()
            await fetchMyActiveChores()
            await fetchMyCompletedChores()
            await fetchLeaderboard()
        }
        
        fethData()
        
    }, []) 



    return(
        <div> 
            <Navbar></Navbar>
            <div className='page'>
  
        {/*
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
        */}
           
            <div id='leaderboard'>
                <p>Leaderboard </p> 
                    {leaderboard.map((entry, index)=>{
                        return <div key={index}>
                            <div className='leaderboard-entry'>
                                <p>{entry[0]}</p>
                                <div className='leaderboard-divider'>-</div>
                                <p> {entry[1]}</p>
                            </div>
                        </div>
                    })}                

            </div>
                        
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