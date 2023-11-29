document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Replace with backendAPI when done
    fetch('data/login.json')
    .then(response => response.json())
    .then(data => {
        if (data) {
            //localStorage.setItem('authToken', data.token);
            let token = {};
            for (let i = 0; i < data.users.length; i++) {
                if (data.users[i].userName.toLowerCase() === username.toLowerCase() && data.users[i].password === password) {
                    //THIS IS NOT SECURE THIS SHOULD NOT BE DONE, ONLY DOING BECAUSE IT'S A PROJECT
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("userType", data.users[i].type)
                    //break out if it gets logged in
                    break;
                }
            }
            // Redirect back to  homepage
            window.location.href = 'index.html';
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