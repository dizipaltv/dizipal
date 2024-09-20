window.addEventListener('offline', async () => {
  // @ts-expect-error: burada hata yok.
  await window.electronAPI.closeMenu('about');

  // @ts-expect-error: burada hata yok.
  await window.electronAPI.connection(false);
});

window.addEventListener('DOMContentLoaded', async () => {
  try {
    // @ts-expect-error: burada hata yok.
    const versions = await window.electronAPI.versions();

    const version_infos = document.getElementById('version_infos');
    if (version_infos) {
      Object.entries(versions).forEach(([key, value]) => {
        const tr = document.createElement('tr');

        const tdKey = document.createElement('td');
        const keyCode = document.createElement('code');
        keyCode.classList.add('key');
        keyCode.textContent = key;
        tdKey.appendChild(keyCode);
        tr.appendChild(tdKey);

        const tdValue = document.createElement('td');
        const valueCode = document.createElement('code');
        valueCode.classList.add('value');
        valueCode.id = `${key}_value`;

        // @ts-expect-error: burada hata yok.
        valueCode.textContent = value;
        tdValue.appendChild(valueCode);
        tr.appendChild(tdValue);

        version_infos.appendChild(tr);
      });
    }

    const closeButtons = document.querySelectorAll('.closeWindow');
    closeButtons.forEach(closeButton => {
      if (closeButton) {
        closeButton.addEventListener('click', async () => {
          try {
            // @ts-expect-error: burada hata yok.
            await window.electronAPI.closeMenu('about');
          } catch (error) {
            console.error("Menu kapatılırken hata oluştu:", error);
          }
        });
      }
    });

    // @ts-expect-error: burada hata yok.
    const info = await window.electronAPI.getPackageInfo();

    const author = document.querySelector('meta[name="author"]');
    if (author && info.author && info.author.name) {
      // @ts-expect-error: burada hata yok.
      author.content = info.author.name;
    }

    const copyright = document.getElementById('copyright');
    copyright.innerHTML = `&copy;${new Date().getFullYear()}`;

    const author_infos = document.getElementById('author_infos');
    if (author_infos && info.author && info.author.url) {

      // @ts-expect-error: burada hata yok.
      author_infos.href = info.author.url;
      author_infos.textContent = info.author.name;
    }

    const version_value = document.getElementById('version_value');
    version_value.textContent = info.version;

    const github_repository = document.getElementById('github_repository');
    if (github_repository && info.repository && info.repository.url) {

      // @ts-expect-error: burada hata yok.
      github_repository.href = info.repository.url.replace('git+', '').replace('.git', '');
    }

    /*const twitterLink = document.getElementById('twitterLink');
    if (twitterAdress.twitter) {
      twitterLink.href = api.twitter;
    }*/
  } catch (error) {
    console.error('Error fetching package info:', error);
  }
});
