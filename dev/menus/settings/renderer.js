window.addEventListener('offline', async () => {
    await window.electronAPI.closeMenu('settings');
    await window.electronAPI.connection(false);
});
window.addEventListener('DOMContentLoaded', async () => {
    try {
        Fvuar.configure({
            DEFAULTPOSITION: "top-center"
        })
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
            const processing = async () => {
                const csURL = await window.electronAPI.getApiURL();
                currentSiteURL.value = csURL;
                if (information.currentSiteURL !== csURL) {
                    information.currentSiteURL = csURL;
                    Fvuar.new({
                        text: `Güncel adres <strong>${currentSiteURL.value}</strong> ile başarıyla eşleşildi!`,
                        theme: "success",
                        clickToClose: false,
                        displayTime: 2
                    });
                } else {
                    Fvuar.new({
                        text: `Güncel adres hala aynı <strong>${currentSiteURL.value}</strong>`,
                        theme: "info",
                        clickToClose: false,
                        displayTime: 2
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
            }
            await processing().then(() => saveButton.classList.remove("laoding"));
        });
    } catch (error) {
        console.error('Veri alma hatası:', error);
    }
});
