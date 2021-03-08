const fs = require('fs');
projectTemplate = require('../templates/project.json');

module.exports = {
    createProject: async(paramsObj) => {
        try{
            if(!fs.existsSync(`./${paramsObj.projectName}`)){
                fs.mkdirSync(`./${paramsObj.projectName}`);
            }else{ return { error: 'project folder already exists.' }; }
            let packageJsonTemplate = projectTemplate.packageJson.join('\n');
            packageJsonTemplate = packageJsonTemplate.replace(/<--PROJECT_NAME-->/gi, paramsObj.projectName);
            packageJsonTemplate = packageJsonTemplate.replace(/<--AUTHOR_NAME-->/gi, paramsObj.projectAuthor);
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
            fs.mkdirSync(`./${paramsObj.projectName}/public`);
            fs.mkdirSync(`./${paramsObj.projectName}/public/css`);
            fs.mkdirSync(`./${paramsObj.projectName}/public/images`);
            let indexTemplate = projectTemplate.public.index.join('\n');
            indexTemplate = indexTemplate.replace(/<--PROJECT_NAME-->/gi, paramsObj.projectName);
            fs.appendFileSync(`./${paramsObj.projectName}/public/index.html`, indexTemplate);
            let appCssTemplate = projectTemplate.public.css.app.join('\n');
            fs.appendFileSync(`./${paramsObj.projectName}/public/css/app.css`, appCssTemplate);
            fs.mkdirSync(`./${paramsObj.projectName}/public/js`);
            if(paramsObj.createMultiLanguageSupport){
                let jsMultilanguageTemplate = projectTemplate.public.js.languageVariants.filter((template) => template.multiLanguageSupport == true);
                let appJsTemplate = jsMultilanguageTemplate[0].app.join('\n');
                fs.appendFileSync(`./${paramsObj.projectName}/public/js/app.js`, appJsTemplate);
                let pagesJsTemplate = jsMultilanguageTemplate[0].pages.join('\n');
                fs.appendFileSync(`./${paramsObj.projectName}/public/js/pages.js`, pagesJsTemplate);
                let globalsJsTemplate = jsMultilanguageTemplate[0].globals.join('\n');
                fs.appendFileSync(`./${paramsObj.projectName}/public/js/pages.js`, globalsJsTemplate);
                let staticJson = fs.readFileSync(`./${paramsObj.projectName}/src/conf/static.json`, 'utf8');
                staticJson = JSON.parse(staticJson);
                staticJson.push({ "name": "internationalization", "route": "/internationalization", "path": "../res" });
                staticJson = JSON.stringify(staticJson);
                fs.writeFileSync(`./${paramsObj.projectName}/src/conf/static.json`, staticJson);
                fs.mkdirSync(`./${paramsObj.projectName}/res`);
                let enLangTemplate = projectTemplate.res.en.join('\n');
                fs.appendFileSync(`./${paramsObj.projectName}/res/en.json`, enLangTemplate);
                let esLangTemplate = projectTemplate.res.es.join('\n');
                fs.appendFileSync(`./${paramsObj.projectName}/res/es.json`, esLangTemplate);
            }else{
                let jsTemplate = projectTemplate.public.js.languageVariants.filter((template) => template.multiLanguageSupport == false);
                let appJsTemplate = jsTemplate[0].app.join('\n');
                fs.appendFileSync(`./${paramsObj.projectName}/public/js/app.js`, appJsTemplate);
                let pagesJsTemplate = jsTemplate[0].pages.join('\n');
                fs.appendFileSync(`./${paramsObj.projectName}/public/js/pages.js`, pagesJsTemplate);
                let globalsJsTemplate = jsTemplate[0].globals.join('\n');
                fs.appendFileSync(`./${paramsObj.projectName}/public/js/globals.js`, globalsJsTemplate);
            }
            if(paramsObj.createBackend){
                let jsBackendTemplate = projectTemplate.public.js.backendVariants.filter((template) => template.integratedBackend == true);
                let authenticationJsTemplate = jsBackendTemplate[0].authentication.join('\n');
                fs.appendFileSync(`./${paramsObj.projectName}/public/js/authentication.js`, authenticationJsTemplate);
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
            }else{
                let jsTemplate = projectTemplate.public.js.backendVariants.filter((template) => template.integratedBackend == false);
                let authenticationJsTemplate = jsTemplate[0].authentication.join('\n');
                fs.appendFileSync(`./${paramsObj.projectName}/public/js/authentication.js`, authenticationJsTemplate);
            }
            return true;
        }
        catch(err){
            return { error: err.message };
        }
    }
}