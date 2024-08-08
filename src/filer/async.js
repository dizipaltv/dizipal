const fs = require("node:fs/promises");

class Async {
    static async read_file(file_name) {
        console.log(`[AsyncFiles.read_file] File ${file_name} has been readed!`);
        return await fs.readFile(file_name, "utf8");
    }

    static async write_file(file_name, content) {
        await fs.writeFile(file_name, content, "utf8");
        console.log(`[AsyncFiles.write_file] File ${file_name} has been writed!`);
    }
}

module.exports = {
    AsyncFiles: Async,
};