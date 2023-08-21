console.log('handlebars is accessing login.js')

// function for the log in form. User alerted if log in works or fails
const loginFormHandler = async (event) => {
    console.log('login form handler running')
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
        } else {
            alert('User/password combination does not exist. Sign up first!')
        }
    }
};

// function for the sign up form. User alerted if sign up works or fails
const signupFormHandler = async (event) => {
    console.log('signup form handler running')
    event.preventDefault();
    const user_name = document.querySelector('#name-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    if (user_name && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ user_name, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            alert('Congratulations! You are now signed up with the Tech Blog!');
        } else {
            alert('Please make your password at least 8 characters long.');
        }
    }
};

// submit button created for log in
document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

// submit button created for sign up
document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);