
import React from 'react'


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

    return <div className="chore" >
            
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

    const dateAssigned = new Date(assigned)
    const dateDue = new Date(due)

    return <div className="chore" >
            
        <div className='chore-title'>
            <p>{chore}</p> 
        </div>
            
        <p>assigned: {dateAssigned.toLocaleDateString()}</p> 
        <p>due: {dateDue.toLocaleDateString() }</p> 
        <button>Finished</button>
    </div>
    
}




export  {Chore, MyChore}