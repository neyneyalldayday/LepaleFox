import React, { useState, useEffect } from "react";
import "../../pages/Blog/blog.css";
import image3 from "../../assets/image3.jpg";
import { postList,  deletePost } from "../../utils/Api";
import EditPost from "../EditPost";


const AdminPost = () => {
  const [posts, setPosts] = useState([]); 
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await postList();
        console.log(fetchedPosts)
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts!:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleEditClick = (postId) => {
    setSelectedPost(postId);
    setIsEditing(true);
    
  };

  const handleDeleteClick = async (postId) => {
    try {
      console.log(postId)
     
      const postIndex = posts.findIndex((post) => post.id === postId);
    if (postIndex !== -1) {
     
      const updatedPosts = [...posts]; 
      updatedPosts.splice(postIndex, 1); 
      setPosts(updatedPosts);
      await deletePost(postId); 
    } 
    } catch (error) {
      console.error("Failed to delete post!", error);
    }
  };




  return (
    <div>
      <div className="image-container">
        <img className="blog-image" src={image3} alt="" />
        <div className="blog-heading">
          <h1>Blog</h1>
        </div>
      </div>
      <div className="post-container">
        {posts.map((post, index) => (
          <div className="post-card" key={index}>
             {isEditing && (
                <div>
                    <EditPost postId={selectedPost} />                   
                </div>
            )|| <div>
                  <h2>{post.title}</h2>
                  <p>{post.body}</p>
                  <div className="buttons">
                    <button onClick={() => handleEditClick(post.id)}>edit</button>
                    <button onClick={() => handleDeleteClick(post.id)}>delete</button>
                  </div>
                </div>} 
            
           
          </div>
        ))}
      </div>          
    </div>
  );
};

export default AdminPost;
