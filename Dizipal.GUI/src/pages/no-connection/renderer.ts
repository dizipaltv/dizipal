const updateConnectionStatus = async () => {
    const isConnected = navigator.onLine;
    // @ts-expect-error: burada hata yok.
    await window.electronAPI.connection(isConnected);
};

window.addEventListener('DOMContentLoaded', async () => {
    const reloadBtn = document.getElementById('reloadBtn');
    reloadBtn.addEventListener('click', updateConnectionStatus);
});
window.addEventListener('online', updateConnectionStatus);
window.addEventListener('offline', updateConnectionStatus);
