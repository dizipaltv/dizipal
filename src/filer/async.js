const fs = require("node:fs").promises;

class Async {
    static async read_file(file_name) {
        try {
            console.log(`✅ [--filer.Async.read_file--] - File ${file_name} has been read!`);
            return await fs.readFile(file_name, "utf8");
        } catch (err) {
            console.error("❌ [--filer.Async.read_file--] - Ups! Something went wrong!\n", err);
        }
    }

    static async rm(folder_name) {
        try {
            await fs.rm(folder_name, { recursive: true });
            console.log(`✅ [--filer.Async.rm--] - ${folder_name} deleted successfully!`);
        } catch (err) {
            console.error("❌ [--filer.Async.rm--] - Ups! Something went wrong!\n", err);
        }
    }

    static async copy_file(target_file, destination_file) {
        try {
            await fs.copyFile(target_file, destination_file);
            console.log(`✅ [--filer.Async.copy_file--] - File ${target_file} has been copied!`);
        } catch (err) {
            console.error("❌ [--filer.Async.copy_file--] - There was a problem executing!\nAn error occurred while copying the file!\n", err);
        }
    }

    static async write_file(file_name, content) {
        try {
            await fs.writeFile(file_name, content, "utf8");
            console.log(`✅ [--filer.Async.write_file--] - File ${file_name} has been written!`);
        } catch (err) {
            console.error("❌ [--filer.Async.write_file--] - There was a problem executing!\nAn error occurred while writing the file!\n", err);
        }
    }

    static async file_there(file_name) {
        try {
            fs.access(file_name, fs.constants.F_OK, () => {
                if (err) {
                    console.error("❌ [--filer.Async.file_there--] - File is not there");
                } else {
                    console.log(`✅ [--filer.Async.file_there--] - File ${file_name} is there!`);
                }
                return err;
            });
        } catch (err) {
            console.error("❌ [--filer.Async.file_there--] - Ups! Something went wrong!\n", err);
        }
    }

    static async make_dir(dir_name) {
        try {
            await fs.mkdir(dir_name, { recursive: true });
            console.log(`✅ [--filer.Async.make_dir--] - Directory ${dir_name} has been created!`);
        } catch (err) {
            console.error("❌ [--filer.Async.make_dir--] - There was a problem while running!\nAn error occurred while creating the folder.\n", err);
        }
    }

    static async read_dir(dir_name) {
        try {
            console.log(`✅ [--filer.Async.read_dir--] - Directory ${dir_name} has been read!`);
            return await fs.readdir(dir_name);
        } catch (err) {
            console.error("❌ [--filer.Async.read_dir--] - There was a problem while running!\nAn error occurred while reading the directory.\n", err);
        }
    }

    static async read_json(file_name) {
        try {
            const data = await Async.read_file(file_name);
            console.log(`✅ [--filer.Async.read_json--] - File ${file_name} has been read!`);
            return JSON.parse(data);
        } catch (err) {
            console.error(`❌ [--filer.Async.read_json--] - Ups! Something went wrong on filer/async.js\n${err}`);
        }
    }

    static async update_json(file_name, content) {
        try {
            await fs.writeFile(file_name, JSON.stringify(content, null, 2), "utf8");
            console.log(`✅ [--filer.Async.update_json--] - Json File ${file_name} has been updated!`);
        } catch (err) {
            console.error(`❌ [--filer.Async.update_json--] - Ups! Something went wrong!\n ${err}`);
        }
    }
}

module.exports = {
    AsyncFiles: Async,
};