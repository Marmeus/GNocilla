let { Ping } = require("./util/ping");
let busquedaArchivoLocal = require("./util/busquedaArchivoLocal");
let ip = require('ip');
let my_ip;
let uniqid = require("uniqid");
let net = require("net");

//lista de nodos, los 10 primeros se consideran vecinos y se busca sobre ellos.
let LISTA = [];//{ip, ping}
//se almacenan las busquedas recientes, se limpia cada 10 segundos automaticamente
let BUSQUEDAS_RECIENTES = [];
//se almacenan los archivos e ips que nos reporten otros nodos como disponibles.
let ARCHIVOS = [];
exports.setMy_ip = function (ip_) {
    my_ip = ip_;
};
exports.getLista = function() {
    return LISTA;
};
exports.setLista = function(lista_) {
    LISTA = lista_;
};
exports.anyadirALista = function(ip) {
    LISTA.unshift({
        ip,
        ping: 1
    });
};
exports.anyadirAListaFondo = function (ip) {
    LISTA.push({
        ip,
        ping: Infinity
    });
};
exports.noEstaEnLista = function(ip_) {
    let r = LISTA.findIndex(e => ip.isEqual(ip_, e.ip));
    r = r == -1 && !ip.isEqual(my_ip, ip_);
    return r;
};
exports.copiarLista = function(otraLista) {
    LISTA = [];
    otraLista.forEach(e => {
        if(!ip.isEqual(my_ip, e.ip))
            LISTA.push(e);
    });
};
exports.iniciarBusqueda = function(buscando) {
    return new Promise((resolve, reject) => {
        let id = uniqid();
        BUSQUEDAS_RECIENTES.push(id);
        let mensaje = JSON.stringify({ 
            tipo: "BUSCA",
            buscando,
            origen: my_ip,
            id,
            ttl: 10
        });
        for(let i = 0; i < 10; i++) {
            if(LISTA[i]) {
                let client = net.Socket();
                client.connect(42069, LISTA[i].ip, () => {
                    client.write(mensaje, () => { client.end(); });
                });
                client.on('error', () => {});
            }
        }
        resolve(id);
    });
};
exports.procesarBusqueda = function(busqueda) {
    return new Promise(async (resolve, reject) => {
        //si no hemos procesado ya esta busqueda
        if(!BUSQUEDAS_RECIENTES.includes(busqueda.id)) {
            //invluirla en recientes
            BUSQUEDAS_RECIENTES.push(busqueda.id);
            //conectar con el origen de la busqueda para comunicarle los archivos que coinciden
            let archivos = await busquedaArchivoLocal(busqueda.buscando);
            if(archivos.length > 0) {
                let client = net.Socket();
                client.connect(42069, busqueda.origen, () => {
                    client.write(JSON.stringify({
                        tipo: "ARCHIVOS_DISPONIBLES",
                        archivos
                    }), () => { client.end(); });
                });
                client.on('error', () => {});
            }
            //enviarla a los vecinos
            let mensaje = JSON.stringify(busqueda);
            for(let i = 0; i < 10; i++) {
                if(LISTA[i]) {
                    let client = net.Socket();
                    client.connect(42069, LISTA[i].ip, () => {
                        client.write(mensaje, () => { client.end(); });
                    });
                    client.on('error', () => {});
                }
            }
        }
        resolve();
    });
};
exports.getArchivos = function() {
    return ARCHIVOS;
};
exports.limpiarArchivos = function() {
    ARCHIVOS = [];
};
exports.anyadirArchivo = function(archivo, ip) {
    ARCHIVOS.push({
        archivo,
        ip
    });
};
exports.invocarListas = function() {
    for(let i = 0; i < 10; i++) {
        if(LISTA[i]) {
            let c = net.Socket();
            c.on('error', () => {
                c.end();
            });
            c.on('data', (data) => {
                let array = JSON.parse(data.toString());
                c.end();
                for(let j = 0; j < array.length; j++) {
                    if(this.noEstaEnLista(array[j].ip))
                    this.anyadirAListaFondo(array[j].ip);
                }
            });
            c.connect(42069, LISTA[i].ip, () => {
                c.write(JSON.stringify({
                    tipo: "VECINOS"
                }));
            });
        }
    };
};
setInterval(() => {
    BUSQUEDAS_RECIENTES = [];
    LISTA.forEach(async (v) => {
        v.ping = await Ping(v.ip);
    });
    LISTA.sort((a,b) => {
        return a.ping - b.ping;
    });
}, 10 * 1000);