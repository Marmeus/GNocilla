const fs = require('fs');
const folder = 'sandwichDeNocilla/';
//joining path of directory 
//const directoryPath = path.join(__dirname, 'Documents');
//passsing directoryPath and callback function
fs.readdir(folder, function (err, files) {
  //handling error
  if (err) {
        return console.log('Unable to scan directory: ' + err);
  } 
    //listing all files using forEach
    files.forEach(function (file) {
    // Do whatever you want to do with the file
    let fileName = file;  
    let size = fs.statSync(folder+file).size;
    console.log("Archivo: "+fileName+" Size: "+ size +" Bytes"); 
  });
});
