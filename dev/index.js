const { BrowserWindow, app, ipcMain, nativeTheme } = require('electron');
const { Alert, Api, Config } = require("./components");
const { LoadingScreen, MainScreen } = require("./screens");
const path = require('path');

if (require('electron-squirrel-startup')) {
  app.quit();
}

app.on('ready', () => {
  LoadingScreen.show();
});

app.whenReady().then(() => {
  nativeTheme.themeSource = "dark";

  console.log(`✅ [--app.whenReady--] - Config.DIZIPAL variable has been updated with Config.information, here are the new variable values; \n${JSON.stringify(Config.DIZIPAL)}`);
  if (Config.DIZIPAL.currentSiteURL) {
    console.log(`✅ [--app.whenReady--] - Current Site URL updated, current site url : ${Config.DIZIPAL.currentSiteURL}`);
    MainScreen.createWindow(Config.DIZIPAL.currentSiteURL);
  } else {
    MainScreen.createWindow(path.join(__dirname, "settings.html"));
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      MainScreen.createWindow(Config.DIZIPAL.currentSiteURL);
    }
  });

  MainScreen.window.once('ready-to-show', () => {
    setTimeout(() => {
      LoadingScreen.destroy();
      MainScreen.show();
    }, 2000);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('get-package-info', () => {
  return Config.getPackageInfo;
})

ipcMain.handle('get-dizipal', () => {
  return Config.getInformation;
});

ipcMain.handle('get-api-url', async () => {
  return await Api.getCurrentSiteURL();
});

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