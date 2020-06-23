const fs = require('fs');
const path = require('path');

module.exports = {
    getCurrentDirectoryBase: () => {
        return path.basename(process.cwd());
    },
    directoryExists: (filePath) => {
        return fs.existsSync(filePath);
    },
    createDirectory: (filePath) => {
        fs.mkdirSync(filePath);
    },
    createProjectFiles: (project_name, project_description, project_author) => {
        fs.writeFileSync(`./${project_name}/package.json`, 
`{
    "name": "${project_name}",
    "version": "1.0.0",
    "description": "${project_description}",
    "main": "src/server.js",
    "scripts": {
        "test": "echo \\"Error: no test specified\\" && exit 1"
    },
    "keywords": [],
    "author": "${project_author}",
    "license": "ISC",
    "dependencies": {
        "express": "^4.17.1"
    }
}`,
        (err) => {
            if(err){
                throw Error('Error, can not create package.json file.')
            }
        });
        fs.mkdirSync(`./${project_name}/src`);
        fs.writeFileSync(`./${project_name}/src/server.js`, 
`
//Install express server
const express = require('express');
const app = express();

//Uncomment this to activate production redirect to https
// app.use((req, res, next) => {
//     if (req.headers['x-forwarded-proto'] !== 'https'){
//         return res.redirect('https://' + req.headers.host + req.url);
//     }else{
//         return next();
//     }
// });

app.use(express.static('public'));

app.get('/', function(req,res) {
    res.sendFile('public/index.html');
});

app.get('/room', function(req,res) {
    res.sendFile('public/room/index.html');
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 4200);
`,
        (err) => {
            if(err){
                throw Error('Error, can not create src/server.js file.')
            }
        });
        fs.mkdirSync(`./${project_name}/public`);
        fs.writeFileSync(`./${project_name}/public/index.html`,
`
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon">
    <link rel="icon" href="../favicon.ico" type="image/x-icon">
    <link href="../css/app.css" rel="stylesheet"/>
    <title>${project_name}</title>
  </head>
  <body>
    <div id="display-content">
    </div>
    <script src="js/app.js"></script>
    <script src="js/auth.js"></script>
  </body>
</html>
`,
        (err) => {
            if(err){
                throw Error('Error, can not create public/index.html file.')
            }
        });
        fs.mkdirSync(`./${project_name}/public/css`);
        fs.mkdirSync(`./${project_name}/public/js`);
        fs.writeFileSync(`./${project_name}/public/js/auth.js`,
`
pageNoAuth();
`,
    	(err) => {
            if(err){
                throw Error('Error, can not create public/js/app.js file.')
            }
        });
        fs.writeFileSync(`./${project_name}/public/js/app.js`,
`
const display_content = document.querySelector('#display-content');

const pageNoAuth = () => {
    display_content.innerHTML = generateDisplayContent('noAuth');
    let queryParams = new URLSearchParams(window.location.search);
    if(queryParams.get('content') == null){
        queryParams.set('content', 'home');
        history.replaceState(null, null, "?"+queryParams.toString());
    }else if(queryParams.get('content') == "second"){
        changeView("second", "home");
    }else{
        changeView(queryParams.get('content'), "home");
    }
}

const pageAuth = () => {
    display_content.innerHTML = generateDisplayContent('auth');
    let queryParams = new URLSearchParams(window.location.search);
    if(queryParams.get('content') == null){
        queryParams.set('content', 'home_secure');
        history.replaceState(null, null, "?"+queryParams.toString());
    }else if(queryParams.get('content') == "second_secure"){
        changeView("second_secure", "home_secure");
    }else{
        changeView(queryParams.get('content'), "home_secure");
    }
}

const changeView = (view, last) => {
    let div_hide = document.querySelector(\`#\${last}\`);
    div_hide.style.display = "none";
    let div_show = document.querySelector(\`#\${view}\`);
    div_show.style.display = "block";
    let queryParams = new URLSearchParams(window.location.search);
    queryParams.set("content", view);
    history.replaceState(null, null, "?"+queryParams.toString());
}

const generateDisplayContent = (type) => {
    let innerHTML = '';
    if(type == 'noAuth'){
        innerHTML = \`
            <div id="home">
                <h1>THIS IS THE NO AUTH HOME PAGE</h1>
                <button type="button" onclick="changeView('second', 'home')">Second</button>
            </div>
            <div id="second" style="display: none;">
                <h1>THIS IS THE NO AUTH SECOND PAGE</h1>
                <button type="button" onclick="changeView('home', 'second')">Home</button>
            </div>
        \`;
    }else if(type == 'auth'){
        innerHTML = \`
            <div id="home_secure">
                <h1>THIS IS THE AUTH HOME PAGE</h1>
                <button type="button" onclick="changeView('second_secure', 'home_secure')">Second</button>
            </div>
            <div id="second_secure" style="display: none;">
                <h1>THIS IS THE AUTH SECOND PAGE</h1>
                <button type="button" onclick="changeView('home_secure', 'second_secure')">Home</button>
            </div>
        \`;
    }
    return innerHTML;
}
`,
    	(err) => {
            if(err){
                throw Error('Error, can not create public/js/app.js file.')
            }
        });
        fs.mkdirSync(`./${project_name}/public/images`);
    }
}