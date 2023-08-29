// add event listener! 
// need to be able to add comments

const commentFormHandler = async (event) => {
    event.preventDefault();
    const commentBody = document.querySelector('#comment-input').value.trim();
    console.log('this is the comment-input: ' + commentBody);

    const response = await fetch('/api/comments/', {
        method: 'POST',
        body: JSON.stringify({ user_name, password }),
        headers: { 'Content-Type': 'application/json' },
    });
}

// function for the log in form. User alerted if log in works or fails
const loginFormHandler = async (event) => {
    event.preventDefault();
    const user_name = document.querySelector('#user-login').value.trim();
    console.log("this is the user_name: " + user_name);
    const password = document.querySelector('#password-login').value.trim();
    console.log("this is the password: " + password);

    if (user_name && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ user_name, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            alert(`Welcome back, ${user_name}`)
            document.location.replace(`/`)
        } else {
            alert('User/password combination does not exist. Sign up first!')
        }
    }
};

// function for the sign up form. User alerted if sign up works or fails
// const signupFormHandler = async (event) => {
//     console.log('signup form handler running')
//     event.preventDefault();
//     const user_name = document.querySelector('#name-signup').value.trim();
//     console.log("this is the New user_name: " + user_name);
//     const password = document.querySelector('#password-signup').value.trim();
//     console.log("this is the password: " + password);

//     if (user_name && password) {
//         const response = await fetch('/api/users', {
//             method: 'POST',
//             body: JSON.stringify({ user_name, password }),
//             headers: { 'Content-Type': 'application/json' },
//         });
//         if (response.ok) {
//             alert('Congratulations, ' + user_name + '! You are now signed up with the Tech Blog!');
//         } else {
//             alert('Please make your password at least 8 characters long.');
//         }
//     }
// };

// submit button created for log in
document
    .querySelector('#comment-button')
    .addEventListener('click', commentFormHandler);

// submit button created for sign up
// document
//     .querySelector('.signup-form')
//     .addEventListener('submit', signupFormHandler);