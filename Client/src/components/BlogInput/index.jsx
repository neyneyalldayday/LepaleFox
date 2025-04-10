import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postIt, postItWithPhotos , viewComments, replyToComment } from "../../utils/Api";

import "../../pages/Blog/blog.css";

const BlogInput = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [selectedcommentId , setSelectedCommentId] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [ reply, setReply ] = useState(''); 
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    handleComments();
  }, []);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(file => 
      ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)
    );
    
    setFiles(validFiles);

    if (validFiles.length < selectedFiles.length) {
      alert('Some files were rejected - only images (JPEG, PNG, GIF) are allowed');
    }
  };

  const handleComments = async () => {
    try {
      const commentList = await viewComments();
      setComments(commentList);
      console.log(commentList);
    } catch (err) {
      console.log(err);
    }
  };
  const handleInputChange = (e) => {
    if (e.target.id === "title") {
      setTitle(e.target.value);
    } else if (e.target.id === "body") {
      setBody(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();   
    setLoading(true);
    setErrorMessage('')

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('description', description);
    
    files.forEach((file) => {
      formData.append('photos', file);
    });

   

    try {
      const response = await postItWithPhotos(formData);
      console.log("Submission successful", response);
      
      // Reset form on success
      setTitle("");
      setBody("");
      setDescription("");
      setFiles([]);
      
      // Navigate or show success message
      navigate("/admin-post");    
    } catch (error) {
      setErrorMessage(error.message || "submission failed");
    } finally {
      setLoading(false)
    }
  };

  const handleToBLogs = (e) => {
    e.preventDefault();
    console.log("go to the page fooo")
    navigate("/admin-post");
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const toggleReply = (commentId) => {
    setSelectedCommentId(commentId);
    setShowInput(!showInput);
    setReply('');
  }

  const handleReplySubmit  = async (e) => {
    e.preventDefault();
    if(!selectedcommentId){
      console.log('No comment selected');
      return;
    }
   try {
    const data = { body: reply, commentId: selectedcommentId };
    const replySubmission = await replyToComment(data);
    console.log(replySubmission)
    setShowInput(false);
    setSelectedCommentId(null);
    handleComments();
   } catch (err) {
    console.log(err);    
   }

  }

  return (
    <>
    <form className="post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          id="body"
          placeholder="Body of post"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        ></textarea>
        
        {/* Photo upload section */}
        <div className="photo-upload-section">
          <input 
            type="file" 
            multiple 
            onChange={handleFileChange} 
            id="photo-upload"
          />
          <label htmlFor="photo-upload" className="upload-label">
            {files.length > 0 
              ? `${files.length} file(s) selected` 
              : "Select images (optional)"}
          </label>
          
          {files.length > 0 && (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Photo description (optional)"
            />
          )}
        </div>
        
        <button id="login-btn" type="submit" disabled={loading}>
          {loading ? "Publishing..." : "Publish Post"}
        </button>
        
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
       
      <section className="admin-comment-notification">
        <p onClick={toggleComments}>
          {comments.length} comments on posts (click to{" "}
          {showComments ? "hide" : "show"})
        </p>
        <button onClick={handleToBLogs}>See Blogs</button>
      </section>
      {showComments && (
        <div className="admin-comments-list">
          {comments.map((comment, index) => (
            <div key={index} className="comment">              
              <p>
                <strong>{comment.user.username}</strong>: {comment.body}
              </p>
              <button onClick={() => toggleReply(comment.id)}>Reply</button>
              {showInput && selectedcommentId === comment.id && (
                <section>
                  <input type="text" value={reply}  onChange={(e) => setReply(e.target.value)} id="body"/>
                  <button onClick={handleReplySubmit}>submit</button>
                </section>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default BlogInput;
