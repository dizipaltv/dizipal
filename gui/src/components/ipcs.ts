import { ipcMain } from "electron";

interface IpcsParseInterface {
  setLoadingIsDone: (decision: boolean) => void;
  setDizipal: (json: object) => void;
  notification: (options: object) => void;
  getPackageInfo: () => any;
  getInformation: () => any;
  getCurrentSiteURL: () => Promise<string>;
  getTwitterAdress: () => Promise<string>;
  reloadURL: (url: string, blockAds: boolean) => void;
  restartApp: () => void;
  appVersion: () => string;
  connection: (online: boolean) => void;
  closeMenu: (menu: string) => void;
  mainURL: () => string;
}


class Ipcs {
  static parse(method: IpcsParseInterface) {
    ipcMain.on('set-dizipal', (json: object) => {
      try {
        method.setDizipal(json);
      } catch (error) {
        console.error('Error in set-dizipal:', error);
      }
    });

    ipcMain.on('notification', (options: object) => {
      try {
        method.notification(options);
      } catch (error) {
        console.error('Error in notification:', error);
      }
    });

    ipcMain.on('restart-app', () => {
      try {
        method.restartApp();
      } catch (error) {
        console.error('Error in restart-app:', error);
      }
    });

    ipcMain.on('close-menu', (event, menu) => {
      try {
        method.closeMenu(menu);
      } catch (error) {
        console.error('Error in close-menu:', error);
      }
    });

    ipcMain.on('reload-url', (event, url, blockAds) => {
      try {
        method.reloadURL(url, blockAds);
      } catch (error) {
        console.error('Error in reload-url:', error);
      }
    });

    ipcMain.on('loading-is-done', (event, decision) => {
      try {
        method.setLoadingIsDone(decision);
      } catch (error) {
        console.error('Error in loading-is-done:', error);
      }
    });

    ipcMain.on('connection', (event, online) => {
      try {
        method.connection(online);
      } catch (error) {
        console.error('Error in connection:', error);
      }
    });

    ipcMain.handle('get-package-info', async () => {
      try {
        return await method.getPackageInfo();
      } catch (error) {
        console.error('Error in get-package-info:', error);
        return null; // Or handle the error as needed
      }
    });

    ipcMain.handle('get-package-version', () => {
      return method.appVersion;
    });

    ipcMain.handle('get-twitter-adress', async () => {
      try {
        return await method.getTwitterAdress();
      } catch (error) {
        console.error('Error in api:', error);
        return null; // Or handle the error as needed
      }
    });

    ipcMain.handle('versions', () => {
      return {
        dizipal: method.appVersion,
        sistem: process.platform,
        node: process.versions.node,
        chrome: process.versions.chrome,
        electron: process.versions.electron
      };
    });

    ipcMain.handle('get-dizipal', () => {
      try {
        return method.getInformation();
      } catch (error) {
        console.error('Error in get-dizipal:', error);
        return null; // Or handle the error as needed
      }
    });

    ipcMain.handle('get-api-url', async () => {
      try {
        return await method.getCurrentSiteURL();
      } catch (error) {
        console.error('Error in get-api-url:', error);
        return null; // Or handle the error as needed
      }
    });

    ipcMain.handle('get-loaded-url', () => {
      try {
        return method.mainURL();
      } catch (error) {
        console.error('Error in get-loaded-url:', error);
        return null; // Or handle the error as needed
      }
    });
  }
}

export default Ipcs;