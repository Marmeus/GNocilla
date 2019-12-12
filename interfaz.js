let servidor = require("./42069");
let lista = require("./lista");
let inquirer = require("inquirer");
let fs = require("fs");
let { Descargar, Solicitar_Descarga } = require("./util/descargarArchivo");

const folder = 'sandwichDeGNocilla/';

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

async function busqueda(){
	return inquirer.prompt([ 
		{
			type: 'input',
			name: 'archivo',
			message: 'Archivo a buscar: ',
		}
	]);
}
function archivos(choices) {
    return inquirer.prompt([{
        type: 'list',
        name: 'archivo',
        message: 'Escoge un archivo',
        choices
    }]);
}
// INTERFAZ DEL MENU
async function promptOpciones() { 
    return inquirer.prompt([
          {
                type: 'list',
                name: 'menu',
                message: 'Elige una opción',
                choices: ['Buscar ficheros', 'Mostrar archivos disponibles','Mostrar archivos compartidos','Creditos','Salir'],
          } 
    ]);
}
async function credits(){
	console.log("\nDesarrollado por:\n* Jesús Ródenas\n* Miguel Garcia\n* Daniel arraez\n* Carlos Borrell\n");
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
		console.log("  "+i+") "+ fileName + ": " + size +" Bytes");
		++i;
	});
	//ESPACIADO ENTRE MENU
	console.log();
}
async function menu() {
    while(true){
        let respuestaMenu = (await promptOpciones()).menu;	
        switch(respuestaMenu){
            case 'Buscar ficheros': 
                let archivo = (await busqueda()).archivo;
                await lista.iniciarBusqueda(archivo);
                break;
            case 'Mostrar archivos disponibles':
                let ar = lista.getArchivos();
                for(let i = 0; i < ar.length; i++) {
                    ar[i].value = `${ar[i].archivo.fileName}_${ar[i].archivo.size}_${ar[i].ip}`;
                }
                let x =  (await archivos(ar)).archivo.split("_");
                let filename = x[0];
                let remote = x[2];
                let port = await Solicitar_Descarga(filename,remote);
                await Descargar(filename,remote,port);

                break;
            case 'Mostrar archivos compartidos':
                ListarArchivosCompartidos();
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
		//SOLICITAMOS LA IP DE UN NODO GNOCILLA
		let ipNodoPrimario = (await obtenerTerminal("Introduzca la IP de un nodo GNOCILLA: ")).respuesta;
		//SOLICITAMOS LA IP LOCAL DEL USUARIO
        let ipLocal = (await obtenerTerminal("Introduzca su IP local: ")).respuesta;
        //Colocar las ips
        lista.setMy_ip(ipLocal);
        lista.anyadirALista(ipNodoPrimario);
		//EJECUTAMOS
		menu();
	}catch(error){console.log(error);}
}
main();