window.addEventListener('DOMContentLoaded', async () => {
    try {
        // Veriyi almak için ipcRenderer.invoke kullanın
        let information = await window.electronAPI.getDizipal();
        console.log(information);
        let currentSiteURL = document.getElementById('currentSiteURL');
        const saveButton = document.getElementById('saveChanges');

        // Veriyi HTML elemanlarına atayın
        currentSiteURL.value = information.currentSiteURL;

        saveButton.addEventListener('click', () => {
            information.currentSiteURL = currentSiteURL.value;
            window.electronAPI.setDizipal(information);
            window.electronAPI.reOpenApp();
        });
    } catch (error) {
        console.error('Veri alma hatası:', error);
    }
});
