export const letMeIn = (data) => {
    return fetch('/api/btown/letmein', {
      method: 'POST',
      credentials: 'include', // Important for including cookies in requests
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); 
    })
    .then(data => {
      if (data.message === 'You are now logged in!') {
        return data.letInBtown; 
      } else {
        throw new Error(data.message); 
      }
    })
    .catch(error => {
      console.error('Error:', error);
      throw error; 
    });
  };

  export const postIt = (data) => {
    return fetch('/api/post/', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        return data.newMessage
      })
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }


  export const allPosts = (data) => {
    return fetch('/api/post/checkposts', {
        method: 'GET',
        credentials: 'include',
        body: JSON.stringify(data),
        headers:{
            'Content-Type' : 'application/json',
        },
    })
    .then(response => {
        console.log(response)
        if(!response.ok) {
            throw new Error('network not ok');
        }
        return response.json();
    })
    .then(data => {        
      if (data){              
        return data
      }
        
    })
  }
