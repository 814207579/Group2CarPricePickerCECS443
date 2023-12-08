import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5000;                  //Save the port number where your server will be listening

//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('public/index.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
    // the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile
});

app.get('/public', function(req, res){
    res.sendFile('public/css/style.css', {root: __dirname});
});

//Serve all static files
app.get('/public/:folder/:fileName', function(req, res){
    const folder = req.params.folder;
    const fileName = req.params.fileName;
    res.sendFile(`public/${folder}/${fileName}`, { root: __dirname });
});


app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});

//modified from: https://levelup.gitconnected.com/set-up-and-run-a-simple-node-server-project-38b403a3dc09

const file= require("fs");
function createAccount() {

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    //make sure the fields aren't empty
    if (username == "" || password == "") {
        alert("Please input a username and password to create your account.")
    }
    //get the json data
    fetch('public/data/login.json')
        .then(response => response.json())
        .then(data => {
            if (data) {
                for (let i = 0; i < data.users.length; i++) {
                    //check for dupe username
                    if (data.users[i].userName.toLowerCase() === username.toLowerCase()) {
                        alert("Username already exists, Please pick another username.")
                    }
                    else {

                        let userDataRaw = file.readFileSync("data/login.json", "utf-8");
                        let userDataParsed = JSON.parse(userDataRaw)
                        //create the new user object
                        let user = {

                            "userName": username,
                            "password": password,
                            "type": "user"
                        }
                        userDataParsed.push(user);
                        userDataRaw.stringify();
                        file.writeFileSync("public/data/login.json", userDataRaw, "utf-8");
                    }
                }
                // Redirect back to  homepage
                window.location.href = '/';
            }
            else {
                //alert an error if data isn't loaded
                alert("Error");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error logging in');
        });
}