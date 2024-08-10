const { BrowserWindow, shell, Menu } = require("electron");
const path = require("path");

class Menus {
    static #aboutWindow = null;
    static #settingsWindow = null;
    static #isMac = process.platform === "darwin";

    static get default() {
        return Menu.buildFromTemplate([
            {
                label: 'Dizipal',
                submenu: [
                    {
                        label: "Ayarlar",
                        click() {
                            Menus.SettingsWindow();
                        }
                    },
                    {
                        label: 'Hakkında',
                        click() {
                            Menus.AboutWindow();
                        }
                    },
                    Menus.#isMac ? { role: "close", label: "Çıkış" } : { role: 'quit', label: "Çıkış" }
                ]
            },
            {
                label: 'Düzenle',
                submenu: [
                    { role: 'undo', label: "Geri Al" },
                    { role: 'redo', label: "Yinele" },
                    { type: 'separator' },
                    { role: 'cut', label: "Kes" },
                    { role: 'copy', label: 'Kopyala' },
                    { role: 'paste', label: "Yapıştır" },
                    { type: 'separator' },
                    { role: 'selectall', label: "Tümünü Seç" }
                ]
            },
            {
                label: "Görünüm",
                submenu: [
                    { role: "reload", label: "Sayfayı Yenile" },
                    { role: "forceReload", label: "Sayfayı Zorla Yenile" },
                    { role: 'toggleDevTools', label: "Geliştirici Konsolunu Aç" }
                ]
            }
        ]);
    }

    static get develop() {
        return Menu.buildFromTemplate([
            {
                label: "Görünüm",
                submenu: [
                    { role: "reload", label: "Sayfayı Yenile" },
                    { role: "forceReload", label: "Sayfayı Zorla Yenile" },
                    { role: 'toggleDevTools', label: "Geliştirici Konsolunu Aç" }
                ]
            }
        ]);
    }

    static AboutWindow() {
        if (Menus.#aboutWindow) {
            Menus.#aboutWindow.focus();
            return;
        }

        Menus.#aboutWindow = new BrowserWindow({
            width: 350,
            height: 350,
            icon: path.join(__dirname, "..", "icons", "icon.png"),
            modal: true,
            show: false,
            backgroundColor: '#ef4444',
            parent: BrowserWindow.getFocusedWindow(),
            resizable: false,
            minimizable: false,
            maximizable: false,
            webPreferences: {
                preload: path.join(__dirname, "about", 'preload.js'),
            }
        });

        Menus.#aboutWindow.loadFile(path.join(__dirname, "about", "index.html"));

        Menus.#aboutWindow.webContents.setWindowOpenHandler(({ url }) => {
            if (url.startsWith('https:')) {
                shell.openExternal(url);
            }
            return { action: 'deny' };
        });

        Menus.#aboutWindow.on('ready-to-show', () => {
            Menus.#aboutWindow.show();
        });

        Menus.#aboutWindow.setMenu(null);

        Menus.#aboutWindow.on('closed', () => {
            Menus.#aboutWindow = null;
        });
    }

    static SettingsWindow() {
        if (Menus.#settingsWindow) {
            Menus.#settingsWindow.focus();
            return;
        }

        Menus.#settingsWindow = new BrowserWindow({
            width: 650,
            height: 420,
            icon: path.join(__dirname, "..", "icons", "icon.png"),
            modal: true,
            backgroundColor: '#ef4444',
            parent: BrowserWindow.getFocusedWindow(),
            resizable: false,
            minimizable: false,
            maximizable: false,
            show: false,
            webPreferences: {
                preload: path.join(__dirname, "settings", 'preload.js'),
            }
        });

        Menus.#settingsWindow.loadFile(path.join(__dirname, "settings", "index.html"));

        Menus.#settingsWindow.webContents.setWindowOpenHandler(({ url }) => {
            if (url.startsWith('https:')) {
                shell.openExternal(url);
            }
            return { action: 'deny' };
        });

        Menus.#settingsWindow.setMenu(null);

        Menus.#settingsWindow.on('ready-to-show', () => {
            Menus.#settingsWindow.show();
        });

        Menus.#settingsWindow.on('closed', () => {
            Menus.#settingsWindow = null;
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