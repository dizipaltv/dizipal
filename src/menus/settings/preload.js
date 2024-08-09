const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  reOpenApp: () => ipcRenderer.send('restart-app'),
  getDizipal: () => ipcRenderer.invoke('get-dizipal'),  // ipcRenderer.invoke kullanarak veri alın
  setDizipal: (json) => ipcRenderer.send('set-dizipal', json)
});