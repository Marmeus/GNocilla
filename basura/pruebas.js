let server = require("./servirArchivo");
main();
async function main () {
    let s = await server("asdf.txt");
    console.log(s.address().port);
}