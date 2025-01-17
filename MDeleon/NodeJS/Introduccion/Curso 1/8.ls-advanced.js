const fs = require('node:fs/promises');
const path = require('node:path')
const pc = require('picocolors');   

const folder = process.argv[2] || '.';  

async function ls(folder) { 
    let file
    try {
        file = await fs.readdir(folder);
    } catch{
        console.error('Error leyendo el directorio: $ {folder}');   
        process.exit(1);
    }

    const filesPromises = files.map(async file => { 
        const filePath = path.join(folder, file);
        let stats;

        try {
            stats = await fs.stat(filePath);
        } catch {   
            console.error('Error obteniendo los datos del archivo: $ {filePath}');   
            process.exit(1);
        }
    }); 
}
