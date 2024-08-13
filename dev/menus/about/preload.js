const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    getPackageInfo: () => ipcRenderer.invoke("get-package-info")
})

window.addEventListener('DOMContentLoaded', () => {
    const versions = {
        sistem: process.platform,
        node: process.versions.node,
        chrome: process.versions.chrome,
        electron: process.versions.electron
    }
    const version_infos = document.getElementById('version_infos');
    if (version_infos) {
        Object.entries(versions).forEach(([key, value]) => {
            const tr = document.createElement('tr');

            const tdKey = document.createElement('td');
            const keyCode = document.createElement('code');
            keyCode.classList.add('key');
            keyCode.textContent = key;
            tdKey.appendChild(keyCode);
            tr.appendChild(tdKey);

            const tdValue = document.createElement('td');
            const valueCode = document.createElement('code');
            valueCode.classList.add('value');
            valueCode.id = `${key}_value`;
            valueCode.textContent = value;
            tdValue.appendChild(valueCode);
            tr.appendChild(tdValue);

            version_infos.appendChild(tr);
        });
    }
})