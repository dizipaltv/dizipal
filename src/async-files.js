const fs = require("node:fs/promises");

class AsyncFiles {
    static async read_file(file_name) {
        console.log(`successfully read ${file_name}!`);
        return await fs.readFile(file_name, "utf8");
    }

    static async write_file(file_name, content) {
        await fs.writeFile(file_name, content, "utf8");
        console.log(`successfully write ${file_name}!`);
    }
}

module.exports = {
    AsyncFiles,
};