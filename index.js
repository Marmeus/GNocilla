let { Ping } = require("./ping");
let LISTA = [];
async function main() {
    console.log(await Ping("localhost"));
}

main();