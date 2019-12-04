const inquirer = require('inquirer');

inquirer.prompt([
      {
            type: 'list',
            name: 'menu',
            message: 'Elige una opción',
            choices: ['Buscar ficheros', 'Mostrar archivos disponibles','Mostrar archivos compartidos','Help','Creditos'],
      },  
]).then(answers => {
	      console.info('Answer:', answers.menu);
    });
