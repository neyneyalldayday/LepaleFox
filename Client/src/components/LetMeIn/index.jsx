import React, { useState } from 'react';

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
    // Here you would typically send the username and password to your backend for authentication
    // For demonstration purposes, let's assume the login was successful
    // You should replace this with actual authentication logic
    if (username && password) {
      alert('Login successful!');
      setUsername('');
      setPassword('');
      setErrorMessage('');
    } else {
      setErrorMessage('Username or password is required.');
    }
  };

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
