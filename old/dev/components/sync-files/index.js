const fs = require("fs");

class SyncFile {
    static read_file(file_name) {
        try {
            console.log(`✓ SyncFile.read_file \t\t\t—▶ File ${file_name} has been read!`);
            return fs.readFileSync(file_name, "utf8");
        } catch (err) {
            console.error("✕ SyncFile.read_file \t\t\t—▶ Ups! Something went wrong!\n", err);
        }
    }

    static rm(folder_name) {
        try {
            fs.rmSync(folder_name, { recursive: true });
            console.log(`✓ SyncFile.rm \t\t\t—▶ ${folder_name} deleted successfully!`);
        } catch (err) {
            console.error("✕ SyncFile.rm \t\t\t—▶ Ups! Something went wrong!\n", err);
        }
    }

    static copy_file(target_file, destination_file) {
        try {
            fs.copyFileSync(target_file, destination_file);
            console.log(`✓ SyncFile.copy_file \t\t\t—▶ File ${target_file} has been copied!`);
        } catch (err) {
            console.error("✕ SyncFile.copy_file \t\t\t—▶ There was a problem executing!\nAn error occurred while copying the file!\n", err);
        }
    }

    static write_file(file_name, content) {
        try {
            fs.writeFileSync(file_name, content, "utf8");
            console.log(`✓ SyncFile.write_file \t\t\t—▶ File ${file_name} has been written!`);
        } catch (err) {
            console.error("✕ SyncFile.write_file \t\t\t—▶ There was a problem executing!\nAn error occurred while writing the file!\n", err);
        }
    }

    static file_there(file_name) {
        try {
            const isThere = fs.existsSync(file_name);
            if (isThere) {
                console.log(`✓ SyncFile.file_there \t\t\t—▶ File ${file_name} is there!`);
                return isThere;
            } else {
                console.error("✕ SyncFile.file_there \t\t\t—▶ File is not there");
            }
            return ;
        } catch (err) {
            console.error("✕ SyncFile.file_there \t\t\t—▶ Ups! Something went wrong!\n", err);
        }
    }

    static make_dir(dir_name) {
        try {
            fs.mkdirSync(dir_name, { recursive: true });
            console.log(`✓ SyncFile.make_dir \t\t\t—▶ Directory ${dir_name} has been created!`);
        } catch (err) {
            console.error("✕ SyncFile.make_dir \t\t\t—▶ There was a problem while running!\nAn error occurred while creating the folder.\n", err);
        }
    }

    static read_dir(dir_name) {
        try {
            console.log(`✓ SyncFile.read_dir \t\t\t—▶ Directory ${dir_name} has been read!`);
            return fs.readdirSync(dir_name);
        } catch (err) {
            console.error("✕ SyncFile.read_dir \t\t\t—▶ There was a problem while running!\nAn error occurred while reading the directory.\n", err);
        }
    }

    static read_json(file_name) {
        try {
            const data = SyncFile.read_file(file_name);
            console.log(`✓ SyncFile.read_json \t\t\t—▶ File ${file_name} has been read!`);
            return JSON.parse(data);
        } catch (err) {
            console.error(`✕ SyncFile.read_json \t\t\t—▶ Ups! Something went wrong on filer/SyncFile.js\n${err}`);
        }
    }

    static update_json(file_name, content) {
        try {
            fs.writeFileSync(file_name, JSON.stringify(content, null, 2), "utf8");
            console.log(`✓ SyncFile.update_json \t\t\t—▶ Json File ${file_name} has been updated!`);
        } catch (err) {
            console.error(`✕ SyncFile.update_json \t\t\t—▶ Ups! Something went wrong!\n ${err}`);
        }
    }
}

module.exports=SyncFile;