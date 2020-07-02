const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');

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
        "begin": "npm i",
        "start": "nodemon src/server.js"
    },
    "keywords": [],
    "author": "${project_author}",
    "license": "ISC",
    "dependencies": {
        "express": "^4.17.1"
    },
    "devDependencies": {
        "nodemon": "^2.0.4"
    },
    "customGen": "simplejs"
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
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
        <link href="css/app.css" rel="stylesheet"/>
        <title>${project_name}</title>
    </head>
    <body>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">${project_name}</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto" id="nav-options">
                </ul>
                <ul class="navbar-nav ml-auto" id="nav-buttons">
                </ul>
            </div>
        </nav> 
        <div id="display-content" class="container">
        </div>
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
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
        fs.writeFileSync(`./${project_name}/public/css/app.css`,
`
`,
        (err) => {
            if(err){
                throw Error('Error, can not create public/css/app.css file.')
            }
        });
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
const nav_options = document.querySelector('#nav-options');
const nav_buttons = document.querySelector('#nav-buttons');

const pageNoAuth = () => {
    display_content.innerHTML = generateDisplayContent('noAuth');
    let queryParams = new URLSearchParams(window.location.search);
    if(queryParams.get('content') == null){
        queryParams.set('content', 'home');
        history.replaceState(null, null, "?"+queryParams.toString());
    }else if(queryParams.get('content') == "info"){
        changeView("info", "home");
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
                <div class="row">
                    <div class="col-12">
                        <div class="jumbotron">
                            <h1 class="display-4">Hello, world!</h1>
                            <p class="lead">Welcome to Simple Js.</p>
                            <hr class="my-4">
                            <p>Please check this simple example to know how to work with your new framework.</p>
                            <a class="btn btn-primary btn-lg" href="#" onclick="changeView('info', 'home');">More information</a>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-4">
                        <div class="card">
                            <div class="card-body text-center">
                                <h5 class="card-title">Simple</h5>
                                <h6 class="card-subtitle mb-2 text-muted">In simplicity are the possibilities</h6>
                                <p class="card-text">By eliminating complex code and focusing on the purity of javascript we can go far on the web.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card">
                            <div class="card-body text-center">
                                <h5 class="card-title">Pure Js</h5>
                                <h6 class="card-subtitle mb-2 text-muted">No more than what is needed</h6>
                                <p class="card-text">By keeping the javascript basic and scalable, you can create complex and accessible structures for beginners.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card">
                            <div class="card-body text-center">
                                <h5 class="card-title">Unlimited alternatives</h5>
                                <h6 class="card-subtitle mb-2 text-muted">Integrations anywhere</h6>
                                <p class="card-text">In the simple are the possibilities and infinity of APIs based on javasacript can help grow your project, without worrying about incompatibilities.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="info" style="display: none;">
                <div class="row">
                    <div class="col-12">
                        <div class="jumbotron">
                            <h1 class="display-4">Now is your turn</h1>
                            <p class="lead">to do exceptional and scalable things!</p>
                            <hr class="my-4">
                            <p>You can help us to make the web more simple and scalable for everyone.</p>
                            <a class="btn btn-primary btn-lg" href="https://github.com/neverWinters/simple-js-framework" target="_blank">Colaborate with us</a>
                        </div>
                    </div>
                </div>
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
    },
    verifyPackageJsonFile: () => {
        let packageObj = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
        if(packageObj.customGen){
            if(packageObj.customGen == "simplejs"){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    },
    createComponentFiles: (component_name) => {
        fs.mkdirSync(`./public/${component_name}`);
        fs.writeFileSync(`./public/${component_name}/index.html`,
`
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon">
        <link rel="icon" href="../favicon.ico" type="image/x-icon">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
        <link href="../css/app.css" rel="stylesheet"/>
        <title>${component_name}</title>
    </head>
    <body>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">${component_name}</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto" id="nav-options">
                </ul>
                <ul class="navbar-nav ml-auto" id="nav-buttons">
                </ul>
            </div>
        </nav> 
        <div id="display-content" class="container">
        </div>
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
        <script src="js/component.js"></script>
        <script src="js/auth.js"></script>
    </body>
</html>
`,
        (err) => {
            if(err){
                throw Error(`Error, can not create public/${component_name}/index.html file.`)
            }
        });
        fs.mkdirSync(`./public/${component_name}/js`);
        fs.writeFileSync(`./public/${component_name}/js/auth.js`,
`
// Work here your authentication flow
`,
        (err) => {
            if(err){
                throw Error(`Error, can not create public/${component_name}/index.html file.`)
            }
        });
        fs.writeFileSync(`./public/${component_name}/js/auth.js`,
`
// Work here your Simple Js authentication flow!
`,
        (err) => {
            if(err){
                throw Error(`Error, can not create public/${component_name}/js/auth.js file.`)
            }
        });
        fs.writeFileSync(`./public/${component_name}/js/component.js`,
`
// Work here your private component Simple Js!
`,
        (err) => {
            if(err){
                throw Error(`Error, can not create public/${component_name}/js/component.js file.`)
            }
        });
    }
}