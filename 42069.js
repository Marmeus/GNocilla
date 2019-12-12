let net = require("net");
let lista = require("./lista");
let servirArchivo = require("./util/servirArchivo");

let server = net.createServer();
server.on('connection',(socket) => {
    let addr = socket.remoteAddress;
    //console.log("Conectado ", addr, socket.remoteFamily);
    socket.on('end', () => {
        socket.end();
    });
    socket.on('data', async (data) => {
        try {
            let json = JSON.parse(data.toString());
            switch(json.tipo) {
                case "REBANADADE":
                    socket.write("GNOCILLA");
                    if(!lista.estaEnLista(addr));
                        lista.anyadirALista(addr);
                    break;
                case "BUSCA":
                    if(json.ttl > 0) {
                        json.ttl--;
                        await lista.procesarBusqueda(json);
                    }
                    break;
                case "VECINOS":
                    socket.write(JSON.stringify(lista.getLista()));
                    break;
                case "ARCHIVOS_DISPONIBLES":
                    json.archivos.forEach(a => {
                        lista.anyadirArchivo(a,addr);
                    });
                    break;
                case "SOLICITUD_DESCARGA":
                    let server = await servirArchivo(json.archivo);
                    let port = server.address().port;
                    socket.write(JSON.stringify({
                        estado: "OK",
                        port
                    }));
                    break;
                default:
                    //console.log("Default");
            }
            //console.log(json);
        } catch (error) {
            console.log("ERROR");
        }
    });
});
server.listen(42069);