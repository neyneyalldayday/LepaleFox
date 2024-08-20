import React, { useState, useEffect } from 'react';
import { onePost, updatePost } from '../../utils/Api';

const EditPost = ({ postId }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const singlePost = await onePost(postId);
        console.log(singlePost.id)    
      } catch (err) {
        console.log(err);
      }
    };

    if (postId) {
      fetchPostDetails();
    }
  }, [postId]);

  const handleInputChange = (e) => {
    if (e.target.id === "title") {
      setTitle(e.target.value);
    } else if (e.target.id === "body") {
      setBody(e.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedData = {
      id: postId,
      title,
      body,
    };
 console.log(updatedData)
    try {
      await updatePost(updatedData);
      document.location.reload(); // Reloads the page
    } catch (error) {
      console.error("Failed to update post!", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <div>
        <form className="post-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="title"
            placeholder="title"
            value={title}
            onChange={handleInputChange}
          />
          <textarea
            id="body"
            placeholder="body of post"
            value={body}
            onChange={handleInputChange}
          />
          {errorMessage && <p>{errorMessage}</p>}
          <button type="submit" >Save Changes</button>
        </form>
       
      </div>
    </div>
  );
};

export default EditPost;