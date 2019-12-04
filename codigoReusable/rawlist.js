const inquirer = require('inquirer');

inquirer
  .prompt([
    {
      type: 'rawlist',
      name: 'reptile',
      message: 'Which is better?',
      choices: ['alligator', 'crocodile'],
    },
  ])
  .then(answers => {
    console.info('Answer:', answers.reptile);
  });
