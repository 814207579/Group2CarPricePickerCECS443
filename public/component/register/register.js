document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Replace with backendAPI when done
    fetch("data/login.json")
    .then(response => response.json())
    .then(data => {
        if (data) {
            //localStorage.setItem('authToken', data.token);
            //check if the user already exists
            for (let i = 0; i < data.users.length; i++) {
                //if the user already exists display an alert then log them in
                if (data.users[i].userName.toLowerCase() === username.toLowerCase() && data.users[i].password === password) {
                    //THIS IS NOT SECURE THIS SHOULD NOT BE DONE, ONLY DOING BECAUSE IT'S A PROJECT
                    alert("Logging you in as: " + data.users[i].userName);
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("userType", data.users[i].type)
                    //break out if it gets logged in
                    break;
                }
                //if the user exists but the password is wrong keep them on the page
                else if(data.users[i].userName.toLowerCase() === username.toLowerCase()) {
                    alert("This user already exists but the password is incorrect");
                }
                //create the user if nothing else exists
                //NOT SECURE, JUST FOR PROOF OF CONCEPT
                else {
                    data.users.push({
                        "userName": username,
                        "password": password,
                        "type": "user"
                    });
                    let blob = new Blob([JSON.stringify(data)], { type: 'application/json' })

                    saveJsonData(data, "data/login.json")
                    //TODO write the new data to the json file
                    break;
                }
            }
            // Redirect back to root page
            window.location.href = '/';
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