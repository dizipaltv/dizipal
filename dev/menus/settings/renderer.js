window.addEventListener('DOMContentLoaded', async () => {
    try {
        const closeButtons = document.querySelectorAll('.closeWindow');
        closeButtons.forEach(closeButton => {
            if (closeButton) {
                closeButton.addEventListener('click', async () => {
                    try {
                        await window.electronAPI.closeMenu('settings');
                    } catch (error) {
                        console.error("Menu kapatılırken hata oluştu:", error);
                    }
                });
            }
        });

        const ckAdressSwitch = document.getElementById('checkAdressOnStartupSwitch');
        const adBlockerSwitch = document.getElementById('adBlockerSwitch');
        let information = await window.electronAPI.getDizipal();

        ckAdressSwitch.checked = information.checkAdressOnStartup;
        adBlockerSwitch.checked = information.adBlocker;
        
        let currentSiteURL = document.getElementById('currentSiteURL');
        currentSiteURL.value = information.currentSiteURL;

        const syncURL = document.getElementById('syncURL');
        syncURL.addEventListener('click', async () => {
            syncURL.classList.add("loading");
            const csURL = await window.electronAPI.getApiURL();
            information.currentSiteURL = csURL;
            currentSiteURL.value = csURL;
            syncURL.classList.remove("loading");
            Fvuar.new({
              text: `Güncel adres <strong>${currentSiteURL.value}</strong> ile başarıyla eşleşildi!`,
              position: "top-center",
              theme: "success",
              clickToClose: false,
              displayTime: 2
            });
        });

        const saveButton = document.getElementById('saveChanges');
        saveButton.addEventListener('click', async () => {
            let reload = false;
            const loadedURL = await window.electronAPI.getLoadedURL();
            if (currentSiteURL.value !== loadedURL) {
                information.currentSiteURL = currentSiteURL.value;
                reload = true;
            }

            information.checkAdressOnStartup = ckAdressSwitch.checked ? true : false;
            information.adBlocker = adBlockerSwitch.checked ? true : false;
            await window.electronAPI.setDizipal(information);
            Fvuar.new({
              text: "Değişiklikler Başarıyla Kaydedildi!",
              position: "top-center",
              theme: "success",
              clickToClose: false,
              displayTime: 2
            });
            if (reload) {
                await window.electronAPI.reloadURL(information.currentSiteURL, information.adBlocker);
            }
        });
    } catch (error) {
        console.error('Veri alma hatası:', error);
    }
});
