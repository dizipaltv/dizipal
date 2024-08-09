const { app, BrowserWindow, session, ipcMain, Menu, nativeTheme } = require('electron');
const { Menus } = require("./menus");
const { AdBlocker } = require("./adblocker");
const { updateElectronApp } = require('update-electron-app');
const { Config } = require("./config");
const path = require('path');

updateElectronApp();

if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;
let DIZIPAL = Config.getInformation;

const createWindow = (url) => {
  mainWindow = new BrowserWindow({
    width: 1080,
    height: 768,
    show: true,
    titleBarStyle: 'customButtonsOnHover',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      icon: path.join(__dirname, "icons", "icon.png")
    },
    backgroundColor: '#DB2424'
  });

  AdBlocker.blockURLs(session);
  AdBlocker.blockAds(mainWindow);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.loadURL(url);

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) {
      mainWindow.loadURL(url);
      return { action: 'deny' };
    }
    return { action: 'deny' };
  });
};

app.whenReady().then(() => {
  nativeTheme.themeSource = "dark";
  Menu.setApplicationMenu(Menus.default);

  console.log(`✅ [--app.whenReady--] - DIZIPAL variable has been updated with Config.information, here are the new variable values; \n${JSON.stringify(DIZIPAL)}`);

  if (DIZIPAL.currentSiteURL) {
    console.log(`✅ [--app.whenReady--] - Current Site URL updated, current site url : ${DIZIPAL.currentSiteURL}`);
    createWindow(DIZIPAL.currentSiteURL);
  } else {
    createWindow(path.join(__dirname, "settings.html"));
  }
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow(DIZIPAL.currentSiteURL);
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handler for site URL
ipcMain.handle('get-site-url', () => {
  return DIZIPAL.currentSiteURL;
});

ipcMain.handle('get-dizipal', () => {
  return Config.getInformation;
});

ipcMain.on('set-dizipal', (event, json) => {
  Config.setInformation(json);
});

ipcMain.on('restart-app', () => {
  app.relaunch();
  app.exit(0);
});
