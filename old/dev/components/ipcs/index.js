const { ipcMain } = require("electron");

class Ipcs {
  static parse({
                 setLoadingIsDone,
                 setDizipal,
                 showNotification,
                 getPackageInfo,
                 getCurrentSiteURL,
                 getTwitterAdress,
                 getInformation,
                 reloadURL,
                 restartApp,
                 appVersion,
                 connection,
                 closeMenu,
                 mainURL,
               } = {}) {
    ipcMain.on('set-dizipal', (event, json) => {
      try {
        setDizipal(json);
      } catch (error) {
        console.error('Error in set-dizipal:', error);
      }
    });

    ipcMain.on('notification', (event, options) => {
      try {
        showNotification(options);
      } catch (error) {
        console.error('Error in notification:', error);
      }
    });

    ipcMain.on('restart-app', () => {
      try {
        restartApp();
      } catch (error) {
        console.error('Error in restart-app:', error);
      }
    });

    ipcMain.on('close-menu', (event, menu) => {
      try {
        closeMenu(menu);
      } catch (error) {
        console.error('Error in close-menu:', error);
      }
    });

    ipcMain.on('reload-url', (event, url, blockAds) => {
      try {
        reloadURL(url, blockAds);
      } catch (error) {
        console.error('Error in reload-url:', error);
      }
    });

    ipcMain.on('loading-is-done', (event, decision) => {
      try {
        setLoadingIsDone(decision);
      } catch (error) {
        console.error('Error in loading-is-done:', error);
      }
    });

    ipcMain.on('connection', (event, online) => {
      try {
        connection(online);
      } catch (error) {
        console.error('Error in connection:', error);
      }
    });

    ipcMain.handle('get-package-info', async () => {
      try {
        return await getPackageInfo();
      } catch (error) {
        console.error('Error in get-package-info:', error);
        return null; // Or handle the error as needed
      }
    });

    ipcMain.handle('get-package-version', () => {
      return appVersion;
    });

    ipcMain.handle('get-twitter-adress', async () => {
      try {
        return await getTwitterAdress();
      } catch (error) {
        console.error('Error in api:', error);
        return null; // Or handle the error as needed
      }
    });

    ipcMain.handle('versions', () => {
      return {
        dizipal: appVersion,
        sistem: process.platform,
        node: process.versions.node,
        chrome: process.versions.chrome,
        electron: process.versions.electron
      };
    });

    ipcMain.handle('get-dizipal', () => {
      try {
        return getInformation();
      } catch (error) {
        console.error('Error in get-dizipal:', error);
        return null; // Or handle the error as needed
      }
    });

    ipcMain.handle('get-api-url', async () => {
      try {
        return await getCurrentSiteURL();
      } catch (error) {
        console.error('Error in get-api-url:', error);
        return null; // Or handle the error as needed
      }
    });

    ipcMain.handle('get-loaded-url', () => {
      try {
        return mainURL();
      } catch (error) {
        console.error('Error in get-loaded-url:', error);
        return null; // Or handle the error as needed
      }
    });
  }
}

module.exports = Ipcs;
