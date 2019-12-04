let { Ping } = require("./ping");

async function main() {
    console.log(await Ping("localhost"));
}

main();