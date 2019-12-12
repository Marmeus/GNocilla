const inquirer = require('inquirer');
const fs = require('fs');

let ipNodoPrimario;
let ipLocal;
const folder = 'sandwichDeNocilla/';


//FUNCION PARA OBTERNET COSAS A PARTIR DE LA INTERFAZ
async function obtenerTerminal(message){
	return inquirer.prompt([ 
		{
			type: 'input',
			name: 'respuesta',
			message: message,
		}
	]);
}
	


// INTERFAZ DEL MENU
async function promptOpciones() { 
return inquirer.prompt([
      {
            type: 'list',
            name: 'menu',
            message: 'Elige una opción',
            choices: ['Buscar ficheros', 'Mostrar archivos disponibles','Mostrar archivos compartidos','Creditos','Salir'],
      },  
])
}
//MUESTRA LOS AUTORES DEL PROGRAMA
async function credits(){
	console.log("\n  Desarrollado por:\n  * Jesús Ródenas\n  * Miguel Garcia\n  * Daniel arraez\n  * Carlos Borrell\n");
}

//MUESTRA LOS ARCHIVOS DISPONIBLES PARA COMPARTIR
async function ListarArchivosCompartidos(){
	//VARIABLE CON  TODOS LOS ARCHIVOS
	let files = fs.readdirSync(folder);

	//ESPACIADO ENTRE MENU
	console.log();
	
	//LISTADO DE TODOS LOS ARCHIVOS
	let i = 1;
	files.forEach(function(fileName){
		let size = fs.statSync(folder+fileName).size;
		console.log("  "+i+") "+ fileName + "Tamaño: "+ size +" Bytes");
		++i;
	});
	//ESPACIADO ENTRE MENU
	console.log();
}

//MENU 
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
			ListarArchivosCompartidos();
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
		//SOLICITAMOS LA IP DE UN NODO GNOCILLA
		ipNodoPrimario = (await obtenerTerminal("Introduzca la IP de un nodo GNOCILLA: ")).respuesta;
		//SOLICITAMOS LA IP LOCAL DEL USUARIO
		ipLocal = (await obtenerTerminal("Introduzca su IP local: ")).respuesta;
		//EJECUTAMOS
		menu();
	}catch(error){console.log(error);}
}

//EJECUTAMOS EL PROGRAMA
main();
