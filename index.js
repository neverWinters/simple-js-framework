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
    .command('create', 'Create a simpleJs Project')
    .example('simplejs create -t <type> -n <name>', 'Create command for SimpleJs project.')
    .alias('n', 'name')
    .describe('n', 'Name')
    .alias('t', 'type')
    .describe('t', 'Type')
    .choices('t', ['project', 'component'])
    .demandOption(['t'])
    .argv;

clear();
logger.createVisualLog('blueBright', 'SimpleJs');

const createProject = async() => {
    let paramsObj = { projectName: '', projectAuthor: '', createBackend: false, createAuthenticationScript: false, createMultiLanguageSupport: false };
    if(!argv.name){
        let information = await inquirer.askProjectName();
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
    if(projectOptions.createBackend){ paramsObj.createBackend = projectOptions.createBackend; }
    if(projectOptions.createAuthenticationScript){ paramsObj.createAuthenticationScript = projectOptions.createAuthenticationScript; }
    if(projectOptions.createMultiLanguageSupport){ paramsObj.createMultiLanguageSupport = projectOptions.createMultiLanguageSupport; }
    let createCommand = await create.createProject(paramsObj);
    if(createCommand.error){ 
        logger.createProcessLog('Error', 'red', createCommand.error);
        return;
    }
    logger.createProcessLog('Success', 'green', 'project created successfully.');
}

switch(argv._[0]){
    case 'create':
        if(argv.type == 'project'){ createProject(); }
        break;
    default:
        logger.createProcessLog('Error', 'red', 'please set a valid command.');
}












