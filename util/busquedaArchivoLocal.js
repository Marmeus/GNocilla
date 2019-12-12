const fs = require('fs');
const folder = './sandwichDeGNocilla/';

module.exports = function (buscando) {
    return new Promise((resolve, reject) => {
        let archivos = [];
        fs.readdir(folder, function (err, files) {
            //handling error
            if (err)
                reject("No se pudo leer el directorio.");

            //listing all files using forEach
            files.forEach(function (fileName) { 
                let size = fs.statSync(folder+fileName).size;
                if (fileName.includes(buscando)) {
                    archivos.push({
                        fileName,
                        size
                    });
                }
            });
            resolve(archivos);
        });
    });
};