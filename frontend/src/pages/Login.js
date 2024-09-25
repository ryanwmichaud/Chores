import { useNavigate } from 'react-router-dom'
import React, {useState, useContext } from 'react'


const Login = ()=>{

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')


    const navigate = useNavigate()

    const handleLogin = async (e)=> {
        e.preventDefault()
        const req = {
            username: username,
            password: password
        }
        console.log(req)

        try{
            const response = await fetch(`http://localhost:5000/login`, {
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
                //setProfile(username)
                console.log("successful login")
            }
                
        }catch (error) {
            console.error("fetch error auth",error.message)
        }
    }




    return(
        <div>
            <form>
                <label>Username</label>
                <input type="text"  value={username}  onChange={(e) => setUsername(e.target.value)} required />
                <label>Password</label>
                <input type="password" value={password}  onChange={(e) => setPassword(e.target.value)} required />
                <button onClick={handleLogin}> Login </button>
            </form>

        </div>
    )

}

export default Login