const fs = require('fs');
projectTemplate = require('../templates/project.json');

module.exports = {
    createProject: async(paramsObj) => {
        try{
            if(!fs.existsSync(`./${paramsObj.projectName}`)){
                fs.mkdirSync(`./${paramsObj.projectName}`);
            }else{ return { error: 'project folder already exists.' }; }
            let packageJsonTemplate = projectTemplate.packageJson.join('\n');
            packageJsonTemplate = packageJsonTemplate.replace("<--PROJECT_NAME-->", paramsObj.projectName);
            packageJsonTemplate = packageJsonTemplate.replace("<--AUTHOR_NAME-->", paramsObj.projectAuthor);
            fs.appendFileSync(`./${paramsObj.projectName}/package.json`, packageJsonTemplate);
            let envTemplate = projectTemplate.env.join('\n');
            fs.appendFileSync(`./${paramsObj.projectName}/.env`, envTemplate);
            fs.mkdirSync(`./${paramsObj.projectName}/src`);
            fs.mkdirSync(`./${paramsObj.projectName}/src/conf`);
            let staticTemplate = projectTemplate.src.conf.static.join('\n');
            fs.appendFileSync(`./${paramsObj.projectName}/src/conf/static.json`, staticTemplate);
            let componentTemplate = projectTemplate.src.conf.component.join('\n');
            fs.appendFileSync(`./${paramsObj.projectName}/src/conf/component.json`, componentTemplate);
            let routeTemplate = projectTemplate.src.conf.route.join('\n');
            fs.appendFileSync(`./${paramsObj.projectName}/src/conf/route.json`, routeTemplate);
            let serverTemplate = projectTemplate.src.server.join('\n');
            fs.appendFileSync(`./${paramsObj.projectName}/src/server.js`, serverTemplate);
            if(paramsObj.createBackend){
                let packageJson = fs.readFileSync(`./${paramsObj.projectName}/package.json`, 'utf8');
                packageJson = JSON.parse(packageJson);
                packageJson.dependencies["joi"] = "^17.4.0",
                packageJson.dependencies["jwt-simple"] = "^0.5.6";
                packageJson.dependencies["moment"] = "^2.29.1";
                packageJson = JSON.stringify(packageJson);
                fs.writeFileSync(`./${paramsObj.projectName}/package.json`, packageJson);
                fs.mkdirSync(`./${paramsObj.projectName}/backend`);
                fs.mkdirSync(`./${paramsObj.projectName}/backend/data`);
                fs.mkdirSync(`./${paramsObj.projectName}/backend/data/schema`);
                fs.mkdirSync(`./${paramsObj.projectName}/backend/helpers`);
                fs.mkdirSync(`./${paramsObj.projectName}/backend/routes`);
                fs.mkdirSync(`./${paramsObj.projectName}/backend/routes/v1`);
            }
            if(paramsObj.createMultiLanguageSupport){
                let staticJson = fs.readFileSync(`./${paramsObj.projectName}/src/conf/static.json`, 'utf8');
                staticJson = JSON.parse(staticJson);
                staticJson.push({ "name": "internationalization", "route": "/internationalization", "path": "../res" });
                staticJson = JSON.stringify(staticJson);
                fs.writeFileSync(`./${paramsObj.projectName}/src/conf/static.json`, staticJson);
                fs.mkdirSync(`./${paramsObj.projectName}/res`);
            }
            fs.mkdirSync(`./${paramsObj.projectName}/public`);
            fs.mkdirSync(`./${paramsObj.projectName}/public/css`);
            fs.mkdirSync(`./${paramsObj.projectName}/public/js`);
            fs.mkdirSync(`./${paramsObj.projectName}/public/images`);
            return true;
        }
        catch(err){
            return { error: err.message };
        }
    }
}