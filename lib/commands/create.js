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
            let serverTemplate = projectTemplate.server.join('\n');
            fs.appendFileSync(`./${paramsObj.projectName}/src/server.js`, serverTemplate);
            if(paramsObj.createBackend){
                let packageJson = fs.readFileSync(`./${paramsObj.projectName}/package.json`, 'utf8');
                packageJson = JSON.parse(packageJson);
                packageJson.dependencies["joi"] = "^17.4.0",
                packageJson.dependencies["jwt-simple"] = "^0.5.6";
                packageJson.dependencies["moment"] = "^2.29.1";
                packageJson = JSON.stringify(packageJson);
                fs.writeFileSync(`./${paramsObj.projectName}/package.json`, packageJson);
            }
            return true;
        }
        catch(err){
            return { error: err.message };
        }
    }
}