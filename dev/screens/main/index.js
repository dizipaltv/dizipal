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
                icon: path.join(__dirname, "..", "..", "preload.js")
            }
        });

        Menu.setApplicationMenu(Menus.default);

        if (Config.getInformation.adBlocker) {
          AdBlocker.blockURLs(session);
          AdBlocker.blockAds(MainScreen.window);
        }

        MainScreen.window.loadURL(url);

        MainScreen.window.webContents.setWindowOpenHandler(({ url }) => {
            if (url.startsWith('http')) {
              MainScreen.window.loadURL(url);
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
}

module.exports=MainScreen;