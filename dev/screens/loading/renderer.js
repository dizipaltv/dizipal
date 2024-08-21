window.addEventListener('offline', async () => {
    await window.electronAPI.connection(false);
});
const checkers = async () => {
    const status = document.getElementById('status');
    const loadText = status.innerText;

    status.innerText = "Config Bilgileri Alınıyor...";
    const information = await window.electronAPI.getDizipal();

    if (information.checkAdressOnStartup) {
        status.innerText = "Güncel Adres Bilgisi Alınıyor...";
        const url = await window.electronAPI.getApiURL();
        if (information.currentSiteURL !== url) {
            information.currentSiteURL = url;
            await window.electronAPI.setDizipal(information);
            await window.electronAPI.notification({
                body: `Güncel Adres Güncellendi -> ${url}`
            });
        }
    }

    status.innerText = loadText;
}
window.addEventListener('DOMContentLoaded', async () => {
    await checkers()
        .then(async () => {
            await window.electronAPI.loadingIsDone(true);
        })
        .catch(err => {
            console.error("Yükleme ekranında bir sorun meydana geldi!\n", err);
        })
});