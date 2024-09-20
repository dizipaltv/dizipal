window.addEventListener('offline', async () => {
    // @ts-expect-error: burada hata yok.
    await window.electronAPI.closeMenu('settings');

    // @ts-expect-error: burada hata yok.
    await window.electronAPI.connection(false);
});

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const closeButtons = document.querySelectorAll('.closeWindow');
        closeButtons.forEach(closeButton => {
            if (closeButton) {
                closeButton.addEventListener('click', async () => {
                    try {
                        // @ts-expect-error: burada hata yok.
                        await window.electronAPI.closeMenu('settings');
                    } catch (error) {
                        console.error("Menu kapatılırken hata oluştu:", error);
                    }
                });
            }
        });

        const ckAdressSwitch = document.getElementById('checkAdressOnStartupSwitch');
        const adBlockerSwitch = document.getElementById('adBlockerSwitch');

        // @ts-expect-error: burada hata yok.
        const information = await window.electronAPI.getDizipal();

        // @ts-expect-error: burada hata yok.
        ckAdressSwitch.checked = information.checkAdressOnStartup;

        // @ts-expect-error: burada hata yok.
        adBlockerSwitch.checked = information.adBlocker;

        const currentSiteURL = document.getElementById('currentSiteURL');
        
        // @ts-expect-error: burada hata yok.
        currentSiteURL.value = information.currentSiteURL;

        const syncURL = document.getElementById('syncURL');
        syncURL.addEventListener('click', async () => {
            syncURL.classList.add("loading");
            const processing = async () => {

                // @ts-expect-error: burada hata yok.
                const csURL = await window.electronAPI.getApiURL();
                
                // @ts-expect-error: burada hata yok.
                currentSiteURL.value = csURL;
                
                if (information.currentSiteURL !== csURL) {
                    information.currentSiteURL = csURL;
                    
                    // @ts-expect-error: burada hata yok.
                    await window.electronAPI.notification({
                        title: "Eşleşme Başarılı!",
                        body: "Güncel adres başarıyla eşleştirildi!"
                    });
                } else {
                    // @ts-expect-error: burada hata yok.
                    await window.electronAPI.notification({
                        title: "Eşlendi!",
                        body: "Güncel Adres değişmedi!"
                    });
                }
            }
            await processing().then(() => syncURL.classList.remove("loading"));
        });

        const saveButton = document.getElementById('saveChanges');
        saveButton.addEventListener('click', async () => {
            saveButton.classList.add("laoding");
            const processing = async () => {
                let reload = false;
                // @ts-expect-error: burada hata yok.
                const loadedURL = await window.electronAPI.getLoadedURL();
                
                // @ts-expect-error: burada hata yok.
                if (currentSiteURL.value !== loadedURL) {
                    // @ts-expect-error: burada hata yok.
                    information.currentSiteURL = currentSiteURL.value;
                    reload = true;
                }

                // @ts-expect-error: burada hata yok.
                information.checkAdressOnStartup = ckAdressSwitch.checked ? true : false;

                // @ts-expect-error: burada hata yok.
                information.adBlocker = adBlockerSwitch.checked ? true : false;

                // @ts-expect-error: burada hata yok.
                await window.electronAPI.setDizipal(information);

                // @ts-expect-error: burada hata yok.
                await window.electronAPI.closeMenu('settings');
                if (reload) {
                    // @ts-expect-error: burada hata yok.
                    await window.electronAPI.reloadURL(information.currentSiteURL, information.adBlocker);
                }
            }
            await processing().then(() => saveButton.classList.remove("laoding"));
        });
    } catch (error) {
        console.error('Veri alma hatası:', error);
    }
});
