const commentFormHandler = async (event) => {
    event.preventDefault();
    const commentBody = document.querySelector('#comment-input').value.trim();
    console.log('this is the comment-input: ' + commentBody);
    const idPath = window.location.pathname.split('/');
    const id = idPath[idPath.length - 1];

    const response = await fetch('/api/comments/blog/', {
        method: 'POST',
        body: JSON.stringify({
            content: commentBody,
            post_id: id,
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        console.log(response)
        
        // document.location.replace('/profile');
    } else {
        console.log('call failed')
    }
}

// listen for click of comment button 
document
    .querySelector('#comment-button')
    .addEventListener('click', commentFormHandler);