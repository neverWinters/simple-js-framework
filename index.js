#!/usr/bin/env node
const clear = require('clear');
const logger = require('./lib/helpers/logger');
const inquirer = require('./lib/helpers/inquirer');
const helper = require('./lib/helpers/helper');
const create = require('./lib/commands/create');
const notAllowedCharacters = /[ `!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/;
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).usage('Usage: simplejs <command> [options]')
    .command('create', 'Create a Simple Js structure', (yargs) => {
        yargs
            .example(
                'simplejs create -t project -n test-project', 
                'simplejs create -t component -n test-component'
            )
            .positional('t', {
                describe: 'Type of Simple Js structure to create',
                alias: 'type',
                choices: ['project', 'component']
            })
            .positional('n', {
                describe: 'Simple Js structure name',
                alias: 'name',
                type: 'string'
            })
            .demandOption(['t'])
    }).argv;

clear();
logger.createVisualLog('blueBright', 'SimpleJs');

const createProject = async() => {
    let paramsObj = { projectName: '', projectAuthor: '', createMultiLanguageSupport: false };
    let information;
    if(!argv.name){
        information = await inquirer.askProjectName();
        if(!notAllowedCharacters.test(information.projectName)){ paramsObj.projectName = information.projectName; }
        else{ logger.createProcessLog('Error', 'red', 'project name has not allowed characters.'); }
    }else{
        if(!notAllowedCharacters.test(argv.name)){ paramsObj.projectName = argv.name; }
        else{ logger.createProcessLog('Error', 'red', 'project name has not allowed characters.'); }
    }
    paramsObj.projectName = helper.formatProjectName(paramsObj.projectName);
    information = await inquirer.askProjectAuthor();
    paramsObj.projectAuthor = information.projectAuthor;
    let projectOptions = await inquirer.askProjectCreationOptions();
    if(projectOptions.createMultiLanguageSupport){ paramsObj.createMultiLanguageSupport = projectOptions.createMultiLanguageSupport; }
    let createCommand = await create.createProject(paramsObj);
    if(createCommand.error){ 
        logger.createProcessLog('Error', 'red', createCommand.error);
        return;
    }
    logger.createProcessLog('Success', 'green', 'project created successfully.');
}

const createComponent = async() => {
    let paramsObj = { componentName: '', authenticationType: '' };
    let information;
    if(!argv.name){
        information = await inquirer.askComponentName();
        if(!notAllowedCharacters.test(information.componentName)){ paramsObj.componentName = information.componentName; }
        else{ logger.createProcessLog('Error', 'red', 'component name has not allowed characters.'); }
    }else{
        if(!notAllowedCharacters.test(argv.name)){ paramsObj.componentName = argv.name; }
        else{ logger.createProcessLog('Error', 'red', 'component name has not allowed characters.'); }
    }
    paramsObj.componentName = helper.formatComponentName(paramsObj.componentName);
    let componentOptions = await inquirer.askComponentAuthenticationType();
    paramsObj.authenticationType = componentOptions.authenticationType;
    let createCommand = await create.createComponent(paramsObj);
    if(createCommand.error){ 
        logger.createProcessLog('Error', 'red', createCommand.error);
        return;
    }
    logger.createProcessLog('Success', 'green', 'component created successfully.');
}

switch(argv._[0]){
    case 'create':
        if(argv.type == 'project'){ createProject(); }
        if(argv.type == 'component'){ createComponent(); }
        break;
    default:
        logger.createProcessLog('Error', 'red', 'please set a valid command.');
}












