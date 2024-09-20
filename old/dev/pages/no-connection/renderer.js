const updateConnectionStatus = async () => {
    const isConnected = navigator.onLine;
    await window.electronAPI.connection(isConnected);
};

window.addEventListener('DOMContentLoaded', async () => {
    const reloadBtn = document.getElementById('reloadBtn');
    reloadBtn.addEventListener('click', updateConnectionStatus);
});
window.addEventListener('online', updateConnectionStatus);
window.addEventListener('offline', updateConnectionStatus);
