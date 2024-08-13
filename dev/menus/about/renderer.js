window.addEventListener('DOMContentLoaded', () => {
    async function placeInfos() {
        const info = await window.electronAPI.getPackageInfo();

        const author = document.querySelector('meta[name="author"]');
        author.content = info.author.name;

        const version_value = document.getElementById('version_value');
        version_value.textContent = info.version;

        const author_infos = document.getElementById('author_infos');
        author_infos.href = info.author.url;
        author_infos.textContent = info.author.name;

        const github_repository = document.getElementById('github_repository');
        github_repository.href = info.repository.url.replace('git+', '').replace('.git', '');
    }

    placeInfos();
})