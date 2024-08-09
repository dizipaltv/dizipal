const fs = require("node:fs");

class Sync {
    static read_file(file_name) {
        try {
            console.log(`✅ [--filer.Sync.read_file--] - File ${file_name} has been read!`);
            return fs.readFileSync(file_name, "utf8");
        } catch (err) {
            console.error("❌ [--filer.Sync.read_file--] - Ups! Something went wrong!\n", err);
        }
    }

    static rm(folder_name) {
        try {
            fs.rmSync(folder_name, { recursive: true });
            console.log(`✅ [--filer.Sync.rm--] - ${folder_name} deleted successfully!`);
        } catch (err) {
            console.error("❌ [--filer.Sync.rm--] - Ups! Something went wrong!\n", err);
        }
    }

    static copy_file(target_file, destination_file) {
        try {
            fs.copyFileSync(target_file, destination_file);
            console.log(`✅ [--filer.Sync.copy_file--] - File ${target_file} has been copied!`);
        } catch (err) {
            console.error("❌ [--filer.Sync.copy_file--] - There was a problem executing!\nAn error occurred while copying the file!\n", err);
        }
    }

    static write_file(file_name, content) {
        try {
            fs.writeFileSync(file_name, content, "utf8");
            console.log(`✅ [--filer.Sync.write_file--] - File ${file_name} has been written!`);
        } catch (err) {
            console.error("❌ [--filer.Sync.write_file--] - There was a problem executing!\nAn error occurred while writing the file!\n", err);
        }
    }

    static file_there(file_name) {
        try {
            const isThere = fs.existsSync(file_name);
            if (isThere) {
                console.log(`✅ [--filer.Sync.file_there--] - File ${file_name} is there!`);
                return isThere;
            } else {
                console.error("❌ [--filer.Sync.file_there--] - File is not there");
            }
            return ;
        } catch (err) {
            console.error("❌ [--filer.Sync.file_there--] - Ups! Something went wrong!\n", err);
        }
    }

    static make_dir(dir_name) {
        try {
            fs.mkdirSync(dir_name, { recursive: true });
            console.log(`✅ [--filer.Sync.make_dir--] - Directory ${dir_name} has been created!`);
        } catch (err) {
            console.error("❌ [--filer.Sync.make_dir--] - There was a problem while running!\nAn error occurred while creating the folder.\n", err);
        }
    }

    static read_dir(dir_name) {
        try {
            console.log(`✅ [--filer.Sync.read_dir--] - Directory ${dir_name} has been read!`);
            return fs.readdirSync(dir_name);
        } catch (err) {
            console.error("❌ [--filer.Sync.read_dir--] - There was a problem while running!\nAn error occurred while reading the directory.\n", err);
        }
    }

    static read_json(file_name) {
        try {
            const data = Sync.read_file(file_name);
            console.log(`✅ [--filer.Sync.read_json--] - File ${file_name} has been read!`);
            return JSON.parse(data);
        } catch (err) {
            console.error(`❌ [--filer.Sync.read_json--] - Ups! Something went wrong on filer/async.js\n${err}`);
        }
    }

    static update_json(file_name, content) {
        try {
            fs.writeFileSync(file_name, JSON.stringify(content, null, 2), "utf8");
            console.log(`✅ [--filer.Sync.update_json--] - Json File ${file_name} has been updated!`);
        } catch (err) {
            console.error(`❌ [--filer.Sync.update_json--] - Ups! Something went wrong!\n ${err}`);
        }
    }
}

module.exports = {
    SyncFiles: Sync,
}