const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  reOpenApp: () => ipcRenderer.send('restart-app'),
  getDizipal: () => ipcRenderer.invoke('get-dizipal'),
  setDizipal: (json) => ipcRenderer.send('set-dizipal', json)
});