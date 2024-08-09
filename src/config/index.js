const { Sync } = require("../filer");
const os = require("node:os");
const path = require("node:path");

class Config {
    static BASIC_CONFIGS = {
        "currentSiteURL": "https://dizipal738.com",
        "latestAdress": 738
    }
    static CONFIG_FOLDER = path.join(os.homedir(), 'AppData', 'Roaming', 'Dizipal');
    static CONFIG_FILE = path.join(Config.CONFIG_FOLDER, ".dizipalrc");
    static check() {
        try {
            // if config folder not exist 
            Sync.make_dir(Config.CONFIG_FOLDER);
            console.log(`ℹ️ [--config.Config.check--] - The ${Config.CONFIG_FOLDER} folder has been created again.`);

            // if not exist config file
            if (!Sync.file_there(Config.CONFIG_FILE)) {
                Sync.update_json(Config.CONFIG_FILE, Config.BASIC_CONFIGS);
            }

            console.log(`✅ [--config.Config.check--] - All checked passed!`);
        } catch (err) {
            console.error(`❌ [--config.Config.check--] - An error occurred: ${err.message}`);
        } 
    }

    static setInformation(json) {
        Config.check();
        Sync.update_json(Config.CONFIG_FILE, json);
        console.log(`✅ [--config.Config.setInformation--] - successfully setted informations!`);
    }

    static get getInformation() {
        Config.check();
        console.log(`✅ [--config.Config.getInformation--] - Getting informations!`);
        return Sync.read_json(Config.CONFIG_FILE);
    }
}

module.exports = {
    Config,
}