const {BrowserWindow, session} = require("electron");
const {AdBlocker, Config, Paths} = require("../../components");
const {Menus} = require("../../menus");

class MainScreen {
  static window = null;

  static createWindow(url) {
    MainScreen.window = new BrowserWindow({
      width: 1024,
      height: 768,
      titleBarOverlay: true,
      show: false,
      webPreferences: {
        icon: Paths.icon,
        preload: Paths.preload
      }
    });

    MainScreen.window.setMenu(Menus.default);

    MainScreen.reload(url);

    MainScreen.window.webContents.executeJavaScript(`
    (function() {
        window.addEventListener('offline', async () => {
            console.log('Bağlantı kesildi.');
            await window.electronAPI.connection(false);
        });
    })();
`);


    MainScreen.window.webContents.setWindowOpenHandler(({url}) => {
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

module.exports = MainScreen;
