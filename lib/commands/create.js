const fs = require('fs');
projectTemplate = require('../templates/project.json');
componentTemplate = require('../templates/component.json');

module.exports = {
    createProject: async(paramsObj) => {
        try{
            if(!fs.existsSync(`./${paramsObj.projectName}`)){
                fs.mkdirSync(`./${paramsObj.projectName}`);
            }else{ return { error: 'project folder already exists.' }; }
            let packageJsonTemplate = projectTemplate.packageJson.join('\n');
            packageJsonTemplate = packageJsonTemplate.replace(/<--PROJECT_NAME-->/gi, paramsObj.projectName);
            packageJsonTemplate = packageJsonTemplate.replace(/<--AUTHOR_NAME-->/gi, paramsObj.projectAuthor);
            packageJsonTemplate = packageJsonTemplate.replace(/<--MULTI_LANGUAGE_SUPPORT-->/gi, paramsObj.createMultiLanguageSupport ? 'true' : 'false');
            packageJsonTemplate = packageJsonTemplate.replace(/<--INTEGRATED_BACKEND-->/gi, paramsObj.createBackend ? 'true' : 'false');
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
                fs.appendFileSync(`./${paramsObj.projectName}/public/js/globals.js`, globalsJsTemplate);
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
    },
    createComponent: async(paramsObj) => {
        try{
            let projectPackageJson = fs.readFileSync(`./package.json`, 'utf8');
            projectPackageJson = JSON.parse(projectPackageJson);
            if(!projectPackageJson.customGen){ return { error: 'project was not created with simple-js-framework' }; }
            if(!fs.existsSync(`./public`)){ return { error: 'public folder does not exist in project folder' }; }
            let componentJson = fs.readFileSync(`./src/conf/component.json`, 'utf8');
            componentJson = JSON.parse(componentJson);
            componentJson.push({ "name": paramsObj.componentName, "route": `/${paramsObj.componentName}`, "path": `../public/${paramsObj.componentName}`, "fileName": "index.html" });
            componentJson = JSON.stringify(componentJson);
            fs.writeFileSync(`./src/conf/component.json`, componentJson);
            let staticJson = fs.readFileSync(`./src/conf/static.json`, 'utf8');
            staticJson = JSON.parse(staticJson);
            staticJson.push({ "name": paramsObj.componentName, "route": `/${paramsObj.componentName}`, "path": `../public/${paramsObj.componentName}` });
            staticJson = JSON.stringify(staticJson);
            fs.writeFileSync(`./src/conf/static.json`, staticJson);
            fs.mkdirSync(`./public/${paramsObj.componentName}`);
            fs.mkdirSync(`./public/${paramsObj.componentName}/css`);
            fs.mkdirSync(`./public/${paramsObj.componentName}/images`);
            let componentCssTemplate = componentTemplate.css.component.join('\n');
            fs.appendFileSync(`./public/${paramsObj.componentName}/css/component.css`, componentCssTemplate);
            fs.mkdirSync(`./public/${paramsObj.componentName}/js`);
            let jsTemplate = componentTemplate.js.authenticationVariants.filter((template) => template.authType == paramsObj.authenticationType);
            jsTemplate = jsTemplate[0].languageVariants.filter((template) => template.multiLanguageSupport == projectPackageJson.customGen.multiLanguageSupport);
            let componentJsTemplate = jsTemplate[0].component.join('\n');
            fs.appendFileSync(`./public/${paramsObj.componentName}/js/component.js`, componentJsTemplate);
            let globalsJsTemplate = jsTemplate[0].globals.join('\n');
            fs.appendFileSync(`./public/${paramsObj.componentName}/js/globals.js`, globalsJsTemplate);
            let componentLangObject = paramsObj.componentName.replace(/-/g, '_');
            componentLangObject = componentLangObject.toUpperCase();
            let pagesJsTemplate = jsTemplate[0].pages.join('\n');
            let indexTemplate = componentTemplate.index.join('\n');
            if(projectPackageJson.customGen.multiLanguageSupport){
                pagesJsTemplate = pagesJsTemplate.replace(/<--COMPONENT_NAME-->/gi, componentLangObject);
                let enLangJson = fs.readFileSync(`./res/en.json`, 'utf8');
                enLangJson = JSON.parse(enLangJson);
                enLangJson[componentLangObject] = { 
                    "NAVBAR": {
                        "SIGNIN": "Sign In",
                        "SIGNOUT": "Sign Out"
                    },
                    "HOME": {
                        "AUTHENTICATION_ERROR": "Authentication Error!",
                        "ERROR_TEXT": "You do not have permissions to see this private component."
                    },
                    "AUTHORIZED": {
                        "TITLE": "Private Component Page",
                        "TEXT_1": "This page needs global authentication process to be displayed.",
                        "TEXT_2": "Please change the principal authentication.js file to adapt it to your authentication process."
                    }
                };
                enLangJson = JSON.stringify(enLangJson);
                fs.writeFileSync(`./res/en.json`, enLangJson);
                let esLangJson = fs.readFileSync(`./res/es.json`, 'utf8');
                esLangJson = JSON.parse(esLangJson);
                esLangJson[componentLangObject] = {
                    "NAVBAR": {
                        "SIGNIN": "Ingresar",
                        "SIGNOUT": "Salir"
                    },
                    "HOME": {
                        "AUTHENTICATION_ERROR": "Error de Autenticación!",
                        "ERROR_TEXT": "No tienes permisos para ver este componente privado."
                    },
                    "AUTHORIZED": {
                        "TITLE": "Página Privada de Componente",
                        "TEXT_1": "Esta página necesita al proceso de autenticación global para ser mostrada.",
                        "TEXT_2": "Cambie el archivo authentication.js principal para adaptarlo a su proceso de autenticación."
                    }
                };
                esLangJson = JSON.stringify(esLangJson);
                fs.writeFileSync(`./res/es.json`, esLangJson);
            }
            fs.appendFileSync(`./public/${paramsObj.componentName}/js/pages.js`, pagesJsTemplate);
            indexTemplate = indexTemplate.replace(/<--COMPONENT_NAME-->/gi, paramsObj.componentName);
            if(paramsObj.authenticationType == 'Global'){ indexTemplate = indexTemplate.replace(/<--AUTHENTICATION_ROUTE-->/gi, '../js/authentication.js'); }
            else if(paramsObj.authenticationType == 'Individual'){ 
                indexTemplate = indexTemplate.replace(/<--AUTHENTICATION_ROUTE-->/gi, './js/authentication.js');
                // CREAR AUTHENTICATION.JS
            }
            fs.appendFileSync(`./public/${paramsObj.componentName}/index.html`, indexTemplate);
            return true;
        }
        catch(err){
            return { error: err.message };
        }
    }
}