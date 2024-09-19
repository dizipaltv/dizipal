import { exec } from 'child_process';
import * as path from 'path';
import fs from 'fs/promises';
import os from 'os';
import { log } from '../utils.js';


export async function open_app() {
    try {
        if (process.platform === "win32") {
            const folder = path.join(os.homedir(), 'AppData', 'Local', 'Programs', 'dizipal');
            const exePath = path.join(folder, "dizipal.exe");

            await fs.access(exePath)
                .then(() => exec(`powershell.exe -Command "Start-Process '${exePath}'"`))
                .catch((err) => log.error(`Application not found! Try uploading again! ${err.message}`));
        }
        if (process.platform === "linux") {
            const folder = path.join("/opt", 'Dizipal');
            const shPath = path.join(folder, "dizipal");

            await fs.access(shPath)
                .then(() => exec(`${shPath}`))
                .catch((err) => log.error(`Application not found! Try uploading again! ${err.message}`));
        }
        if (process.platform === "darwin") {
            exec('open -a dizipal');
        }
    } catch (error: any) {
        log.error(`Genel bir hata oluştu: ${error.message}`);
    }
}
