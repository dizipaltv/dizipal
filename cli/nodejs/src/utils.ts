import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { Logil } from 'logil';
import config from './config.js';
import * as path from 'path';
import os from 'os';



/***  TYPES  ***/
export interface BaseConfig {
    latestCLI: string | undefined,
    currentSiteURL: string | undefined,
    firstProcess: number
}


/***  VARIABLES  ***/
// @ts-ignore: no problem
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export const __baseapi = "https://raw.githubusercontent.com/dizipaltv/api/main/dizipal.json";
export const __configdir = path.join(os.homedir(), ".config");
export const __configfile = path.join(__configdir, "dizipal.json");
export let __baseconfig: BaseConfig = {
    latestCLI: undefined,
    currentSiteURL: undefined,
    firstProcess: 0
}



/***  LOGIL  ***/
export const log = new Logil({
    prefix: "izipal",
    icon: "ↇ",
    level: 0
});



/***  METADATA  ***/
export async function Metadata() {
    try {
        const data = await fs.readFile(path.join(__dirname, "..", "package.json"), "utf-8");
        return JSON.parse(data);
    } catch (error: any) {
        log.error("An error occurred while reading the package.json file:", error.message);
        throw error;
    }
}



/***  CHECKER  ***/
class Checker {
    async check_config_dir() {
        await fs.access(__configdir, fs.constants.F_OK)
            .then(() => { })
            .catch(async () => {
                await fs.mkdir(__configdir);
            });
    }

    async check_config_file() {
        let file_is_here: boolean = false;
        await fs.access(__configfile, fs.constants.F_OK)
            .then(() => {
                file_is_here = true;
            })
            .catch(async () => {
                file_is_here = false;
                await config.update();
            });
        return file_is_here;
    }

    async check_first_process() {
        if (__baseconfig.firstProcess === 0) {
            await this.#fetch_api();
            __baseconfig.firstProcess = 1;
        }
    }

    async #fetch_api() {
        try {
            const response = await fetch(__baseapi);

            if (response.status === 200) {
                if (response.body) {
                    const inner = await response.json();

                    if (
                        typeof inner === "object" &&
                        typeof inner.currentSiteURL === "string" &&
                        typeof inner.latestCLI === "string"
                    ) {
                        __baseconfig.currentSiteURL = inner.currentSiteURL;
                        __baseconfig.latestCLI = inner.latestCLI;
                    }
                }
            }
        } catch (err: any) {
            log.error("Something went wrong! on the fetching api.");
        }
    }
}

export const checker = new Checker();
