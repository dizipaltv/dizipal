const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getDizipal: () => ipcRenderer.invoke('get-dizipal'),
  getApiURL: () => ipcRenderer.invoke('get-api-url'),
  getPackageInfo: () => ipcRenderer.invoke("get-package-info"),
  getLoadedURL: () => ipcRenderer.invoke('get-loaded-url'),
  versions: () => ipcRenderer.invoke('versions'),
  reOpenApp: () => ipcRenderer.send('restart-app'),
  setDizipal: (json) => ipcRenderer.send('set-dizipal', json),
  notification: (options) => ipcRenderer.send('notification', options),
  loadingIsDone: (decision) => ipcRenderer.send("loading-is-done", decision),
  closeMenu: (menu) => ipcRenderer.send('close-menu', menu),
  reloadURL: (url, blockAds) => ipcRenderer.send('reload-url', url, blockAds),
  connection: (online) => ipcRenderer.send('connection', online),
});