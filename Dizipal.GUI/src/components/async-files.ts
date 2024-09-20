import fs from "fs/promises";

class AsyncFile {
    static async read_file(file_name: string) {
        try {
            console.log(`✓ AsyncFile.read_file \t\t\t—▶ File ${file_name} has been read!`);
            return await fs.readFile(file_name, "utf8");
        } catch (err) {
            console.error("✕ AsyncFile.read_file \t\t\t—▶ Ups! Something went wrong!\n", err);
        }
    }

    static async rm(folder_name: string) {
        try {
            await fs.rm(folder_name, { recursive: true });
            console.log(`✓ AsyncFile.rm \t\t\t—▶ ${folder_name} deleted successfully!`);
        } catch (err) {
            console.error("✕ AsyncFile.rm \t\t\t—▶ Ups! Something went wrong!\n", err);
        }
    }

    static async copy_file(target_file: string, destination_file: string) {
        try {
            await fs.copyFile(target_file, destination_file);
            console.log(`✓ AsyncFile.copy_file \t\t\t—▶ File ${target_file} has been copied!`);
        } catch (err) {
            console.error("✕ AsyncFile.copy_file \t\t\t—▶ There was a problem executing!\nAn error occurred while copying the file!\n", err);
        }
    }

    static async write_file(file_name: string, content: any) {
        try {
            await fs.writeFile(file_name, content, "utf8");
            console.log(`✓ AsyncFile.write_file \t\t\t—▶ File ${file_name} has been written!`);
        } catch (err) {
            console.error("✕ AsyncFile.write_file \t\t\t—▶ There was a problem executing!\nAn error occurred while writing the file!\n", err);
        }
    }

    static async file_there(file_name: string) {
        try {
            await fs.access(file_name, fs.constants.F_OK);
        } catch (err) {
            console.error("✕ AsyncFile.file_there \t\t\t—▶ Ups! Something went wrong!\n", err);
        }
    }

    static async make_dir(dir_name: string) {
        try {
            await fs.mkdir(dir_name, { recursive: true });
            console.log(`✓ AsyncFile.make_dir \t\t\t—▶ Directory ${dir_name} has been created!`);
        } catch (err) {
            console.error("✕ AsyncFile.make_dir \t\t\t—▶ There was a problem while running!\nAn error occurred while creating the folder.\n", err);
        }
    }

    static async read_dir(dir_name: string) {
        try {
            console.log(`✓ AsyncFile.read_dir \t\t\t—▶ Directory ${dir_name} has been read!`);
            return await fs.readdir(dir_name);
        } catch (err) {
            console.error("✕ AsyncFile.read_dir \t\t\t—▶ There was a problem while running!\nAn error occurred while reading the directory.\n", err);
        }
    }

    static async read_json(file_name: string) {
        try {
            const data = await AsyncFile.read_file(file_name);
            console.log(`✓ AsyncFile.read_json \t\t\t—▶ File ${file_name} has been read!`);
            return JSON.parse(data);
        } catch (err) {
            console.error(`✕ AsyncFile.read_json \t\t\t—▶ Ups! Something went wrong on filer/AsyncFile.js\n${err}`);
        }
    }

    static async update_json(file_name: string, content: any) {
        try {
            await fs.writeFile(file_name, JSON.stringify(content, null, 2), "utf8");
            console.log(`✓ AsyncFile.update_json \t\t\t—▶ Json File ${file_name} has been updated!`);
        } catch (err) {
            console.error(`✕ AsyncFile.update_json \t\t\t—▶ Ups! Something went wrong!\n ${err}`);
        }
    }
}

export default AsyncFile;