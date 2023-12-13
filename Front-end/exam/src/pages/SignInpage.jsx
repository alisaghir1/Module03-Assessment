import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignInpage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    } 

    try {
     const response = await axios.post('http://localhost:5000/users/login',userData,);
     console.log(response);
     console.log(userData);
     navigate('/')
    } catch (error) {
    console.log(error);
    }
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">username</label>
        <input type="text" onChange={(e) => setUsername(e.target.value)} value={username}/>
        <label htmlFor="password">passwprd</label>
        <input type="text" onChange={(e) => setPassword(e.target.value)} value={password}/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default SignInpage