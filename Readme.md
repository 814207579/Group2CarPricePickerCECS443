Json file with car makes/models used with permission from: https://github.com/FormidableLabs/radon-typeahead/blob/master/demo/car-models.json

If a change to scripts is made the command "Browserify 'scripts' -o bundle.js"
must be ran.

Run local server by going to the root directory and running "node .\nodeStart.mjs"
The login system will not work if it is not running as a node web server.

Update webpack bundle when script.js is changed
webpack --mode=production