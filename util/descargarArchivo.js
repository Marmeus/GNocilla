let net = require("net");
let fs = require("fs");
const folder = "./descargas/";
exports.Descargar = function (archivo, ip, puerto) {
    return new Promise((resolve, reject) => {
        let fileStream = fs.createWriteStream(folder+archivo);
        let client = net.Socket();

        client.on('data', (data) => {
            fileStream.write(data);
        });

        client.on('end', () => {
            fileStream.end();
            client.end();
        });

        client.connect(puerto,ip, () => {
            resolve();
        });
    });
};
exports.Solicitar_Descarga = function(archivo, ip) {
    return new Promise((resolve, reject) => {
        let client = net.Socket();

        client.on('data', (data) => {
            let json = JSON.parse(data.toString());
            client.end();
            resolve(json.port);
        });

        client.connect(42069, ip, () => {
            client.write(JSON.stringify({
                tipo: "SOLICITUD_DESCARGA",
                archivo
            }));
        });
    });
};