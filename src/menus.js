const {BrowserWindow, shell, Menu} = require("electron");
const path = require("path");

class Menus {
    static #len = 0;
    static #aboutWindow = null; // AboutWindow örneğini saklayacak alan
    static #isMac = process.platform === "darwin";

    static get default() {
        return Menu.buildFromTemplate([
            {
                label: 'File',
                submenu: [
                    Menus.#isMac ? { role: "close" } : { role: 'quit' }
                ]
            },
            {
                label: 'Edit',
                submenu: [
                    { role: 'undo' },
                    { role: 'redo' },
                    { type: 'separator' },
                    { role: 'cut' },
                    { role: 'copy' },
                    { role: 'paste' },
                    { type: 'separator' },
                    { role: 'selectall' }
                ]
            },
            {
                label: "View",
                submenu: [
                    { role: "reload" },
                    { role: "forceReload" },
                    { role: 'toggleDevTools' }
                ]
            },
            {
                label: 'Help',
                submenu: [
                    {
                        label: 'About',
                        click() {
                            Menus.assert();
                            Menus.AboutWindow();
                        }
                    }
                ]
            }
        ]);
    }

    static AboutWindow() {
        if (Menus.#aboutWindow) {
            // Zaten açık bir pencere varsa, o pencereyi ön planda yap
            Menus.#aboutWindow.focus();
            return;
        }

        Menus.assert();
        Menus.#len += 1;

        Menus.#aboutWindow = new BrowserWindow({
            width: 400,
            height: 200,
            title: 'About',
            icon: path.join(__dirname, "app", "icons", "png", "info.png"),
            modal: true,
            parent: BrowserWindow.getFocusedWindow(),
            resizable: false,
            minimizable: false,
            maximizable: false,
            backgroundColor: "#000000",
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                preload: path.join(__dirname, 'preload.js')
            }
        });

        Menus.#aboutWindow.loadFile(path.join(__dirname, "about.html"));

        Menus.#aboutWindow.webContents.setWindowOpenHandler(({ url }) => {
            if (url.startsWith('https:')) {
                shell.openExternal(url);
            }
            return { action: 'deny' };
        });

        Menus.#aboutWindow.setMenu(null);

        Menus.#aboutWindow.on('closed', () => {
            Menus.#aboutWindow = null; // Pencere kapatıldığında referansı temizle
            Menus.#len -= 1;
        });
    }

    static close() {
        if (Menus.#aboutWindow) {
            Menus.#aboutWindow.close();
        }
    }

    static assert() {
        if (Menus.#len > 0) {
            throw new Error(
                `Maximum number of windows reached ${Menus.#len}`
            );
        }
    }

    static get length() {
        return Menus.#len;
    }
}

module.exports = {
    Menus,
}