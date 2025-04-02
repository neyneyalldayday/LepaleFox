import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { letMeIn, createMe } from '../../utils/Api';
import './letmein.css';

const LetMeIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'username') {
      setUsername(value);
    } else if (id === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const data = { username, password };
      
      if (isSigningUp) {
        await createMe(data);
        setErrorMessage('Account created successfully! You can now log in.');
        setIsSigningUp(false);
      } else {
        const response =  await letMeIn(data);
        console.log(response)
        
        const user = response;
        localStorage.setItem('user', JSON.stringify(user));

        setLoggedIn(true);
        setErrorMessage('');
        if (user.letInBtown.role === 'admin'){
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        } else {
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
       
      }
      
      setUsername('');
      setPassword('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const toggleSignup = () => {
    setIsSigningUp(!isSigningUp);
    setErrorMessage('');
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
        <button id="submit-btn" type="submit">
          {isSigningUp ? 'Sign Up' : 'Login'}
        </button>
        <button type="button" onClick={toggleSignup}>
          {isSigningUp ? 'Switch to Login' : 'Switch to Sign Up'}
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      {loggedIn && (
        <section>
          <h2>Login successful!!!</h2>
        </section>
      )}
    </div>
  );
};

export default LetMeIn;
