import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postIt } from '../../utils/Api'
import "../../pages/Blog/blog.css"

const BlogInput = () => {

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    if (e.target.id === 'title') {
      setTitle(e.target.value);
    } else if (e.target.id === 'body') {
      setBody(e.target.value);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  
   
    const data = { title:title, body: body };  
    
    postIt(data)
      .then(() => {
        alert('post sent!');
        setTitle('');
        setBody('');
        setErrorMessage('');
        navigate('/admin-post');
      })
      .catch(error => {
        setErrorMessage(error.message); 
      });
  }


  const handleToBLogs = (e) => {
    e.preventDefault();
    navigate('/admin-post')
  }
  return (
    <>
    <form className='post-form' onSubmit={handleSubmit}>
        <input
          type="text"
          id="title"
          placeholder='title'
          value={title}
          onChange={handleInputChange}
        />
        <textarea
         id='body'
         placeholder='body of post'
         value={body}
         onChange={handleInputChange}
        ></textarea>
        <button id="login-btn" type="submit">Submit Post</button>
        <button  onClick={()=> handleToBLogs}>See Blogs</button>
        {errorMessage && <p>{errorMessage}</p>}
    </form>
    </>
  )
}

export default BlogInput