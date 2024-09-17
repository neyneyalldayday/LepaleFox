import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postIt, viewComments, replyToComment } from "../../utils/Api";
import "../../pages/Blog/blog.css";

const BlogInput = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [ reply, setReply ] = useState('')
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { title: title, body: body };

    postIt(data)
      .then(() => {        
        setTitle("");
        setBody("");
        setErrorMessage("");
        navigate("/admin-post");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const handleToBLogs = (e) => {
    e.preventDefault();
    navigate("/admin-post");
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const toggleReply = () => {
    setShowInput(!showInput)
  }


  const handleReply = (e) => {
  e.preventDefault()
  if (e.target.id === "body"){
    setReply(e.target.value);
    console.log(reply)
  }
  console.log("did a reply thing")
  }

  const handleReplySubmit  = async (e) => {
    e.preventDefault();
   try {
    const data = reply;
    const replySubmission = await replyToComment(data);
    console.log(replySubmission)
   } catch (err) {
    console.log(err)
    
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
          Submit Post
        </button>
        <button onClick={() => handleToBLogs}>See Blogs</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
      <section className="admin-comment-notification">
        <p onClick={toggleComments}>
          {comments.length} comments on posts (click to{" "}
          {showComments ? "hide" : "show"})
        </p>
      </section>
      {showComments && (
        <div className="admin-comments-list">
          {comments.map((comment, index) => (
            <div key={index} className="comment">              
              <p>
                <strong>{comment.user.username}</strong>: {comment.body}
              </p>
              <button onClick={toggleReply}>Reply</button>
              {showInput && (
                <section>
                  <input type="text" value={reply}  onChange={handleReply} id="body"/>
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
