const inquirer = require('inquirer');
var sync = require('synchronize')
let respuestaMenu;
let IP;

//MENU PARA OBTERNER LA IP DEL PRIMER NODO
async function ipPorParametro(){
	return inquirer.prompt([ 
		{
			type: 'input',
			name: 'menuIP',
			message: 'Introduce la IP de un nodo GNOCILLA: ',
		}
	]);
}
	


//MENU PARA OBTENER QUE FUNCION SE VA USAR
async function menu1() { 
return inquirer.prompt([
      {
            type: 'list',
            name: 'menu',
            message: 'Elige una opción',
            choices: ['Buscar ficheros', 'Mostrar archivos disponibles','Mostrar archivos compartidos','Help','Creditos'],
      },  
])
}

async function mainSwitch(opcion){

}

async function main(){
	try{
		let ip = (await ipPorParametro()).menuIP;
		console.log("IP escrita: ",ip);
		let respuestaMenu = (await menu1()).menu;	
		mainSwitch();
		console.log(Fu: ",respuestaMenu);
	
	}catch(error){console.log(error);}
}
main();
