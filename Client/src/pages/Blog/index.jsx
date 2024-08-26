import React, { useState, useEffect } from 'react';
import { allPosts,  createMe  } from '../../utils/Api';
import './blog.css';
import image3 from '../../assets/image3.jpg';
import CommentModal from '../../components/CommentModal/idex';
import SignUpModal from '../../components/SignUpModal';
import PostList from '../../components/PostList';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentForm, setCommentForm] = useState({});  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await allPosts();
        const formattedPosts = fetchedPosts.map(fetchedDate => ({
          ...fetchedDate,
          createdAtFormatted: formatDate(fetchedDate.createdAt),
        }));
        setPosts(formattedPosts);
      } catch (error) {
        console.error('Failed to fetch posts!', error);
      }
    };

    fetchPosts();
  }, []);


  const formatDate = (dateString) => {
    const yearPosition = dateString.indexOf("2024");
    return dateString.substring(0, Math.min(yearPosition + 10, dateString.length));
  };


  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    
    try {
      console.log(username, password)
    
      await createMe({username, password});
      
      setIsSignUpModalOpen(false);
      setIsModalOpen(true)
      
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Failed to sign up user", error);
    }
  };


  const handleComment = async (event) => {
    
       setCommentForm(prevForm => ({
        ...prevForm,
        selectedPost,
       body: event.target.value}))     
  }

  return (
    <>
      <div className='image-container'>
        <img className='blog-image' src={image3} alt="" />
        <div className='blog-heading'>
          <h1>Blog</h1>          
        </div>
      </div>
      {isModalOpen ? (
        <CommentModal handleComment={handleComment}  commentForm={commentForm} onClose={() => setIsModalOpen(false)} />
      ) : (
        <PostList
         posts={posts}  
         onSelect={({ post, postId }) => setSelectedPost({ post, postId })}  
         setIsModalOpen={setIsModalOpen} 
         setIsSignUpModalOpen={setIsSignUpModalOpen} />
      )}
      {isSignUpModalOpen && (
            <SignUpModal
              onClose={() => setIsSignUpModalOpen(false)}
              onSubmit={handleSignUpSubmit}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            />
          )}
    </>
  );
};

// const CommentModal = ({ onClose, handleComment, setIsModalOpen, comment }) => {

//   const handleSubmit = async (event) => {
//     event.preventDefault();  
//     console.log("comment");
//     try {
//       await comment(comment)
//       console.log("hererererer")
//       setIsModalOpen(false)
//     } catch (err) {
//       console.log(err)      
//     }    
//     // setIsModalOpen(false);
//   };

//   return (
//   <div className="modal">
//     <div className="modal-content">
//       <h3>Leave me a comment</h3>
//       <span className="close" onClick={onClose}>&times;</span>
//       <form onSubmit={handleSubmit}>       
//       <div>
//         <textarea
//          name="comment" 
//          id="comment"
//          placeholder='comment'
//          value={comment}
//          onChange={handleComment}
//          ></textarea>
//       </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   </div>
// )
// };

// const PostList = ({ posts ,onSelect, setIsModalOpen,  setIsSignUpModalOpen }) => {

//   const handleCardClick = async (post) => {
//     const isAuthenticated = await isUserAuthenticated();
//     console.log(isAuthenticated, "*********************************")
//     if (isAuthenticated.msg === 'you must login to perform this action') {
      
//       setIsSignUpModalOpen(true);
//     } else {
//       onSelect(post);
//       setIsModalOpen(true);
//     }
//   };

//   return (
//   <div className='post-container'>
//     {posts.map((post, index) => (
//       <div className='post-card' key={index} onClick={() => handleCardClick(post)}>
//         <h2>{post.title}</h2>
//         <p>{post.body}</p>
//         <p>{post.createdAtFormatted}</p>
//       </div>
//     ))}
//   </div>
// )
// };

// const SignUpModal = ({
//   onClose,
//   onSubmit,
//   username,
//   setUsername,
//   password,
//   setPassword,
// }) => {
//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <h3>Sign Up to Comment</h3>
//         <span className="close" onClick={onClose}>
//           &times;
//         </span>
//         <form onSubmit={onSubmit}>
//           <div>
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//           <div>
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };


export default Blog;


 