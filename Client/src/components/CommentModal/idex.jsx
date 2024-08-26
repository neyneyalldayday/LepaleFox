
import {comment} from '../../utils/Api'
const CommentModal = ({ onClose, handleComment, setIsModalOpen, commentForm }) => {
    const commentString = commentForm.comment

    const handleSubmit = async (event) => {
      event.preventDefault();      
      try {  
        console.log(commentForm)    
        const commentResult = await comment(commentForm)
        console.log(commentResult, "hererererer")
        // setIsModalOpen(false)
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
           onChange={handleComment}
           ></textarea>
        </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
  };


  export default CommentModal