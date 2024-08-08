const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    getSiteURL: () => ipcRenderer.invoke('get-site-url')
});