const { BrowserWindow } = require("electron");
const path = require("path");

class Loading {
    static window;
    
    static createWindow() {
        Loading.window = new BrowserWindow({
            width: 600,
            height: 300,
            frame: false,
            show: false
        });

        Loading.window.once('ready-to-show', () => {
            Loading.window.show();
        });

        Loading.window.loadFile(path.join(__dirname, "index.html"));
    }

    static show() {
        if (!Loading.window) {
            Loading.createWindow();
        }
    }

    static destroy() {
        if (Loading.window) {
            Loading.window.destroy();
            Loading.window = null;
        }
    }
}

module.exports = {
    Loading,
}
