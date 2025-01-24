const fs = require('node:fs/promises'); // promise

console.log('leyendo el primer archivo');
fs.readFile('./prueba.txt', 'utf-8')
    .then(text => {
        console.log('primer texto',text);
    
    });

console.log('hacer cosas mientras lee el archivo');

console.log('leyendo el segundo archivo');
fs.readFile('./prueba2.txt', 'utf-8',)
    .then(text => {
        console.log('segundo texto',text);
    });