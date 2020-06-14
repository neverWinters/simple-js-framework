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

app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https'){
        return res.redirect('https://' + req.headers.host + req.url);
    }else{
        return next();
    }
});

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
        fs.mkdirSync(`./${project_name}/public/css`);
        fs.mkdirSync(`./${project_name}/public/js`);
        fs.mkdirSync(`./${project_name}/public/images`);
    }
}