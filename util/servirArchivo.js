let net = require("net");
let fs = require("fs");
const folder = './sandwichDeGNocilla/';
module.exports = function(archivo) {
    return new Promise((resolve, reject) => {
        this.server = net.createServer();
    
        this.server.on("connection", (socket) => {
            let fileStream = fs.createReadStream(folder+archivo);

            fileStream.on('open', () => {
                fileStream.pipe(socket);
            });
            fileStream.on('end', () => {
                socket.end();
                server.close();
            });
        });
    
        this.server.listen(0, () => {
            resolve(server);
        });
    });
}