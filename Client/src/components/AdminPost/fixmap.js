<div className="post-container">
    {isEditing && (
         {posts.map((post, index) => (
            <div className="post-card" key={index}>
            <div>
             <EditPost postId={selectedPost} />                   
            </div>      
            </div>
          ))}
    ) || 
    ( {posts.map((post, index) => (
    <div className="post-card" key={index}>
           <h2>{post.title}</h2>
           <p>{post.body}</p>
           <div className="buttons">
             <button onClick={() => handleEditClick(post.id)}>edit</button>
            <button onClick={() => handleDeleteClick(post.id)}>delete</button>
          </div>
         </div>
         ))} )
    }         
</div>      





// {isEditing && (
//     
// )|| <div>
//       <h2>{post.title}</h2>
//       <p>{post.body}</p>
//       <div className="buttons">
//         <button onClick={() => handleEditClick(post.id)}>edit</button>
//         <button onClick={() => handleDeleteClick(post.id)}>delete</button>
//       </div>
//     </div>}   