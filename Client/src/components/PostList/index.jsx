import React, { useState } from 'react';
import placeholder from '../../assets/idk-what-i-did.png'

const PostList = ({ posts, onSelect, isAuthenticated }) => {
  console.log("postsssss"  , posts)
  const [expandedComments, setExpandedComments] = useState({});

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  return (
    <div className='post-container'>
      {posts.map((post) => (
        <div className='post-card' key={post.id}>
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
          <section className='post-content'>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p>Date {post.createdAtFormatted}</p>
          </section>
          
          <section className='comment-notification' onClick={(e) => {
            e.stopPropagation();
            toggleComments(post.id);
          }}>
            <p>{post.comments.length} comments</p>
          </section>
          {expandedComments[post.id] && (
            <div className='comments-section'>
              {post.comments.map((comment, index) => (
                <div key={index} className='comment'>
                  <p>{comment.user?.username  || 'Unknown User'}: </p>
                  <p>{comment.body}</p>
                  <section className='reply-container'>
                  {comment.replies?.map((reply, index) => (
                    <section key={index} className='replysection'>
                    <p>From LepaleFox: {reply.body}</p>
                  </section>
                  ))}
                  </section>
                  
                  
                </div>
              ))}
            </div>
          )}
          <button onClick={() => onSelect({ post, postId: post.id })}>
            {isAuthenticated ? 'Add Comment' : 'Sign Up to Comment'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PostList;




