const { app, BrowserWindow, session, ipcMain, Menu, nativeTheme } = require('electron');
const { Menus } = require("./menus");
const { AdBlocker } = require("./adblocker");
const { SyncFiles } = require("./filer/sync");
//const { CheckFor } = require("./check-for");
const { updateElectronApp } = require('update-electron-app');
const path = require('path');

updateElectronApp();

// If squirel is running, close the program
if (require('electron-squirrel-startup')) {
  app.quit();
}


// variables
let mainWindow;
const CONFIGLOCATION = path.join(__dirname, "dizipal.json");
let DIZIPAL = SyncFiles.read_json(CONFIGLOCATION);


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

  // block ads
  AdBlocker.blockURLs(session);
  AdBlocker.blockAds(mainWindow);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  })

  // load dizipal current adress
  mainWindow.loadURL(url);

  // Prevent opening new window and use existing window
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) {
      mainWindow.loadURL(url);
      return { action: 'deny' };  // Yeni pencere açma isteğini reddet
    }
    return { action: 'deny' };
  });
};


app.whenReady().then(async () => {
  try {
    nativeTheme.themeSource = "dark";
    
    /*await CheckFor.apis('origin', 5000).then(data => {
      DIZIPAL = data;
      SyncFiles.update_json(CONFIGLOCATION, DIZIPAL);      
    });*/

    if (DIZIPAL.currentSiteURL) {
      console.log(`[app.whenReady] Current Site URL updated, current site url : ${DIZIPAL.currentSiteURL}`);
      createWindow(DIZIPAL.currentSiteURL);
    } else {
      createWindow("https://dizipal.org/");
    }
    
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow(DIZIPAL.currentSiteURL);
      }
    });

    Menu.setApplicationMenu(Menus.default);
  } catch (err) {
    console.error("[app.whenReady] Fetch Error : ", err)
  }
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


// IPC handler for site URL
ipcMain.handle('get-site-url', async () => {
  return DIZIPAL.currentSiteURL;
});
