import React, { useState, useRef, useEffect  } from 'react';
import placeholder from '../../assets/idk-what-i-did.png'

const PostList = ({ posts, onSelect, isAuthenticated }) => {

  const [expandedComments, setExpandedComments] = useState({});
  const [activePhotoIndex, setActivePhotoIndex] = useState({});

  const photoContainerRefs = useRef({});

  useEffect(() => {
    const handleResize = () => {
      Object.keys(photoContainerRefs.current).forEach((postId) => {
        const container = photoContainerRefs.current[postId];
        const post = posts.find(p => p.id === postId);
        if (container && post && post.photos && post.photos.length > 0) {
          const scrollWidth = container.scrollWidth;
          const clientWidth = container.clientWidth;
          const maxScroll = scrollWidth - clientWidth;
          container.scrollLeft = (activePhotoIndex[postId] || 0) * (maxScroll / (posts.find(p => p.id === postId).photos.length - 1));
        }
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activePhotoIndex, posts]);


  const toggleComments = (postId) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleScroll = (postId) => {
    const container = photoContainerRefs.current[postId];
    const post = posts.find(p => p.id === postId);
    if (container && post && post.photos && post.photos.length > 0) {
      const scrollPosition = container.scrollLeft;
      const itemWidth = container.scrollWidth / posts.find(p => p.id === postId).photos.length;
      const newIndex = Math.round(scrollPosition / itemWidth);
      setActivePhotoIndex(prev => ({ ...prev, [postId]: newIndex }));
    }
  };

  return (
    <div className='post-container'>
      {posts && posts.map((post) => (
        <div className='post-card' key={post.id}>
          {post.photos && post.photos.length > 0 && (
            <>
              <div 
                className="photo-container"
                ref={el => photoContainerRefs.current[post.id] = el}
                onScroll={() => handleScroll(post.id)}
              >
                {post.photos.map((photo, index) => (
                  <div className='img-wrapper' key={photo.id}>
                    <img 
                      src={`/api/upload/photo/${photo.id}`} 
                      alt={photo.title || `Photo ${index + 1}`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = placeholder; 
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="photo-indicator">
                {post.photos.map((_, index) => (
                  <span 
                    key={index} 
                    className={`indicator ${index === (activePhotoIndex[post.id] || 0) ? 'active' : ''}`}
                  />
                ))}
              </div>
            </>
          )}
          <section className='post-content'>
            <h2>{post.title}</h2>
            <article>{post.body}</article>
            <p>Date {post.createdAtFormatted}</p>
          </section>
          
          <section className='comment-notification' onClick={(e) => {
            e.stopPropagation();
            toggleComments(post.id);
          }}>
            <p>{post.comments ? post.comments.length : 0} comments</p>
          </section>
          {expandedComments[post.id] && post.comments && (
            <div className='comments-section'>
              {post.comments.map((comment, index) => (
                <div key={index} className='comment'>
                  <p>{comment.fan?.username || 'Unknown User'}: </p>
                  <article>{comment.body}</article>
                  <section className='reply-container'>
                  {comment.replies && comment.replies.map((reply, index) => (
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




