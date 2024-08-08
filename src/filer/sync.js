const fs = require("node:fs");

class Sync {
    static read_json(file_name) {
        console.log(`[SyncFiles.read_json] File ${file_name} has been readed!`);
        return JSON.parse(fs.readFileSync(file_name, "utf8"));
    }

    static update_json(file_name, content) {
        fs.writeFileSync(file_name, JSON.stringify(content, null, 2), "utf8");
        console.log(`[SyncFiles.update_json] File ${file_name} has been updated!`);
    }

    static make_dir(dir_name) {
        fs.mkdirSync(dir_name, { recursive: true });
        console.log(`[SyncFiles.make_dir] Directory ${dir_name} has been created!`);
    }
}

module.exports = {
    SyncFiles: Sync,
}