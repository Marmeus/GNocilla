let net = require("net");
exports.Ping = function(ip) {
    return new Promise((resolve, reject) => {
        let client = net.Socket();
        let start, end;
        client.connect(42069, ip, () => {
            client.write(
                JSON.stringify({ tipo: "REBANADADE" }),
                () => {
                    start = new Date();
                });
        });
        client.on('data', (data) => {
            end = new Date();
            client.end();
            resolve(end - start);
        });
        client.on('error', () => {
            resolve(Infinity);
        });
    });
};