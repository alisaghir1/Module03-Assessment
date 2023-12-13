import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('')
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
      userType
    } 

    try {
     const response = await axios.post('http://localhost:5000/users/register',userData,);
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
        <label htmlFor="userType">userType</label>
        <input type="text" onChange={(e) => setUserType(e.target.value)} value={userType}/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default RegisterPage