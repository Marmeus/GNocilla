let net = require("net");
let server = net.createServer();
server.listen(42069);

server.on('connection',(socket) => {
    let addr = socket.remoteAddress;
    console.log("Conectado ", addr, socket.remoteFamily);
    socket.on('data', (data) => {
        try {
            let json = JSON.parse(data.toString());
            switch(json.tipo) {
                case "REBANADADE":
                    socket.write("GNOCILLA");
                    break;
                case "BUSCA":
                    break;
                default:
                    console.log("Default");
            }
            console.log(json);
        } catch (error) {
            console.log("ERROR");
        }
    })
});