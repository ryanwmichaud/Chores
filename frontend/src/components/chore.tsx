
import React, {useContext} from 'react'
import { GlobalContext } from '../GlobalContext';


interface ChoreProps {
    key: number; 
    username?: string;
    chore: string;
    assigned: string; 
    due: string;     
}



const Chore: React.FC<ChoreProps> = ( {username, chore, assigned, due } )=>{

    const dateAssigned = new Date(assigned)
    const dateDue = new Date(due)

    let overdue = false;
    if (dateDue > new Date()){
        overdue = true
    }

    return <div className={`chore ${overdue ? "pending" : "overdue"}`} >
            
        <div className='chore-title'>
            <p>{username}</p> 
            <p className='title-divider'> - </p>
            <p>{chore}</p> 
        </div>
            
        <p>assigned: {dateAssigned.toLocaleDateString()}</p> 
        <p>due: {dateDue.toLocaleDateString() }</p> 
    </div>
    
}



const MyChore: React.FC<ChoreProps> = ( {chore, assigned, due } )=>{

    const{fetchActiveChores, fetchMyActiveChores, fetchMyCompletedChores} = useContext(GlobalContext)

    const markFinished = async (chore: string, assigned: string, due: string) => {

        const token = localStorage.getItem('token')
        const requestBody = {
            chore,
            assigned,
            due,
          }
    
    
        try{
            const response = await fetch(`http://10.0.0.76:5000/mark-finished` ,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody)
            })
            if (!response.ok){
                throw new Error("network response not ok")
            }
            const result = await response.json()
            console.log(result)
            fetchActiveChores()
            fetchMyActiveChores()
            fetchMyCompletedChores()

        }catch(error){
            console.error("Error: ", error)
        }
    
    }

    const dateAssigned = new Date(assigned)
    const dateDue = new Date(due)

    let overdue = false;
    if (dateDue > new Date()){
        overdue = true
    }

    return <div className={`chore ${overdue ? "pending" : "overdue"}`} >
            
        <div className='chore-title'>
            <p>{chore}</p> 
        </div>
            
        <p>assigned: {dateAssigned.toLocaleDateString()}</p> 
        <p>due: {dateDue.toLocaleDateString() }</p> 
        <button onClick={ ()=>markFinished(chore, assigned, due )}>Finished</button>
    </div>
    
}

const MyCompletedChore: React.FC<ChoreProps> = ( {chore, assigned, due } )=>{


    const{fetchActiveChores, fetchMyActiveChores, fetchMyCompletedChores} = useContext(GlobalContext)

    const markUnfinished = async (chore: string, assigned: string, due: string) => {

        const token = localStorage.getItem('token')
        const requestBody = {
            chore,
            assigned,
            due,
          }
    
        try{
            const response = await fetch(`http://10.0.0.76:5000/mark-unfinished` ,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody)
            })
            if (!response.ok){
                throw new Error("network response not ok")
            }
            const result = await response.json()
            console.log(result)
            fetchActiveChores()
            fetchMyActiveChores()
            fetchMyCompletedChores()

        }catch(error){
            console.error("Error: ", error)
        }
    
    }
    const dateAssigned = new Date(assigned)
    const dateDue = new Date(due)

    let overdue = false;
    if (dateDue > new Date()){
        overdue = true
    }

    return <div className="chore  complete" >
            
        <div className='chore-title'>
            <p>{chore}</p> 
        </div>
            
        <p>assigned: {dateAssigned.toLocaleDateString()}</p> 
        <p>due: {dateDue.toLocaleDateString() }</p> 
        <button onClick={()=>{markUnfinished(chore, assigned, due)}}>Unfinished</button>
    </div>
    
}




export  {Chore, MyChore, MyCompletedChore}