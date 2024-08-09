window.addEventListener('DOMContentLoaded', () => {
    const versions = {
        os: process.platform,
        node: process.versions.node,
        chrome: process.versions.chrome,
        electron: process.versions.electron
    }
    const version_infos = document.getElementById('version_infos');
    if (version_infos) {
        Object.entries(versions).forEach(([key, value]) => {
            const li = document.createElement('li');
            const code = document.createElement('code');
            code.textContent = `${key}: ${value}`;
            li.appendChild(code);
            version_infos.appendChild(li);
        });
    }
})