const inquirer = require('inquirer');
var sync = require('synchronize')
let respuestaMenu;
let ipNodoPrimario;

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
async function promptOpciones() { 
return inquirer.prompt([
      {
            type: 'list',
            name: 'menu',
            message: 'Elige una opción',
            choices: ['Buscar ficheros', 'Mostrar archivos disponibles','Mostrar archivos compartidos','Help','Creditos','Salir'],
      },  
])
}
async function credits(){
	console.log("\nDesarrollado por:\n* Jesús Ródenas\n* Miguel Garcia\n* Daniel arraez\n* Carlos Borrell\n");
}
async function help(){

}
async function menu(){
while(true){
	let respuestaMenu = (await promptOpciones()).menu;	
	switch(respuestaMenu){
		case 'Buscar ficheros': 
			console.log("Buscar");
			//INTRODUCIR FUNCION BUSCAR FICHEROS
			break;
		case 'Mostrar archivos disponibles':
			console.log('Mostrar disponibles');
			//INTRODUCIR FUNCION ARCHIVOS DISPONIBLES
			break;
		case 'Mostrar archivos compartidos':
			//INTRODUCIR FUNCION DE MOTRAR ARCHIVOS COMPARTIDOS
			break;
		case 'Help':
			//INTRODUCIR
			break;
		case 'Creditos':
			credits();
			break;
		case 'Salir':
			process.exit(1);
			break;
	}
}
}

async function main(){
	try{
		let ip = (await ipPorParametro()).menuIP;
		ipNodoPrimario = ip;
		console.log("IP escrita: ",ipNodoPrimario);
		menu();
	
	}catch(error){console.log(error);}
}
main();
