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
      return response.json(); // Parse the JSON response
    })
    .then(data => {
      if (data.message === 'You are now logged in!') {
        return data.letInBtown; // Return the user data
      } else {
        throw new Error(data.message); // Rethrow as an error to handle in the caller
      }
    })
    .catch(error => {
      console.error('Error:', error);
      throw error; // Re-throw the error to be caught by the caller
    });
  };





  export const postIt = (data) => {
    return fetch('/api/post/', {
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
        return response.json(); // Parse the JSON response
      })
      .then(data => {
        if (data.message === 'blog posted') {
            console.log(data.newPost)
          return data.newPost; // Return the user data
        } else {
          throw new Error(data.message); // Rethrow as an error to handle in the caller
        }
      })
      .catch(error => {
        console.error('Error:', error);
        throw error; // Re-throw the error to be caught by the caller
      });
  }
