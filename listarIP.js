
const fs = require('fs');

//quiza convenga formatear la salida para que no sea el csv tal cual ¿?
fs.readFile('allList.csv', 'utf8', function (err, data) {
  var content = data.split(/\r?\n/);
  console.log(content);
});