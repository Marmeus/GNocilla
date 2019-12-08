let net = require("net");
let server = net.createServer();
server.listen(42069);
const fs = require('fs');

server.on('connection',(socket) => {

    
    var addr = socket.remoteAddress;


    try {
        //si el fichero con listas existe anyadimos/buscamos la direccion(asumimos que al menos tiene la primera linea csv)
        if (fs.existsSync('./allList.csv')) {

            //leemos los datos del fichero
            fs.readFile('allList.csv', 'utf8', function (err, data) {
                var content = data.split(/\r?\n/);
                //console.log(content);
              });
            //comprobamos que la ip/usuario no esté ya en la lista
            if(data.indexOf(addr) != -1){
                //si no existe se incluye la correspondiente fila
                fs.appendFile('allList.csv','\n'+'nombreUSER' + addr,function(err){
                    if(err)throw err;
                    console.log('IP incluida en la lista\n');
                }); 

            } 
            
        } else { //si no existe el fichero con todas las IP se crea 

            //se crea el fichero con la primera linea de csv
            fs.appendFile('allList.csv','usuario,ip',function(err){
                if(err)throw err;
                console.log('Fichero de direcciones creado\n');
            });
            //se incluye la correspondiente fila
            fs.appendFile('allList.csv','\n' + 'nombreUSER,' + addr,function(err){
                if(err)throw err;
                console.log('IP asociada\n');
            });

        }
    } catch(err) {
        console.error(err)
    }

    console.log('Conectado: ' + addr.address);

    //añadir a conectados
    fs.appendFile('listaMEMORIA.txt','\n' + addr,function(err){
        if(err)throw err;
            console.log('LA CAMARA DE LOS GNOCILLOS HA SIDO ABIERTA');
    });


    socket.on('data', (data) => {
        try {
            let json = JSON.parse(data.toString());
            switch(json.tipo) {
                case "REBANADADE":

                    socket.write("GNOCILLA");
                    //si no está en la lista de memoria AÑADIRLO
                    break;

                case "busqueda":
                    var s = json.cuerpo; //implementar este objeto

                    //implementar inundacion con TTL
                    //enviar a todos los de la lista de MEMORIA excepto al que te lo ha enviado
                    //tener en cuenta no enviar la misma busqueda a otros que ya la han recibido
                    
                    break;
                case "dameloTO":
                        /*
                    let listiya = //listarFicheros.js;
                    socket.write("" + listiya.toString());*/
                    break;

                default:
                    console.log("Default")
                
            }
            console.log(json);
        } catch (error) {
            console.log("ERROR")
        }
        
    })
});

server.on('close', function (socket){
    //eliminar de la lista de MEMORIA
    //implementar ELIMINACION mejor si no te responden al pin
});