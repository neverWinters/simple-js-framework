const inquirer = require('inquirer');

module.exports ={
    askProjectName: () => {
      const questions = [
        {
          name: 'projectName',
          type: 'input',
          message: 'Enter your project name:',
          validate: function( value ) {
            if (value.length) {
              return true;
            } else {
              return 'Please enter your project name.';
            }
          }
        }
      ];
      return inquirer.prompt(questions);
    },
    askProjectAuthor: () => {
      const questions = [
        {
          name: 'projectAuthor',
          type: 'input',
          message: 'Author name:',
          validate: function( value ) {
            if (value.length) {
              return true;
            } else {
              return 'Please enter the author name.';
            }
          }
        }
      ];
      return inquirer.prompt(questions);
    },
    askProjectCreationOptions: () => {
      const questions = [
        {
          name: 'createBackend',
          type: 'confirm',
          message: 'Do you want to create backend folder?',
          default: true
        },
        {
          name: 'createMultiLanguageSupport',
          type: 'confirm',
          message: 'Do you want to set multi language support?',
          default: true
        }
      ];
      return inquirer.prompt(questions);
    }
}