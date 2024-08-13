const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  reOpenApp: () => ipcRenderer.send('restart-app'),
  getDizipal: () => ipcRenderer.invoke('get-dizipal'),
  getApiURL: () => ipcRenderer.invoke('get-api-url'),
  setDizipal: (json) => ipcRenderer.send('set-dizipal', json),
  notification: (options) => ipcRenderer.send('notification', options)
});