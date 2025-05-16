import React, { useState, useEffect } from "react";
import "../../pages/Blog/blog.css";
import image3 from "../../assets/image3.jpg";
import { allPosts, deletePost, getPhoto } from "../../utils/Api";
import EditPost from "../EditPost";
import placeholder from '../../assets/idk-what-i-did.png?url'

const AdminPost = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  // const [photos, setPhotos ] = useState([])

  useEffect(() => {
        fetchPosts();
        // fetchPhotos()
  }, []);

  // const fetchPhotos = async () => {
  //   try {
  //     const prepPhotos = await getPhoto();
  //     console.log(prepPhotos)
  //     setPhotos(prepPhotos)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  const fetchPosts = async () => {
    try {
      const fetchedPosts = await allPosts();
      console.log(fetchedPosts);
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Failed to fetch posts!:", error);
    }
  };

  const handleEditClick = (postId) => {
    console.log('postiddddd', postId)
    setSelectedPost(postId);
    setIsEditing(true);
  };

  const handleDeleteClick = async (postId) => {
    try {
      console.log(postId);

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
        {isEditing ? (
          <>
            {posts.map((post, index) => (
              <div className="post-card" key={index}>
                <section className="photo-container">
                {post.photos?.map((photo) => (
                  <section  className='img-wrapper' key={photo.id}>
                    <img 
                    src={`${import.meta.env.VITE_API_URL}/api/upload/photo/${photo.id}`} 
                    alt={photo.title} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = placeholder; 
                    }}
                    />
                  </section>
                ))}
                </section>             
                <section className="post-content">
                  <h2>{post.title}</h2>
                  <p>{post.body}</p>
                </section>
                   
                <div>            
                  <EditPost postId={selectedPost} />
                </div>
                <button onClick={() => setIsEditing(false)}>x</button>
              </div>
            ))}
          </>
        ) : (
          <>
            {posts.map((post, index) => (
              <div className="post-card" key={index}>
                <section className="photo-container">
                {post.photos?.map((photo) => (
                  <section className='img-wrapper' key={photo.id}>
                    <img 
                    src={`/api/upload/photo/${photo.id}`} 
                    alt={photo.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = placeholder; 
                    }}
                    />
                  </section>
                ))}
                </section>
                <section className="post-content">
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                </section>               
                <div className="buttons">
                  <button onClick={() => handleEditClick(post.id)}>edit</button>
                  <button onClick={() => handleDeleteClick(post.id)}>
                    delete
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPost;
