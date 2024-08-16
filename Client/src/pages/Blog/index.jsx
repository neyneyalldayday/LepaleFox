import React, { useState, useEffect } from 'react';
import { allPosts } from '../../utils/Api';
import './blog.css'
import image3 from '../../assets/image3.jpg'
const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {      
        const fetchedPosts = await allPosts();        
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Failed to fetch posts!:', error);
      }
    };

    fetchPosts()
  },[]);

    return (
      <>
      <div className='image-container'>
        <img className='blog-image' src={image3} alt="" />
        <div className='blog-heading'>
            <h1>Blog</h1>
        </div>        
      </div>
      <div className='post-container'>
        {posts.map((post, index) => (
          <div className='post-card' key={index}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
      </>
      
    );

}

export default Blog;