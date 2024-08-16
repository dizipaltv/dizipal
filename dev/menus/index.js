const { BrowserWindow, shell, Menu } = require("electron");
const { App, Config } = require("../components");
const path = require("path");

class MenuTemplate {
    #window = null;
    #paths = {
        preload: path.join(__dirname, "..", "preload.js"),
        icon: path.join(__dirname, "..", "images", "icons", "icon.png")
    }
    constructor(width = 200, height = 200, file_path) {
        this.WIDTH = width;
        this.HEIGHT = height;
        this.FILE_PATH = file_path;
    }

    process() {
        if (this.#window) {
            this.#window.focus();
            return;
        }
    
        this.#window = new BrowserWindow({
            width: this.WIDTH,
            height: this.HEIGHT,
            icon: this.#paths.icon,
            frame: false,
            modal: true,
            resizable: false,
            maximizable: false,
            minimizable: false,
            parent: BrowserWindow.getFocusedWindow() || undefined,
            show: false,
            webPreferences: {
                preload: this.#paths.preload
            }
        });
    
        this.#window.loadFile(this.FILE_PATH);
    
        this.#window.webContents.setWindowOpenHandler(({ url }) => {
            if (url.startsWith('https:')) {
                shell.openExternal(url);
            }
            return { action: 'deny' };
        });
    
        this.#window.setMenu(null);
    
        this.#window.on('ready-to-show', () => {
            this.#window.show();
        });
        
        this.#window.on('closed', () => {
            this.#window = null;
        });        
    }

    close() {
        if (this.#window) {
            this.#window.close();
        }
    }

    destroy() {
        if (this.#window) {
            this.#window.destroy();
        }
    }
}

class Menus {
    static settings = new MenuTemplate(650, 300, path.join(__dirname, "settings", "index.html"));
    static about = new MenuTemplate(350, 350, path.join(__dirname, "about", "index.html"));
    static get default() {
        return Menu.buildFromTemplate([
            {
                label: 'Dizipal',
                submenu: [
                    {
                        label: "Ayarlar",
                        click() {
                            Menus.settings.process();
                        }
                    },
                    {
                        label: 'Hakkında',
                        click() {
                            Menus.about.process();
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

    static get development() {
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

    static close() {
        return {
            "settings": () => Menus.settings.destroy(),
            "about": () => Menus.about.destroy()
        }
    }
}

module.exports = {
    Menus
}
