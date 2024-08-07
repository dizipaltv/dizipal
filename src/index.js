const { app, BrowserWindow, session, ipcMain, Menu, shell } = require('electron');
const { setupTitlebar, attachTitlebarToWindow } = require("custom-electron-titlebar/main");
const { Menus } = require("./menus");
const path = require('path');
const fetch = require('cross-fetch');
const fs = require('fs').promises;

setupTitlebar();

if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;
let siteURL = "https://dizipal738.com";

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 1080,
    height: 960,
    show: true,
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    webPreferences: {
      sandbox: false,
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      icon: path.join(__dirname, "icons", "icon.png")
    },
    backgroundColor: '#DB2424'
  });

  try {
    const data = await fs.readFile(path.join(__dirname, 'dizipal.json'), 'utf8');
    const json = JSON.parse(data);
    if (json.currentSiteURL) {
      siteURL = json.currentSiteURL;
    }
  } catch (error) {
    console.error("Error reading dizipal.json:", error);
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  })

  mainWindow.loadURL(siteURL);

  // Add request interception to block images from specific URLs
  const filter = {
    urls: [
      '*://dizipal738.com/reklamlar/*',
      '*://hops1s.site/*',
      '*://btt-tr.hayatguzel.com/*'
    ]
  };

  session.defaultSession.webRequest.onBeforeRequest(filter, (details, callback) => {
    if (
        details.url.includes('/reklamlar/') ||
        details.url.includes('hops1s.site') ||
        details.url.includes('btt-tr.hayatguzel.com')
    ) {
      callback({ cancel: true });
    } else {
      callback({ cancel: false });
    }
  });

  attachTitlebarToWindow(mainWindow);
};

app.whenReady().then(async () => {
  // Fetch the site URL and create the window
  createWindow();

  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { type: 'separator' },
        { role: 'selectall' }
      ]
    },
    {
      label: "View",
      submenu: [
        { role: 'toggleDevTools' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click() {
            Menus.assert();
            Menus.AboutWindow();
          }
        }
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);

  // Fetch and update site URL
  try {
    let response = await fetch("https://raw.githubusercontent.com/dizipaltv/api/main/dizipal.json");
    if (response.ok) {
      let data = await response.json();
      await fs.writeFile(path.join(__dirname, 'dizipal.json'), JSON.stringify(data, null, 2));
      siteURL = data.currentSiteURL;
    } else {
      console.error("Fetch hatası: ", response.status);
    }
  } catch (error) {
    console.error("Fetch sırasında hata oluştu: ", error);
  }

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

// IPC handler for site URL
ipcMain.handle('get-site-url', async () => {
  return siteURL;
});
