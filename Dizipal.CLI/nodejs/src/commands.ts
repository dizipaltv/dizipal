import { Command, Option } from 'clipanion';
import { log } from './utils.js';
import find from './commands/find.js';
import upgrade from './commands/upgrade.js';
import * as main from './commands/main.js';

class FindCommand extends Command {
    static paths = [['find']];

    latest = Option.Boolean('--latest', false, { description: 'Find the latest dizipal URL from the API.' });
    url = Option.String('--url', { description: 'Please specify the Start URL. ex: https://dizipal738.com' });
    api = Option.String('--api', { description: 'Please specify the Api URL. ex: https://raw.githubusercontent.com/dizipaltv/api/main/dizipal.json' });
    raw = Option.Boolean('--raw', false, { description: 'It only shows the current address as output' });

    static usage = Command.Usage({
        category: 'Online Commands',
        description: 'Find active DIZIPAL URL',
        details: `
            This command allows you to find the latest or specific DIZIPAL URL.
            You can use either the --latest option to find the most recent URL or
            provide a specific URL with the --url option.
        `,
        examples: [
            ['Find the latest URL', 'dizipal find --latest'],
            ['Find a specific URL', 'dizipal find --url https://dizipal738.com']
        ],
    });

    async execute() {
        if (this.latest) {
            await find.latest(this.api, this.raw);
            return;
        }
        if (this.url) {
            if (!this.url.match(/https:\/\/dizipal\d+\.\w+$/)) {
                log.error('Please specify a valid Dizipal URL!! ex: https://dizipal738.com');
                return;
            }
            await find.with_url(this.url, this.raw);
            return;
        }
        log.error('No URL specified. Use --url to specify a URL.');
    }
}

class UpgradeCommand extends Command {
    static paths = [['upgrade']];

    yes = Option.Boolean('--yes', false, { description: 'It skips the selection screen and starts downloading with the default package manager.' });

    static usage = Command.Usage({
        category: 'Online Commands',
        description: 'Upgrade to new version',
        details: `
            This command upgrades the application to the latest version.
            Use the --yes option to skip the confirmation prompt.
        `,
        examples: [
            ['Upgrade without confirmation', 'dizipal upgrade --yes'],
        ],
    });

    async execute() {
        await upgrade.now(this.yes);
    }
}

class HelpCommand extends Command {
    static paths = [['help']];

    async execute() {
        await this.cli.run(['-h']);
    }
}

class VersionCommand extends Command {
    static paths = [['version']];

    async execute() {
        await this.cli.run(['-v']);
    }
}

class MainCommand extends Command {
    static paths = [Command.Default];

    async execute() {
        await main.open_app();
    }
}

export {
    FindCommand,
    UpgradeCommand,
    HelpCommand,
    VersionCommand,
    MainCommand
}
