import { BrowserWindow, app, nativeTheme } from 'electron';
import { Api, Alert, Config, Ipcs, Paths } from './components';
import { ShowNotificationInterface } from './components/alert';
import { LoadingScreen, MainScreen } from './screens';
import { Menus } from './menus';
import path from 'path';

type LoadingIsDoneType = true | false;

let LOADING_ISDONE: LoadingIsDoneType = false;

function setLoadingIsDone(isDone: LoadingIsDoneType) {
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

type MenuType = "about" | "settings";

Ipcs.parse({
  setLoadingIsDone: (decision: boolean) => setLoadingIsDone(decision),
  setDizipal: (json: object) => Config.setInformation(json),
  notification: (options: ShowNotificationInterface) => Alert.show_notification(options),
  reloadURL: (url: string, blockAds: boolean) => MainScreen.reload(url, blockAds),
  getPackageInfo: () => Config.getPackageInfo,
  getInformation: () => Config.getInformation,
  getCurrentSiteURL: async () => await Api.getCurrentSiteURL(),
  getTwitterAdress: async () => await Api.getTwitterAdress(),
  appVersion: () => app.getVersion(),
  restartApp: () => { app.relaunch(); app.exit(0); },
  mainURL: () => MainScreen.window.webContents.getURL(),
  closeMenu: (menu: MenuType) => {
    const close_menu = Menus.close();
    if (Object.prototype.hasOwnProperty.call(close_menu, menu)) {
      close_menu[menu]();
    } else {
      console.error(`Menü "${menu}" bulunamadı.`);
    }
  },
  connection: (online: boolean) => {
    if (online) {
      app.relaunch();
      app.exit(0);
    } else {
      if (MainScreen.window && !MainScreen.window.isDestroyed()) {
        MainScreen.window.loadFile(path.join(__dirname, "pages", "no-connection", "index.html"))
          .then(() => {
            console.log("✓ Yönlendirme: no-connection sayfasına başarıyla geçildi.");
          })
          .catch((err: any) => {
            console.error("✗ Yönlendirme hatası:", err);
          });
      } else {
        console.error("✗ MainScreen.window nesnesi yok veya henüz hazır değil.");
      }
    }
  }
});