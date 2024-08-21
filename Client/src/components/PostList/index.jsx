import {isUserAuthenticated} from '../../utils/Api'
const PostList = ({ posts ,onSelect, setIsModalOpen,  setIsSignUpModalOpen }) => {

    const handleCardClick = async (post) => {
      const isAuthenticated = await isUserAuthenticated();
      console.log(isAuthenticated, "*********************************")
      if (isAuthenticated.msg === 'you must login to perform this action') {
        
        setIsSignUpModalOpen(true);
      } else {
        onSelect(post);
        setIsModalOpen(true);
      }
    };
  
    return (
    <div className='post-container'>
      {posts.map((post, index) => (
        <div className='post-card' key={index} onClick={() => handleCardClick(post)}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <p>{post.createdAtFormatted}</p>
        </div>
      ))}
    </div>
  )
  };


  export default PostList