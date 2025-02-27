// login end point
export const letMeIn = async (data) => {
  console.log("apistuff", data)
  try {
      const response = await fetch('/api/btown/letmein', {
          method: 'POST',
          credentials: 'include', // Important for including cookies in requests
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      if (responseData.message === 'You are now logged in!') {
        console.log(responseData)
          return responseData;
      } else {
          throw new Error(responseData.message);
      }
  } catch (error) {
      console.error('Error:', error);
      throw error;
  }
};


export const getAdminDashboard = async (data) => {
  try {
    const response = await fetch('/api/btown/admin/dashboard', {
      method: 'GET',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response) {
      console.log('hit a snag in the fetch')
    }
    const data_1 = await response.json()
    if (data_1) {
      console.log(data_1)
      return data_1;
    }
    
  } catch (err) {
    console.error('Error fetching admin dashboard ',err)
    throw err
  }
}

// signup end point
export const createMe = async (data) => {
  console.log(data)
  try {
    const response = await fetch('/api/btown/createme', {
      method: 'POST',
      credentials: 'include', // Important for including cookies in requests
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json',
      },
  });

  if (!response.ok) {
      throw new Error('Network response was not ok');
  }

  const responseData = await response.json();
  if (responseData.message === 'You are now logged in!') {
      return responseData.letInBtown;
  } else {
      throw new Error(responseData.message);
  }
  } catch (error) {
    console.log('Error:', error);
      throw error;
  }
}

// route to post a blog
  export const postIt = async (data) => {
    console.log(data)
    try {
      const response = await fetch('/api/post/', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        console.log(response)
        throw new Error('Network response was not ok');
      }
      const data_1 = await response.json();
      return data_1;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
// sup
// get all posts
  export const allPosts = async (data) => {
    const response = await fetch('/api/post/checkposts', {
      method: 'GET',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('network not ok');
    }
    const data_1 = await response.json();
    if (data_1) {
      return data_1;
    }
  };

  // secured list of posts
  export const postList = async (data) => {
    const response = await fetch('/api/post/postlist', {
      method: 'GET',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('network not ok');
    }
    const data_1 = await response.json();
    if (data_1) {
      return data_1;
    }
  };

// get one post 
  export const onePost = async (id) => {
    const response = await fetch(`/api/post/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('network not ok');
    }
    const data = await response.json();
    if (data) {
      console.log(data)
      return data;
    }
      
  };


  export const updatePost = async ({id, title, body}) => {
    console.log({id, title, body});
    try {
        const response = await fetch(`/api/post/${id}`, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify({title, body}),
            headers:{
                'Content-Type' : 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }   
        const text = await response.text();
        try {          
            const data = JSON.parse(text);
            console.log('Updated successfully!');
            return data;
        } catch (error) {
            
            throw new Error('Failed to parse JSON response');
        }
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
};

  export const deletePost = async (id) => {
    console.log('delete api call' , id)
    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('network not ok');
    }
    const data = await response.json({message: 'post was deleted'});
    if (data) {
      return data;
    }
  };


  export const comment = async (data) => {
    console.log(data)
    const postId = data.postId
    // console.log(data.selectedPost.postId)
    try {
      const response = await fetch(`/api/comment/${postId}`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(
          {
           body: data.body,           
          }
        ),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data_1 = await response.json();
      console.log(data_1)
      return data_1;
    } catch (err) {
      console.error('Error:', err);
      throw err;
    }
  };


  export const viewComments = async (data) => {
    try {
      const response = await fetch('/api/comment', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        console.log('something went wrong')
      }
      const comments = await response.json()
      return comments
    } catch (err) {
      console.log(err)
    }
  }


  export const replyToComment = async (data) => {
    console.log('api data', data)
    try {
      const response = await fetch(`/api/reply/${data.commentId}`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data_1 = await response.json();
      return data_1.newReply;
    } catch (err) {
      console.error('Error:', err);
      throw err;
    }
  };


  export const isUserAuthenticated = async (id) => {
    try {
      const response = await fetch(`/api/btown/oneofme`); 
      const user = await response.json();
      console.log(user,"=====================================")
      return user;
    } catch (error) {
      console.error('Authentication check failed:', error);
      return false;
    }
  }


  export const uploadPhoto = async (formData) => {
    console.log(formData)
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,       
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json(); 

        if (!response.ok) {               
          throw new Error(data.error || 'upload failed!!!');
        }
        return data;
      } else {
        const text = await response.text();
        throw new Error(text || 'Upload failed');
      }       
    } catch (err) {
      console.log(err);
      console.error(err)
      throw err
      
    }
  }

  export const getPhoto = async (id) => {
    try {
      const response = await fetch(`/api/upload/photo/${id}`,{
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('network not ok');
      }
      const data = await response.json();
      if (data) {
        console.log(data)
        return data;
      }
    } catch (err) {
      console.log(err)
    }
  }