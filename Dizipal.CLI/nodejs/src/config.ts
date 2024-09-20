import fs from 'fs/promises';
import { BaseConfig } from './utils.js';

import {
    checker,
    __configfile,
    __baseconfig,
    log
} from './utils.js';

class Config {
    // config dosyasını okumak
    async read() {
        try {
            await checker.check_config_dir();
            await checker.check_first_process();
            await checker.check_config_file();

            const file = await fs.readFile(__configfile, "utf-8");
            return JSON.parse(file);
        } catch (err: any) {
            log.error("Something went wrong! on the reading config file!");
        }
    }

    // config dosyasına veri yazmak
    // content = config content
    async update(content: BaseConfig = __baseconfig) {
        await checker.check_config_dir();
        await checker.check_first_process();

        await fs.writeFile(__configfile, JSON.stringify(content, null, 2), "utf-8");
    }


    async init() {
        await checker.check_first_process();
        if (await checker.check_config_file()) {
            return;
        } else {
            this.update();
        }
    }


    get get_config(): BaseConfig {
        return __baseconfig;
    }
}

const config = new Config();

export default config;
