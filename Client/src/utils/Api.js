export const letMeIn = async (data) => {
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
          return responseData.letInBtown;
      } else {
          throw new Error(responseData.message);
      }
  } catch (error) {
      console.error('Error:', error);
      throw error;
  }
};

  export const postIt = async (data) => {
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
        throw new Error('Network response was not ok');
      }
      const data_1 = await response.json();
      return data_1.newMessage;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }


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
  }

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
  }


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
      return data;
    }
      
  }


  export const updatePost = async ({id, title, body}) => {
    console.log({id, title, body});
    try {
        const response = await fetch(`api/post/${id}`, {
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
}

  export const deletePost = async (id) => {
    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('network not ok');
    }
    const data = await response.json();
    if (data) {
      return data;
    }
  }