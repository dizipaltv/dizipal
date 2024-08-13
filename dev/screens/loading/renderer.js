window.addEventListener('DOMContentLoaded', async () => {
    const status = document.getElementById('status');
    const loadText = status.innerText;

    status.innerText = "Config Bilgileri Alınıyor...";
    const information = await window.electronAPI.getDizipal();

    if (information.checkAdressOnStartup) {
        status.innerText = "Güncel Adres Bilgisi Alınıyor...";
        const url = await window.electronAPI.getApiURL();
        information.currentSiteURL = url;
        await window.electronAPI.setDizipal(information);

        await window.electronAPI.notification({
            body: `Güncel Adres Güncellendi -> ${url}`
        });
    }
    status.innerText = loadText;

    await window.electronAPI.loadingIsDone(true);
});