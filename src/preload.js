const { contextBridge, ipcRenderer } = require('electron');
const { Titlebar, TitlebarColor} = require("custom-electron-titlebar");

contextBridge.exposeInMainWorld('electron', {
    getSiteURL: () => ipcRenderer.invoke('get-site-url')
});

const options = {
    backgroundColor: TitlebarColor.fromHex("#DB2424"),
    overflow: 'auto',
    transparent: 0.5
};

window.addEventListener('DOMContentLoaded', () => {
    // Title bar implementation
    new Titlebar(options);
});

window.stopLoading = function() {
    ipcRenderer.send('stop-loading-main')
}
