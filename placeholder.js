#!/usr/bin/env node
const fs = require("node:fs/promises");
const path = require("node:path");

class Placeholder {
    static async cpAbout() {
        const folder = path.join(__dirname, "Dizipal");
        const tFolder = path.join(__dirname, "src");

        await fs.copyFile(path.join(folder, "about.html"), path.join(tFolder, "about.html"));
        console.log("order başarıyla çalıştı! about.html dosyası başarıyla kopyalandı")

        await fs.rm(folder, { recursive: true });
        console.log(`${folder} klasörü başarıyla temizlendi!`);
    }
}

if (require.main === module) {
    Placeholder.cpAbout();
}