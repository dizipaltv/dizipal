const { BrowserWindow, app, ipcMain, nativeTheme } = require('electron');
const { Alert, Api, Config } = require("./components");
const { LoadingScreen, MainScreen } = require("./screens");
const { Menus } = require('./menus');
const path = require('path');

let LOADING_ISDONE = false;

function setLoadingIsDone(isDone) {
  LOADING_ISDONE = isDone;
  if (LOADING_ISDONE) {
    const siteURL = Config.getInformation.currentSiteURL;
      console.log(`✓ app.whenReady —▶ Config.DIZIPAL variable has been updated with Config.information, here are the new variable values; \n${JSON.stringify(Config.DIZIPAL)}`);
      if (siteURL) {
        console.log(`✓ app.whenReady —▶ Current Site URL updated, current site url : ${siteURL}`);
        MainScreen.createWindow(siteURL);
      } else {
        MainScreen.createWindow(path.join(__dirname, "settings.html"));
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

if (require('electron-squirrel-startup')) {
  app.quit();
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

ipcMain.handle('get-package-info', () => {
  return Config.getPackageInfo;
});

ipcMain.handle('get-package-version', () => {
  return app.getVersion();
});

ipcMain.handle('versions', () => {
  return {
    dizipal: app.getVersion(),
    sistem: process.platform,
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron
  }
});

ipcMain.handle('get-dizipal', () => {
  return Config.getInformation;
});

ipcMain.handle('get-api-url', async () => {
  return await Api.getCurrentSiteURL();
});

ipcMain.handle('get-loaded-url', () => {
  return MainScreen.window.webContents.getURL();
});

ipcMain.on('loading-is-done', (event, decision) => {
  setLoadingIsDone(decision);
})

ipcMain.on('set-dizipal', (event, json) => {
  Config.setInformation(json);
});

ipcMain.on('notification', (event, options) => {
  Alert.show_notification(options);
});

ipcMain.on('restart-app', () => {
  app.relaunch();
  app.exit(0);
});

ipcMain.on('close-menu', (event, menu) => {
  const closeMenu = Menus.close();
  if (closeMenu.hasOwnProperty(menu)) {
    closeMenu[menu]();
  } else {
    console.error(`Menü "${menu}" bulunamadı.`);
  }
});

ipcMain.on('reload-url', (event, url, blockAds) => {
  MainScreen.reload(url, blockAds);
});

ipcMain.on('connection', (event, online) => {
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
});
