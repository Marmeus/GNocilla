const inquirer = require('inquirer');
var sync = require('synchronize')
let respuestaMenu;
let IP;

//MENU PARA OBTERNER LA IP DEL PRIMER NODO
let menu0 = inquirer.prompt([ 
	{
		type: 'input',
		name: 'menuIP',
		message: 'Introduce la IP de un nodo GNOCILLA: ',
	}
]).then(answers => {
	IP = answers.menuIP;
});
	


//MENU PARA OBTENER QUE FUNCION SE VA USAR

let menu1 = inquirer.prompt([
      {
            type: 'list',
            name: 'menu',
            message: 'Elige una opción',
            choices: ['Buscar ficheros', 'Mostrar archivos disponibles','Mostrar archivos compartidos','Help','Creditos'],
      },  
]).then(answers => {
	let res = answers.menu;
	respuestaMenu = res;
});


async function main(){
	const result = await menu1
}
main();
