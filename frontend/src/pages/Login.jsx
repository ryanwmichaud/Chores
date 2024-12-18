import { useNavigate } from 'react-router-dom'
import React, {useState, useContext} from 'react'
import { GlobalContext } from '../GlobalContext.jsx'; 
import Navbar from '../components/Navbar.tsx';


const Login = ()=>{



    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const {setProfile} = useContext(GlobalContext);
    
    const ip = import.meta.env.VITE_SERVER_IP
    const  port = import.meta.env.VITE_SERVER_PORT

    const navigate = useNavigate()

    


    const handleLogin = async (e)=> {
        e.preventDefault()
        const req = {
            username: username,
            password: password
        }

        try{
            const response = await fetch(`http://${ip}:${port}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req)
            })
            if (!response.ok) { 
                throw new Error('network response not ok')
            }
            const data = await response.json()
            if(!data.success){
                setError("invalid username/password")
            }else{
                setProfile(req.username)
                localStorage.setItem('token', data.token)
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
                <form className='login-form'>
                    <label>Username</label>
                    <input name='username' type="text"  value={username}  onChange={(e) => setUsername(e.target.value)} required />
                    <label> Password</label>
                    <input name='password' type="password" value={password}  onChange={(e) => setPassword(e.target.value)} required />
                    <button name='submit' onClick={handleLogin}> Login </button>
                </form>
                <p>{error}</p>
            </div>
            

        </div>
    )

}

export default Login