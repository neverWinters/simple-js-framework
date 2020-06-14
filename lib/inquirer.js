const inquirer = require('inquirer');
const files = require('./files');

module.exports = {
    askProjectName: () => {
        const questions = [
            {
                name: 'name',
                type: 'input',
                message: 'Enter a name for the project:',
                validate: function( value ) {
                    if (value.length) {
                    return true;
                    } else {
                    return 'Please enter a name for the project.';
                    }
                }
            },
            {
                name: 'description',
                type: 'input',
                message: 'Enter a description for the project:',
                validate: function( value ) {
                    if (value.length) {
                    return true;
                    } else {
                    return 'Please enter a description for the project.';
                    }
                }
            },
            {
                name: 'author',
                type: 'input',
                message: 'Enter the author name:',
                validate: function( value ) {
                    if (value.length) {
                    return true;
                    } else {
                    return 'Please enter the author name.';
                    }
                }
            }
        ]
        return inquirer.prompt(questions);
    }
};