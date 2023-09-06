const fetchUserPosts = async () => {
    console.log('fetch user posts attempted')
  try {
    const response = await fetch(`/api/users/dashboard/${user_id}`);
    
    if (response.ok) {
      const posts = await response.json();
      // Now 'posts' contains the array of posts by the specific user.
      console.log(posts);
      // You can process the posts data here, such as displaying it on your webpage.
    } else {
      console.error('Failed to fetch user posts');
    }
  } catch (err) {
    console.error(err);
  }
};


// document.querySelector('#dashboard').addEventListener('click', 
fetchUserPosts();