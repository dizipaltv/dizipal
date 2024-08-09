const { BrowserWindow, Menu } = require("electron");
const path = require("path");

class Loading {
    static window;
    
    static createWindow() {
        Loading.window = new BrowserWindow({
            width: 400,
            height: 200,
            frame: false,
            webPreferences: {
                preload: path.join(__dirname, "preload.js"),
                contextIsolation: true,
                nodeIntegration: false,
                icon: path.join(__dirname, "icons", "icon.png")
            }
        });

        Loading.window.loadFile(path.join(__dirname, "index.html"));
    }

    static show() {
        Loading.createWindow();
    }

    static destroy() {
        if (Loading.window) {
            Loading.window.destroy();
        }
    }
}

module.exports = {
    Loading,
}
