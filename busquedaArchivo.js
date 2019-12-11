const fs = require('fs');
const folder = 'sandwichDeNocilla/';
var found = false;


fs.readdir(folder, function (err, files) {
  //handling error
  if (err) {
        return console.log('Unable to scan directory: ' + err);
  } 
    //listing all files using forEach
    files.forEach(function (file) {
    // Do whatever you want to do with the file
    let fileName = file;  
    let size = fs.statSync(folder+file).size;
    if ( fileName.includes(PARAMETRO) ){
        found = true;
        //hay que sustituir el console.log por el write para enviarlo al nodo buscador
        console.log("Archivo: "+fileName+" Size: "+ size +" Bytes"); 
        //hay que obtener mi dirección según cómo se llame a este fichero js
        console.log("Dirección: "+ myIP); 
    }
  });
//si no lo hemos encontrado entre nuestros ficheros, lo buscamos en nuestra lista de conocidos
if(!found){
    //quienMerienda.csv: nombreArchivo,direccion
    fs.readFile('quienMerienda.csv', 'utf8', function (err, data) {
        var content = data.split(/\r?\n/); //revisar split porq lo he cogido de porai para leer csv
        //console.log(content);
      });

      content.forEach(function (entrada){
        var valores = entrada.split(',');
        
        if ( valores[0].includes(PARAMETRO) ){
            found = true;
            //hay que sustituir el console.log por el write para enviarlo al nodo buscador
            console.log("Archivo: "+valores[0]); //este no devuelve el tamaño
            console.log("Dirección: "+ valores[1]); 
        }
    });


}

});
