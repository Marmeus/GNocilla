let net = require("net");
let server = net.createServer();
server.listen(42069);
var fs = require('fs');

server.on('connection',(socket) => {

    
    var addr = socket.remoteAddress;

    //hay que comprobar que no existe ya primero
    fs.appendFile('allList.txt','\n' + addr,function(err){
        if(err)throw err;
            console.log('LA CAMARA DE LOS GNOCILLOS HA SIDO ABIERTA');
    });
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
                    var s = json.cuerpo;

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