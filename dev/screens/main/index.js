const { BrowserWindow, Menu, session } = require("electron");
const { AdBlocker, Config } = require("../../components");
const { Menus } = require("../../menus");
const path = require("path");

class MainScreen {
    static window = null;

    static createWindow(url) {
        MainScreen.window = new BrowserWindow({
            width: 1024,
            height: 768,
            show: false,
            webPreferences: {
                icon: path.join(__dirname, "..", "..", "images", "icons", "icon.png"),
                preload: path.join(__dirname, "..", "..", "preload.js")
            }
        });

        Menu.setApplicationMenu(Menus.default);

        MainScreen.reload(url);

        MainScreen.window.webContents.executeJavaScript(`window.addEventListener('offline', async () => {console.log('Bağlantı kesildi.');await window.electronAPI.connection(false);});`);

        MainScreen.window.webContents.setWindowOpenHandler(({ url }) => {
            if (url.startsWith('http')) {
              MainScreen.reload(url);
              return { action: 'deny' };
            }
            return { action: 'deny' };
          });
        
          MainScreen.window.on("enter-full-screen", () => {
            Menu.setApplicationMenu(null);
          });

          MainScreen.window.on("leave-full-screen", () => {
            Menu.setApplicationMenu(Menus.default);
          });

          MainScreen.window.on("maximize", () => {
            Menu.setApplicationMenu(Menus.default);
          });

          MainScreen.window.on("unmaximize", () => {
            Menu.setApplicationMenu(Menus.default);
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

module.exports=MainScreen;