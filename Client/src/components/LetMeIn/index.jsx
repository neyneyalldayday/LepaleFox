import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {letMeIn} from '../../utils/Api'
import './letmein.css'

const LetMeIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    if (e.target.id === 'username') {
      setUsername(e.target.value);
    } else if (e.target.id === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();  
    
    const data = { username, password};

    letMeIn(data)
      .then(() => {
        alert('Login successful!');
        setUsername('');
        setPassword('');
        setErrorMessage('');
        navigate('/blog-input');
      })
      .catch(error => {
        setErrorMessage(error.message); 
      });
  }

  return (
    <>
      <form className='login-form' onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          placeholder='Username'
          value={username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          id="password"
          placeholder='Password'
          value={password}
          onChange={handleInputChange}
        />
        <button id="login-btn" type="submit">Login</button>
        {errorMessage && <p>{errorMessage}</p>}
    </form>
    </>
  )
}


export default LetMeIn
