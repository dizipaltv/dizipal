const { BrowserWindow } = require("electron");
const path = require("path");

class LoadingScreen {
    static window = null;
    
    static createWindow() {
        LoadingScreen.window = new BrowserWindow({
            width: 600,
            height: 300,
            frame: false,
            show: false,
            webPreferences: {
                preload: path.join(__dirname, "..", "..", "preload.js")
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

module.exports=LoadingScreen;
