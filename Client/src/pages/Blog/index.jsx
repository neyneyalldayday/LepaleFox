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
        console.log(formattedPosts)
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

      if(selectedPost){
        setIsModalOpen(true)
      }

      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Failed to sign up user", error);
    }
  };


  const handleComment = async (event) => {
  
       setCommentForm(prevForm => ({
        ...prevForm,       
       body: event.target.value,    
    }))     
  }

  const updatePostComments = (postId, newComment) => {
    setPosts(prevPosts => prevPosts.map(post => {
      return post.id === postId
      ? { ...post, comments : [...post.comments, newComment] }
      : post
    }
  )
)
  }

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
           onSelect={({ post, postId }) => setSelectedPost({ post, postId })}  
           setIsModalOpen={setIsModalOpen} 
           setIsSignUpModalOpen={setIsSignUpModalOpen} 
           />
      {isModalOpen && selectedPost && (
                
           <CommentModal 
           handleComment={handleComment}
             commentForm={commentForm} 
             onClose={() => setIsModalOpen(false)} 
             post={selectedPost} 
             setIsModalOpen={setIsModalOpen} 
             updatePostComments={updatePostComments}
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
            />
          )}
    </>
  );
};



export default Blog;


 