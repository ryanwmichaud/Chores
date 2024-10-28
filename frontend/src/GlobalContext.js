
import React, { createContext, useState } from 'react';

export const GlobalContext = createContext()

//provider for the context
export const GlobalProvider = ({ children }) => {

  const ip = process.env.REACT_APP_IP

  const [profile, setProfile] = useState(null);
  const [activeChores, setActiveChores] = useState([])
  const [myActiveChores, setMyActiveChores] = useState([])
  const [myCompletedChores, setMyCompletedChores] = useState([])

  const fetchActiveChores = async ()=> {
    try {
        const response = await fetch(`http://${ip}:5000/get-active-chores`)
        if (! response.ok){ 
            throw new Error('network response was not ok')
        }
        const data = await response.json() 
        setActiveChores(data)
    } catch (error) {
        //setError(error.message)
    } finally { 
        //setLoading(false) 
    } 
}
 
const fetchMyActiveChores = async ()=> {
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
        //setError(error.message)
    } finally {
        //setLoading(false) 
    }
}


const fetchMyCompletedChores = async ()=> {
    const token = localStorage.getItem('token')
    try {
        const response = await fetch(`http://${ip}:5000/get-my-completed-chores`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 
        if (! response.ok){ 
            throw new Error('network response was not ok')
        }
        const data = await response.json() 
        setMyCompletedChores(data)
    } catch (error) {
        //setError(error.message)
    } finally {
        //setLoading(false) 
    } 
}

const markUnfinished = async (chore, assigned, due) => {

  const token = localStorage.getItem('token')
  const requestBody = {
      chore,
      assigned,
      due,
    }

  try{
      const response = await fetch(`http://${ip}:5000/mark-unfinished` ,{
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

const markFinished = async (chore, assigned, due) => {

  const token = localStorage.getItem('token')
  const requestBody = {
      chore,
      assigned,
      due,
    }


  try{
      const response = await fetch(`http://${ip}:5000/mark-finished` ,{
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

  return (
    <GlobalContext.Provider value={{ profile, setProfile, 
                                  fetchActiveChores, fetchMyActiveChores, fetchMyCompletedChores,
                                  activeChores, myActiveChores, myCompletedChores,
                                  setActiveChores, setMyActiveChores, setMyCompletedChores,
                                  markFinished, markUnfinished}}>
      {children}
    </GlobalContext.Provider>
  );
};
