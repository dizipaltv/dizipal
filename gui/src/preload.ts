// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('electronAPI', {
  getTwitterAdress: () => ipcRenderer.invoke("get-twitter-adress"),
  getDizipal: () => ipcRenderer.invoke('get-dizipal'),
  getApiURL: () => ipcRenderer.invoke('get-api-url'),
  getPackageInfo: () => ipcRenderer.invoke("get-package-info"),
  getLoadedURL: () => ipcRenderer.invoke('get-loaded-url'),
  versions: () => ipcRenderer.invoke('versions'),
  reOpenApp: () => ipcRenderer.send('restart-app'),
  loadingIsDone: (decision: boolean) => ipcRenderer.send("loading-is-done", decision),
  setDizipal: (json: object) => ipcRenderer.invoke('set-dizipal', json),
  notification: (options: object) => ipcRenderer.invoke('notification', options),
  closeMenu: (menu: string) => ipcRenderer.invoke('close-menu', menu),
  reloadURL: (url: string, blockAds: boolean) => ipcRenderer.invoke('reload-url', url, blockAds),
  connection: (online: boolean) => ipcRenderer.invoke('connection', online),
});
