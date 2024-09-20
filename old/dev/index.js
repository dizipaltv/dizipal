const { BrowserWindow, app, nativeTheme } = require('electron');
const { Api, Alert, Config, Ipcs, Paths } = require("./components");
const { LoadingScreen, MainScreen } = require("./screens");
const { Menus } = require("./menus");
const path = require('path');

let LOADING_ISDONE = false;

function setLoadingIsDone(isDone) {
  LOADING_ISDONE = isDone;
  if (LOADING_ISDONE) {
    const siteURL = Config.getInformation.currentSiteURL;
    console.log(`✓ setLoadingIsDone —▶ Config.DIZIPAL variable has been updated with Config.information, here are the new variable values`);
    if (siteURL) {
      console.log(`✓ setLoadingIsDone —▶ Current Site URL updated, current site url : ${siteURL}`);
      MainScreen.createWindow(siteURL);
    } else {
      MainScreen.createWindow(Paths.noConnection);
    }

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        MainScreen.createWindow(siteURL);
      }
    });

    app.whenReady().then(() => {
      MainScreen.window.on('ready-to-show', () => {
        LoadingScreen.destroy();
        MainScreen.show();
      });
    });
  }
}

app.on('ready', () => {
  nativeTheme.themeSource = "dark";
  LoadingScreen.show();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

Ipcs.parse({
  setLoadingIsDone: (decision) => setLoadingIsDone(decision),
  setDizipal: (json) => Config.setInformation(json),
  showNotification: (options) => Alert.show_notification(options),
  reloadURL: (url, blockAds) => MainScreen.reload(url, blockAds),
  getPackageInfo: () => Config.getPackageInfo,
  getInformation: () => Config.getInformation,
  getCurrentSiteURL: async () => await Api.getCurrentSiteURL(),
  getTwitterAdress: async () => await Api.getTwitterAdress(),
  appVersion: app.getVersion(),
  restartApp: () => { app.relaunch(); app.exit(0); },
  mainURL: () => MainScreen.window.webContents.getURL(),
  closeMenu: (menu) => {
    const closeMenu = Menus.close();
    if (closeMenu.hasOwnProperty(menu)) {
      closeMenu[menu]();
    } else {
      console.error(`Menü "${menu}" bulunamadı.`);
    }
  },
  connection: (online) => {
    if (online) {
      app.relaunch();
      app.exit(0);
    } else {
      if (MainScreen.window && !MainScreen.window.isDestroyed()) {
        MainScreen.window.loadFile(path.join(__dirname, "pages", "no-connection", "index.html"))
          .then(() => {
            console.log("✓ Yönlendirme: no-connection sayfasına başarıyla geçildi.");
          })
          .catch((err) => {
            console.error("✗ Yönlendirme hatası:", err);
          });
      } else {
        console.error("✗ MainScreen.window nesnesi yok veya henüz hazır değil.");
      }
    }
  }
});
