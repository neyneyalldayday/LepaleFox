import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {letMeIn} from '../../utils/Api'
import './letmein.css'

const LetMeIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedin, setLoggedin] = useState(false)
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    if (e.target.id === 'username') {
      setUsername(e.target.value);
    } else if (e.target.id === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const data = { username, password };
      
      await letMeIn(data);
      
      
      setUsername('');
      setPassword('');
      setErrorMessage('');
      setLoggedin(true);

      setTimeout(() => {
        navigate('/blog-input');
      }, 2000)
     
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className='form-container'>
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
    {loggedin && (
      <section>
        <h2>Login successful!!!</h2>
      </section>
    )}
    </div>
  )
}


export default LetMeIn
