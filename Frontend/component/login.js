document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Replace with backendAPI when done
    fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('authToken', data.token);
            // Redirect back to  homepage
            window.location.href = '../index.html';
        } else {
            // Handle login failure
            alert('Login failed!');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error logging in');
    });
});