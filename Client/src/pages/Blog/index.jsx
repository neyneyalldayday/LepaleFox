import React, { useState, useEffect } from 'react';
import { allPosts,  createFans,letFanIn, isUserAuthenticated, onePost  } from '../../utils/Api';
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
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isSigningUp, setIsSigningUp] = useState(true);

  useEffect(() => {
    fetchPosts();     
  }, []);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await allPosts();    
      const formattedPosts = fetchedPosts.map(fetchedDate => ({
        ...fetchedDate,
        createdAtFormatted: formatDate(fetchedDate.createdAt),
      }));
      console.log("all the posts from the allPost function",formattedPosts)
      setPosts(formattedPosts);
    } catch (error) {
      console.error('Failed to fetch posts!', error);
    }
  };

  const checkAuthentication = async () => {
    try {
      const authStatus = await isUserAuthenticated();      
      const isAuth = authStatus.msg !== 'you must login to perform this action';
      setIsAuthenticated(isAuth);
      if (isAuth) {
        setCurrentUser(authStatus);
      }
    } catch (error) {
      console.error('Failed to check authentication status', error);
      setIsAuthenticated(false);
    }
  };

  const formatDate = (dateString) => {
    const yearPosition = dateString.indexOf("2024");
    return dateString.substring(0, Math.min(yearPosition + 10, dateString.length));
  };


  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    
    try {
      console.log(username, password)
     if(isSigningUp){
      const response = await createFans({username, password});
      console.log(response)
       setIsSignUpModalOpen(false);
       setIsAuthenticated(true);
       
       setCurrentUser(response.username)
 
       if(selectedPost){
         setIsModalOpen(true)
       }
 
       setUsername("");
       setPassword("");
     } else {
      const response = await letFanIn({username, password});
      console.log(response);

      
     }
      
    } catch (error) {
      console.error("Failed to sign up user", error);
    }
  };

const  toggleSignup = () => {
  setIsSigningUp(!isSigningUp)
}


  const handleComment = async (event) => {  
       setCommentForm(prevForm => ({
        ...prevForm,       
       body: event.target.value,    
    }))     
  }

  const updatePostComments = async (postId, newComment) => { 
    checkAuthentication();
    try {
      const updatedPost = await onePost(postId);
      setPosts(prevPosts => prevPosts.map(post => 
        post.id === postId ? { ...post, comments: updatedPost.comments } : post
      ));
    } catch (error) {
      console.error('Failed to fetch updated post', error);
    }
  };

  const handlePostSelection = async ({ post, postId }) => { 
    checkAuthentication();
    setSelectedPost({ post, postId });
    
    if (isAuthenticated) {
      setIsModalOpen(true);
    } else {
      setIsSignUpModalOpen(true);
    }
  };

  return (
    <>
      <div className='image-container'>
        <img className='blog-image' src={image3} alt="" />        
        <div className='blog-heading'>
          <h1>Blog</h1>          
        </div>
      </div>
      <PostList
           posts={posts}  
           onSelect={handlePostSelection}
           isAuthenticated={isAuthenticated}
           />
      {isModalOpen && selectedPost && (                
           <CommentModal 
           handleComment={handleComment}
             commentForm={commentForm} 
             onClose={() => setIsModalOpen(false)} 
             post={selectedPost} 
             setIsModalOpen={setIsModalOpen} 
             updatePostComments={updatePostComments}
             currentUser={currentUser}
             />        
      
      )}
      {isSignUpModalOpen && (
            <SignUpModal
              onClose={() => setIsSignUpModalOpen(false)}
              onSubmit={handleSignUpSubmit}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              isSigningUp={isSigningUp}
              toggleSignup={toggleSignup}
            />
          )}
    </>
  );
};



export default Blog;


 