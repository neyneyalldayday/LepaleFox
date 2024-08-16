import React, { useState, useEffect } from 'react';
import { allPosts } from '../../utils/Api';

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
      <div>
        {posts.map((post, index) => (
          <div key={index}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    );

}

export default Blog;