import { useNavigate } from 'react-router-dom'
import React, {useState, useContext } from 'react'
import { GlobalContext } from './../GlobalContext.js'; 
import Navbar from '../components/Navbar.js';


const Login = ()=>{



    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const {profile, setProfile} = useContext(GlobalContext);
    const ip = process.env.REACT_APP_IP


    const navigate = useNavigate()

    const handleLogin = async (e)=> {
        e.preventDefault()
        const req = {
            username: username,
            password: password
        }

        try{
            const response = await fetch(`http://${ip}:5000/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req),
            })
            if (!response.ok) { 
                throw new Error('network response not ok')
            }
            const data = await response.json()
            if(!data.success){
                console.log("failed login")
            }else{
                setProfile({username: req.username, email: null, userId: null})
                console.log("successful login")
                navigate("/home")
            }
                
        }catch (error) {
            console.error("fetch error auth",error.message)
        }
    }




    return(
        <div>
            <Navbar></Navbar>
            <div className='page'>
                <form>
                    <label>Username</label>
                    <input type="text"  value={username}  onChange={(e) => setUsername(e.target.value)} required />
                    <label>Password</label>
                    <input type="password" value={password}  onChange={(e) => setPassword(e.target.value)} required />
                    <button onClick={handleLogin}> Login </button>
                </form>
            </div>
            

        </div>
    )

}

export default Login