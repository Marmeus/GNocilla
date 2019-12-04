// include node fs module
var fs = require('fs');
// appendFile function with filename, content and callback function
 fs.appendFile('newfile_2.txt', 'Learn Node FS module', function (err) {
 if (err) throw err;
   console.log('File is created successfully.');
 });  
