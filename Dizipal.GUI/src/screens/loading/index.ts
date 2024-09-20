import { Paths } from '../../components';
import { BrowserWindow } from "electron";
import path from "path";


class LoadingScreen {
    static window: any;
    
    static createWindow() {
        LoadingScreen.window = new BrowserWindow({
            width: 600,
            height: 300,
            titleBarStyle: 'hidden',
            show: false,
            webPreferences: {
                preload: path.join(Paths.workdir, "preload.js")
            }
        });

        LoadingScreen.window.once('ready-to-show', () => {
            LoadingScreen.window.show();
        });

        LoadingScreen.window.loadFile(path.join(__dirname, "index.html"));
    }

    static show() {
        if (!LoadingScreen.window) {
            LoadingScreen.createWindow();
        }
    }

    static destroy() {
        if (LoadingScreen.window) {
            LoadingScreen.window.destroy();
            LoadingScreen.window = null;
        }
    }
}

export default LoadingScreen;