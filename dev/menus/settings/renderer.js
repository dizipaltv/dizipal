window.addEventListener('DOMContentLoaded', async () => {
    try {
        const ckAdressSwitch = document.getElementById('checkAdressOnStartupSwitch');
        const adBlockerSwitch = document.getElementById('adBlockerSwitch');
        let information = await window.electronAPI.getDizipal();

        ckAdressSwitch.checked = information.checkAdressOnStartup;
        adBlockerSwitch.checked = information.adBlocker;
        
        let currentSiteURL = document.getElementById('currentSiteURL');
        currentSiteURL.value = information.currentSiteURL;

        const saveButton = document.getElementById('saveChanges');
        saveButton.addEventListener('click', async () => {
            information.currentSiteURL = currentSiteURL.value;
            information.checkAdressOnStartup = ckAdressSwitch.checked ? true : false;
            information.adBlocker = adBlockerSwitch.checked ? true : false;
            await window.electronAPI.setDizipal(information);
            await window.electronAPI.notification({
                body: "Değişiklikler Kaydedildi! Değişikliklerin uygulanması için uygulama yeniden başlatılıyor..."
            });
            await window.electronAPI.reOpenApp();
        });

        const syncURL = document.getElementById('syncURL');
        syncURL.addEventListener('click', async () => {
            syncURL.classList.add("loading");
            const csURL = await window.electronAPI.getApiURL();
            const inf = information;
            inf.currentSiteURL = csURL;
            await window.electronAPI.setDizipal(inf);
            currentSiteURL.value = csURL;
            syncURL.classList.remove("loading");
            await window.electronAPI.notification({
                body: `Güncel adres ${currentSiteURL.value} ile başarıyla eşleşildi!`
            });
        });
    } catch (error) {
        console.error('Veri alma hatası:', error);
    }
});
