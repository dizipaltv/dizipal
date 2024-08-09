#!/usr/bin/env node
const { Async } = require("./src/filer");
const path = require("node:path");

class Placeholder {
    static async placeAllFiles() {
        console.log(`ℹ️ placeholder.js has been started...`)
        try {
            const folder = path.join(__dirname, "Dizipal");
            const destination = path.join(__dirname, "src", "menus");
    
            const files = await Async.read_dir(folder);            
                for (const file of files) {
                    const ext = path.extname(file);
                    const file_name = file.replace(ext, '');
                    const srcPath = path.join(folder, file);
                    const destPath = path.join(destination, file_name, "index.html");
                    Async.copy_file(srcPath, destPath);
                    console.log(`✅ This file ${srcPath} was successfully copied to destination ${destPath}!`)
                }
    
            await Async.rm(folder, { recursive: true });
            console.log(`✅ ${folder} folder successfully cleared!`);
        } catch (err) {
            console.error(`❌ Ups! Something went wrong on placeholder.js ${err}`);
        }
    }
}

if (require.main === module) {
    Placeholder.placeAllFiles();
}