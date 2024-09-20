import teno from "teno";
import prompts from "prompts";
import cloudscraper from "cloudscraper";
import semver from 'semver';
import config from '../config.js';
import { exec } from 'child_process';
import {
    __baseconfig,
    Metadata,
    log
} from '../utils.js';


interface MetadataInterface {
    name: string,
    version: string
}

class Upgrade {
    // search for update and update config
    async check_for_updates({ version, name }: MetadataInterface) {
        try {
            log.info("~b,wb Checking for updates...~");
            const response = await fetch(`https://registry.npmjs.org/${name}`);
            if (response.status === 200) {
                const data: any = await response.json();
                const latestVersion = data["dist-tags"].latest;

                if (
                    semver.valid(version) &&
                    semver.valid(latestVersion)
                ) {
                    if (semver.lt(version, latestVersion)) {
                        __baseconfig.latestCLI = latestVersion;
                        await config.update();
                        teno.draw({ verticalLineIcon: "", console: true, colors: true }, `~b,wb Update Available!!~ ~l ${version}->https://npmjs.com/package/${name}/v/${version}~ -> ~l ${latestVersion}->https://npmjs.com/package/${name}/v/${latestVersion}~`);
                        return true;
                    } else {
                        log.info("You are up to date.");
                        return false;
                    }
                } else {
                    throw new Error("Invalid version format from registry.");
                }
            } else {
                throw new Error(`Failed to fetch data from npm registry. Status code: ${response.status}`);
            }
        } catch (error: any) {
            log.error("An error occurred during the update check:");
            console.error(error.message);
            return false;
        }
    }

    // Scan the config and download updates based on changed values.
    // skip_pms = skip package manager selection
    async now(skip_pms: boolean = false) {
        const { name, version } = await Metadata();

        await this.check_for_updates({
            name: name,
            version: version
        });

        const content = await config.read();

        if (
            semver.valid(version) &&
            semver.valid(content.latestCLI) &&
            semver.lt(version, content.latestCLI)
        ) {
            let choice: boolean;
            
            if (skip_pms) {
                choice = true;
            } else {
                choice = await this.#pms();
            }

            if (choice) {
                log.info(`Updating to ~l ${content.latestCLI}->https://npmjs.com/package/${name}/v/${content.latestCLI}~ ...`);
                exec(`npm i -g dizipal-cli@${content.latestCLI}`, (error, stderr, stdout) => {
                    if (error) {
                        log.error("Something went wrong! Dizipal-cli has not been updated. Please try again.");
                        console.error(stderr);
                        return;
                    }

                    log.nice(`Dizipal Successfully updated to ~l ${version}->https://npmjs.com/package/${name}/v/${version}~ -> ~l ${content.latestCLI}->https://npmjs.com/package/${name}/v/${content.latestCLI}~`);
                    console.log(stdout);
                })
            }
        }
    }


    // package manager selection
    async #pms() {
        const response = await prompts({
            type: "toggle",
            name: "pms",
            message: "Are you sure you want to download this package globally via npm?",
            initial: true,
            active: "yes",
            inactive: "no"
        });

        return response.pms;
    }
}

const upgrade = new Upgrade();

export default upgrade;
