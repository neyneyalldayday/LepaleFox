import React, {useState, useEffect} from 'react'
import {comment} from '../../utils/Api'


const CommentModal = (
    {  
       onClose,
       handleComment,
       setIsModalOpen,
       commentForm,
       post,
       updatePostComments
    }
  ) => {

    const [commentString, setCommentString] = useState(commentForm.body || '')
   

    useEffect(() => {
     setCommentString(commentForm.body || '')
    }, [commentForm.body])


    
    const handleSubmit = async (event) => {
      event.preventDefault();   
      try {  
        const commentData = {
          ...commentForm,
          postId: post.post.id
        }
        setCommentString(commentForm.body)
        const commentResult = await comment(commentData)
        console.log(commentResult, "hererererer")
        updatePostComments(post.post.id, commentResult);
        setCommentString('')
        handleComment({ target: {value: ''}})
        setIsModalOpen(false)
        
      } catch (err) {
        console.log(err)  
        setIsModalOpen(true)    
      }       
    };

    const handleLocalComment = (e) => {
      setCommentString(e.target.value)
      handleComment(e)
    }

    
  
    return (
    <div className="modal">
      <div className="modal-content">
        <h3>Leave me a comment</h3>
       
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>       
        <div>
          <textarea
           name="comment" 
           id="comment"
           placeholder='comment'
           value={commentString}
           onChange={handleLocalComment}
           ></textarea>
        </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
  };


  export default CommentModal