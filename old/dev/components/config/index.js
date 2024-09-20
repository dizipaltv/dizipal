const App = require("../app");
const SyncFile = require("../sync-files");
const path = require("path");
const os = require("os");

class Config {
    static BASIC_CONFIGS = {
        "currentSiteURL": "https://dizipal738.com",
        "adBlocker": true,
        "checkAdressOnStartup": true,
        "twitter": "https://x.com/5dizipal5"
    }
    static CONFIG_FOLDER = os.platform() === "win32" ? path.join(os.homedir(), 'AppData', 'Roaming', 'Dizipal') : os.homedir();
    static CONFIG_FILE = path.join(Config.CONFIG_FOLDER, ".dizipalrc");
    static async check() {
        try {
            // if config folder not exist 
            SyncFile.make_dir(Config.CONFIG_FOLDER);
            console.log(`‽ Config.check \t\t\t\t—▶ The ${Config.CONFIG_FOLDER} folder has been created again.`);

            // if not exist config file
            if (!SyncFile.file_there(Config.CONFIG_FILE)) {
                SyncFile.update_json(Config.CONFIG_FILE, Config.BASIC_CONFIGS);
            };

            // if basic_config keys doesn't exist
            if (SyncFile.file_there(Config.CONFIG_FILE)) {
                const _file = SyncFile.read_json(Config.CONFIG_FILE);

                // Iterate over each entry in BASIC_CONFIGS
                Object.entries(Config.BASIC_CONFIGS).forEach(([key, value]) => {
                    // Check if the key is not present in _file
                    if (!_file.hasOwnProperty(key)) {
                        // Add the key-value pair to _file
                        _file[key] = value;
                    }
                });

                // Update the CONFIG_FILE with the new content
                SyncFile.update_json(Config.CONFIG_FILE, _file);
            }


            console.log(`✓ Config.check \t\t\t\t—▶ All checked passed!`);
        } catch (err) {
            console.error(`✕ Config.check \t\t\t\t—▶ An error occurred: ${err.message}`);
        } 
    }

    static setInformation(json) {
        Config.check();
        SyncFile.update_json(Config.CONFIG_FILE, json);
        console.log(`✓ config.Config.setInformation \t\t\t—▶ successfully setted informations!`);
    }

    static get getPackageInfo() {
        return SyncFile.read_json(path.join(App.mainDir, "package.json"));
    }

    static get getInformation() {
        Config.check();
        console.log(`✓ Config.getInformation \t\t—▶ Getting informations!`);
        return SyncFile.read_json(Config.CONFIG_FILE);
    }

    static DIZIPAL = Config.getInformation;
}

module.exports=Config;
