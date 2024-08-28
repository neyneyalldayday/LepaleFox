import React, {useEffect} from 'react'
import {isUserAuthenticated} from '../../utils/Api'
import { onePost } from '../../utils/Api';
const PostList = ({ posts ,onSelect, setIsModalOpen,  setIsSignUpModalOpen }) => {

  useEffect(() => {
    const fetchComments = async (post) => {
      try {
        const comments = await onePost()
        console.log(comments)
      } catch (err) {
        console.log(err)
        return [];
      }
    }

    fetchComments(post)
  }, [])


    const handleCardClick = async (post) => {
      const isAuthenticated = await isUserAuthenticated();
      console.log(isAuthenticated, "*********************************")
      if (isAuthenticated.msg === 'you must login to perform this action') {
        
        setIsSignUpModalOpen(true);
      } else {
        onSelect({post, postId: post.id});
        setIsModalOpen(true);
      }
    };
  
    return (
    <div className='post-container'>
      {posts.map((post) => (
        <div className='post-card' key={post.id} onClick={() => handleCardClick(post)}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <p>Date {post.createdAtFormatted}</p>
         <section className='comment-notification'>
          <p>{post.comments.length} comments</p>
         </section>
        </div>
      ))}
    </div>
  )
  };


  export default PostList




//   <ul className='comments-list'>
          
//   {post.comments.map((comment) => (
//    <li  key={comment.id}>
//      <p>{comment.body}</p>
//      <small>{new Date(comment.createdAt).toLocaleDateString()}</small>
//    </li>
//   ))}
//  </ul>