
import React, {useContext} from 'react'
import { GlobalContext } from '../GlobalContext';


interface ChoreProps {
    key: number; 
    username?: string;
    chore: string;
    assigned: string; 
    due: string;     
    completed?: string
}


interface CompletedChoreProps {
    key: number; 
    username?: string;
    chore: string;
    assigned: string; 
    due: string;     
    completed: string
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

    const{fetchActiveChores, fetchMyActiveChores, fetchMyCompletedChores, markFinished} = useContext(GlobalContext)

    

    const dateAssigned = new Date(assigned)
    console.log(assigned, "to: ",dateAssigned.toLocaleDateString())
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

const MyCompletedChore: React.FC<CompletedChoreProps> = ( {chore, assigned, due, completed } )=>{


    const{fetchActiveChores, fetchMyActiveChores, fetchMyCompletedChores, markUnfinished} = useContext(GlobalContext)

    
    const dateAssigned = new Date(assigned)
    const dateDue = new Date(due)
    const dateCompleted = new Date(completed)

    let doneLate = false;
    if (dateCompleted > dateDue){
        doneLate = true
    }

    return <div className={`chore ${doneLate ? "completed-late" : "completed"}` }>
            
        <div className='chore-title'>
            <p>{chore}</p> 
        </div>
            
        <p>assigned: {dateAssigned.toLocaleDateString()}</p> 
        <p>due: {dateDue.toLocaleDateString() }</p> 
        <p>completed: {dateCompleted.toLocaleDateString()}</p>
        <button onClick={()=>{markUnfinished(chore, assigned, due)}}>Unfinished</button>
    </div>
    
}




export  {Chore, MyChore, MyCompletedChore}