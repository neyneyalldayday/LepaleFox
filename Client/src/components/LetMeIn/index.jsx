import React, { useState } from 'react';
import {letMeIn} from '../../utils/Api'

const LetMeIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    if (e.target.id === 'username') {
      setUsername(e.target.value);
    } else if (e.target.id === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Prepare the data to send to the server
    const data = { username, password};
  
    // Call the letMeIn function with the form data
    letMeIn(data)
      .then(() => {
        alert('Login successful!');
        setUsername('');
        setPassword('');
        setErrorMessage('');
      })
      .catch(error => {
        setErrorMessage(error.message); // Display the error message received from the server
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
