#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');
const argv = require('minimist')(process.argv.slice(2));
const inquirer = require('./lib/inquirer');

clear();
console.log(
    chalk.blue(
        figlet.textSync('Simple-Js', { horizontalLayout: 'full' })
    )
);

const mainAsyncProc = async() => {
    let project_name;
    let project_description;
    let project_author;
    switch(argv._[0]) {
        case 'create':
            if(argv._[1]){
                project_name = argv._[1];
            }else{
                const askInfo = await inquirer.askProjectName();
                project_name = askInfo.name;
                project_description = askInfo.description;
                project_author = askInfo.author;
            }
            if(!files.directoryExists(`./${project_name}`)){
                files.createDirectory(`./${project_name}`);
                if(!files.directoryExists(`./${project_name}`)){
                    console.log(
                        chalk.red('Error, can not create the project folder.')
                    );
                }else{
                    try{
                        files.createProjectFiles(project_name, project_description, project_author);
                    }catch(error){
                        console.log(
                            chalk.red('Error: ' + error)
                        );
                    }
                }
            }else{
                console.log(
                    chalk.red('Error, there is already a project or folder with that name in the current folder')
                );
            }
          break;
        default:
          console.log(
              chalk.red('Error!')
          );
          break;
    } 
}


if(argv._[0] != null){
    mainAsyncProc().then(() => {
        process.exit();
    });
}



