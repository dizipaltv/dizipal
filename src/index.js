const { app, BrowserWindow, session } = require('electron');
const path = require('node:path');
const { ElectronBlocker } = require('@cliqz/adblocker-electron');
const fetch = require('cross-fetch'); // Required by adblocker-electron

const { currentSiteUrl } = require('./dizipal.config');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      icon: path.join(__dirname, "icons", "icon.png")
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(currentSiteUrl);
};

app.whenReady().then(() => {
  // Set up ad blocker
  ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
    blocker.enableBlockingInSession(session.defaultSession);
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});