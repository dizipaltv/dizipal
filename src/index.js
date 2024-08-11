const { app, BrowserWindow, session, ipcMain, Menu, nativeTheme } = require('electron');
const { Api } = require("./api");
const { Menus } = require("./menus");
const { AdBlocker } = require("./adblocker");
const { Config } = require("./config");
const { Loading } = require("./loading");
const path = require('path');

if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;
let DIZIPAL = Config.getInformation;

const createWindow = (url) => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false,
    webPreferences: {
      icon: path.join(__dirname, "icons", "icon.png")
    },
  });

  AdBlocker.blockURLs(session);
  AdBlocker.blockAds(mainWindow);
  
  mainWindow.loadURL(url);

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) {
      mainWindow.loadURL(url);
      return { action: 'deny' };
    }
    return { action: 'deny' };
  });
};

const mainPanel = () => {
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
}

app.on('ready', () => {
  Loading.show();
});

app.whenReady().then(() => {
  mainPanel();

  mainWindow.once('ready-to-show', () => {
    setTimeout(() => {
      Loading.destroy();
      mainWindow.show();
    }, 4000);
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

ipcMain.on('set-dizipal', (event, json) => {
  Config.setInformation(json);
});

ipcMain.handle('get-api-url', async () => {
  return await Api.getCurrentSiteURL();
});

ipcMain.on('restart-app', () => {
  app.relaunch();
  app.exit(0);
});