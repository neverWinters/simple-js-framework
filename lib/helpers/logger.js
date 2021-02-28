const chalk = require('chalk');
const figlet = require('figlet');

module.exports = {
    createVisualLog: (color, message) => {
        console.log(
            chalk[color](
              figlet.textSync(message, { horizontalLayout: 'full' })
            )
        );
    },
    createProcessLog: async(type, color, message) => {
        console.log(chalk[color](`${type}: ${message}`));
    }
};