import React, { useState } from 'react';
import { isUserAuthenticated} from '../../utils/Api';

const PostList = ({ posts, onSelect, setIsModalOpen, setIsSignUpModalOpen }) => {
  const [expandedComments, setExpandedComments] = useState({});

  const handleCardClick = async (post) => {
    const isAuthenticated = await isUserAuthenticated();
    if (isAuthenticated.msg === 'you must login to perform this action') {
      onSelect({ post, postId: post.id });
      setIsSignUpModalOpen(true);
    } else {
      onSelect({ post, postId: post.id });
      setIsModalOpen(true);
    }
  };

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
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <p>Date {post.createdAtFormatted}</p>
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
                  <p>{comment.user.username}: </p>
                  <p>{comment.body}</p>
                </div>
              ))}
            </div>
          )}
          <button onClick={() => handleCardClick(post)}>Add Comment</button>
        </div>
      ))}
    </div>
  );
};

export default PostList;




