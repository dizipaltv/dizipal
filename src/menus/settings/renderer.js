window.addEventListener('DOMContentLoaded', async () => {
    try {
        let information = await window.electronAPI.getDizipal();
        
        let currentSiteURL = document.getElementById('currentSiteURL');
        currentSiteURL.value = information.currentSiteURL;

        const saveButton = document.getElementById('saveChanges');
        saveButton.addEventListener('click', () => {
            information.currentSiteURL = currentSiteURL.value;
            window.electronAPI.setDizipal(information);
            window.electronAPI.reOpenApp();
        });

        const syncURL = document.getElementById('syncURL');
        syncURL.addEventListener('click', async () => {
            const csURL = await window.electronAPI.getApiURL();
            const inf = information;
            inf.currentSiteURL = csURL;
            window.electronAPI.setDizipal(inf);
            currentSiteURL.value = csURL;
        });
    } catch (error) {
        console.error('Veri alma hatası:', error);
    }
});
