import { BrowserWindow, shell, Menu } from "electron";
import { Config, Paths } from '../components';
import path from "path";

interface MenuTemplateInterface {
    width: number | 200,
    height: number | 200,
    file_path: string
}

interface OpenHandlerInterface {
    url: string
}

class MenuTemplate {
    #window: any;

    WIDTH: number;
    HEIGHT: number;
    FILE_PATH: string;

    constructor(params: MenuTemplateInterface) {
        this.WIDTH = params.width;
        this.HEIGHT = params.height;
        this.FILE_PATH = params.file_path;
    }

    process() {
        if (this.#window) {
            this.#window.focus();
            return;
        }
    
        this.#window = new BrowserWindow({
            width: this.WIDTH,
            height: this.HEIGHT,
            icon: Paths.icon,
            titleBarStyle: 'hidden',
            modal: true,
            resizable: false,
            maximizable: false,
            minimizable: false,
            parent: BrowserWindow.getFocusedWindow() || undefined,
            show: false,
            webPreferences: {
                preload: Paths.icon
            }
        });
    
        this.#window.loadFile(this.FILE_PATH);
    
        this.#window.webContents.setWindowOpenHandler(({ url }: OpenHandlerInterface) => {
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

interface CloseReturnInterface {
    settings: () => void,
    about: () => void
}

export class Menus {
    static isMac: boolean = process.platform === "darwin" ? true : false;

    static settings = new MenuTemplate({ 
        width: 650,
        height: 350,
        file_path: path.join(Paths.outdir, "settings", "index.html") 
    });

    static about = new MenuTemplate({
        width: 300,
        height: 300,
        file_path: path.join(Paths.outdir, "about", "index.html")
    });

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
                    /*{
                        label: 'Uygulamayı Yeniden Başlat',
                        click() {
                            App.relaunch();
                        }
                    },*/
                    { 
                        role: Menus.isMac ? "close" : "quit",
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
                    { role: 'selectAll', label: "Tümünü Seç" }
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

    static close(): CloseReturnInterface {
        return {
            settings: () => Menus.settings.destroy(),
            about: () => Menus.about.destroy()
        };
    }
}