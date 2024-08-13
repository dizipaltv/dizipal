const { BrowserWindow, shell, Menu } = require("electron");
const { Config } = require("../components");
const path = require("path");

class Menus {
    static #aboutWindow = null;
    static #settingsWindow = null;

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
                    {
                        label: "Tarayıcıda Aç",
                        click() {
                            shell.openExternal(Config.getInformation.currentSiteURL);
                        }
                    },
                    {
                        label: 'Uygulamayı Yeniden Başlat',
                        click() {
                            App.relaunch();
                        }
                    },
                    { 
                        role: "close",
                        label: "Uygulamadan Çık"
                    }
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
                    { role: "reload", label: "Siteyi Yeniden Yükle" },
                    { role: "forceReload", label: "Siteyi Zorla Yeniden Yükle" },
                    { role: 'toggleDevTools', label: "Geliştirici Konsolunu Aç" }
                ]
            }
        ]);
    }

    static get developMenus() {
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
            width: 400,
            height: 400,
            icon: path.join(__dirname, "..", "images", "icons", "icon.png"),
            modal: true,
            show: false,
            backgroundColor: '#ef4444',
            parent: BrowserWindow.getFocusedWindow(),
            resizable: false,
            minimizable: false,
            maximizable: false,
            webPreferences: {
                preload: path.join(__dirname, "about", "preload.js")
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
            icon: path.join(__dirname, "..", "images", "icons", "icon.png"),
            modal: true,
            backgroundColor: '#ef4444',
            parent: BrowserWindow.getFocusedWindow(),
            resizable: false,
            minimizable: false,
            maximizable: false,
            show: false,
            webPreferences: {
                preload: path.join(__dirname, "..", "preload.js")
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

    static close(window) {
        if (window === "about") {
            if (Menus.#aboutWindow) {
                Menus.#aboutWindow.close();
            }
        }
        if (window === "settings") {
            if (Menus.#settingsWindow) {
                Menus.#settingsWindow.close();
            }
        }
    }
}

module.exports = {
    Menus,
}
