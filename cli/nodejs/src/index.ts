#!/usr/bin/env node
import { Cli, Builtins } from 'clipanion';
import { Metadata } from './utils.js';
import config from './config.js';
import * as commands from './commands.js';

// Define CLI and add commands
async function main() {
    await config.init();
    const { version, name, description } = await Metadata();

    
    // Definings cli
    const cli = new Cli({
        binaryLabel: description,
        binaryName: name.replace("-cli", ""),
        binaryVersion: version
    });


    // Registering commmands
    cli.register(Builtins.HelpCommand);
    cli.register(Builtins.VersionCommand);
    Object.values(commands).map((command) => cli.register(command));


    // If there are no arguments MainCommand runs
    if (process.argv.length <= 2) {
        await cli.runExit([], {
            stdin: process.stdin,
            stdout: process.stdout,
            stderr: process.stderr,
        });
    }
    // Process CLI arguments
    else {
        await cli.runExit(process.argv.slice(2), {
            stdin: process.stdin,
            stdout: process.stdout,
            stderr: process.stderr,
        });
    }
}

main();
