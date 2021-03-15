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
          name: 'createMultiLanguageSupport',
          type: 'confirm',
          message: 'Do you want to set multi language support?',
          default: true
        }
      ];
      return inquirer.prompt(questions);
    },
    askComponentName: () => {
      const questions = [
        {
          name: 'componentName',
          type: 'input',
          message: 'Enter your component name:',
          validate: function( value ) {
            if (value.length) {
              return true;
            } else {
              return 'Please enter your component name.';
            }
          }
        }
      ];
      return inquirer.prompt(questions);
    },
    askComponentAuthenticationType: () => {
      const questions = [
        {
          name: 'authenticationType',
          type: 'list',
          message: 'What type of authentication will the component use?',
          choices:[
            "Global",
            "Individual"
          ],
          default: "Global"
        }
      ];
      return inquirer.prompt(questions);
    }
}