
import {comment} from '../../utils/Api'
const CommentModal = ({ onClose, handleComment, setIsModalOpen, commentForm, post }) => {
    const commentString = commentForm.body

    const handleSubmit = async (event) => {
      event.preventDefault();   
      try {  
        const commentData = {
          ...commentForm,
          postId: post.post.id
        }
        const commentResult = await comment(commentData)
        console.log(commentResult, "hererererer")
        setIsModalOpen(false)
      } catch (err) {
        console.log(err)      
      }       
    };

    
  
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
           onChange={(e) => handleComment(e)}
           ></textarea>
        </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
  };


  export default CommentModal