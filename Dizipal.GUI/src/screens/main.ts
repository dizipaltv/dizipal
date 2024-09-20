import {BrowserWindow, session, Menu} from "electron";
import {AdBlocker, Config, Paths} from "../components";
import {Menus} from "../menus";

interface URLInterface {
  url: string
}

class MainScreen {
  static window: any;

  static createWindow(url: string) {
    MainScreen.window = new BrowserWindow({
      width: 1024,
      height: 768,
      titleBarOverlay: true,
      show: false,
      icon: Paths.icon,
      webPreferences: {
        preload: Paths.preload
      }
    });

    Menu.setApplicationMenu(Menus.default);

    MainScreen.reload(url);

    MainScreen.window.webContents.executeJavaScript(`
    (function() {
        window.addEventListener('offline', async () => {
            console.log('Bağlantı kesildi.');
            await window.electronAPI.connection(false);
        });
    })();
`);


    MainScreen.window.webContents.setWindowOpenHandler(({ url }: URLInterface) => {
      if (url.startsWith('http')) {
        MainScreen.reload(url);
        return {action: 'deny'};
      }
      return {action: 'deny'};
    });

    MainScreen.window.on("enter-full-screen", () => {
      MainScreen.window.setMenu(null);
    });

    MainScreen.window.on("leave-full-screen", () => {
      MainScreen.window.setMenu(Menus.default);
    });
  }

  static show() {
    if (MainScreen.window) {
      MainScreen.window.show();
    }
  }

  static destroy() {
    if (MainScreen.window) {
      MainScreen.window.destroy();
      MainScreen.window = null;
    }
  }

  static reload(url = Config.getInformation.currentSiteURL, blockAds = Config.getInformation.adBlocker) {
    if (blockAds) {
      AdBlocker.blockURLs(session);
      AdBlocker.blockAds(MainScreen.window);
    }
    MainScreen.window.loadURL(url);
  }
}

export default MainScreen;
