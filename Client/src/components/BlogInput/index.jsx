import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postIt, viewComments, replyToComment } from "../../utils/Api";
import PhotoUploadForm from "../PhotoUploadForm";
import "../../pages/Blog/blog.css";

const BlogInput = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [selectedcommentId , setSelectedCommentId] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [ reply, setReply ] = useState('');
  const [ postId, setPostId ] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    handleComments();
  }, []);

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

    

    const data = { title: title, body: body };

    try {


      console.log("submit", data)
      const response = await postIt(data);
      console.log(response, "++++++++++++++++++++++++++++++++++++++++++++++")
      setPostId(response.id); 
      setTitle("");
      setBody("");
      setErrorMessage("");
     
    } catch (error) {
      setErrorMessage(error.message);
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
          placeholder="title"
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          id="body"
          placeholder="body of post"
          value={body}
          onChange={handleInputChange}
        ></textarea>
        <button id="login-btn" type="submit">
          Add Images +
        </button>       
        {errorMessage && <p>{errorMessage}</p>}
      </form>
      {postId && (
        <section className="photo-component">
           <PhotoUploadForm postId={postId} />
        </section>       
      )}
       
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
