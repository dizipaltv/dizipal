const {BrowserWindow, shell, Menu} = require("electron");
const path = require("path");

class Menus {
    static #aboutWindow = null; // AboutWindow örneğini saklayacak alan
    static #settingsWindow = null; // settingsWindow örneğini saklayacak alan
    static #isMac = process.platform === "darwin";

    static get default() {
        return Menu.buildFromTemplate([
            {
                label: 'Dizipal',
                submenu: [
                    {
                        label: "Settings",
                        click() {
                            Menus.SettingsWindow();
                        }
                    },
                    {
                        label: 'About',
                        click() {
                            Menus.AboutWindow();
                        }
                    },
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
            }
        ]);
    }

    static AboutWindow() {
        if (Menus.#aboutWindow) {
            // Zaten açık bir pencere varsa, o pencereyi ön planda yap
            Menus.#aboutWindow.focus();
            return;
        }

        Menus.#aboutWindow = new BrowserWindow({
            width: 350,
            height: 300,
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
                preload: path.join(__dirname, "about", 'preload.js')
            }
        });

        Menus.#aboutWindow.loadFile(path.join(__dirname, "about", "index.html"));

        Menus.#aboutWindow.webContents.setWindowOpenHandler(({ url }) => {
            if (url.startsWith('https:')) {
                shell.openExternal(url);
            }
            return { action: 'deny' };
        });

        Menus.#aboutWindow.setMenu(null);

        Menus.#aboutWindow.on('closed', () => {
            Menus.#aboutWindow = null; // Pencere kapatıldığında referansı temizle
        });
    }

    static SettingsWindow() {
        if (Menus.#settingsWindow) {
            // Zaten açık bir pencere varsa, o pencereyi ön planda yap
            Menus.#settingsWindow.focus();
            return;
        }

        Menus.#settingsWindow = new BrowserWindow({
            width: 400,
            height: 200,
            title: 'Settings',
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
                preload: path.join(__dirname, "settings", 'preload.js')
            }
        });

        Menus.#settingsWindow.loadFile(path.join(__dirname, "settings", "index.html"));

        Menus.#settingsWindow.webContents.setWindowOpenHandler(({ url }) => {
            if (url.startsWith('https:')) {
                shell.openExternal(url);
            }
            return { action: 'deny' };
        });

        Menus.#settingsWindow.setMenu(Menus.default);

        Menus.#settingsWindow.on('closed', () => {
            Menus.#settingsWindow = null; // Pencere kapatıldığında referansı temizle
        });
    }

    static close() {
        if (Menus.#aboutWindow) {
            Menus.#aboutWindow.close();
        }
    }
}

module.exports = {
    Menus,
}