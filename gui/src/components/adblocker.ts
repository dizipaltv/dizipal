class AdBlocker {
  static blockURLs(session: any) {
    const filter = {
      urls: [
        '*://dizipal738.com/reklamlar/*',
        '*://hops1s.site/*',
        '*://btt-tr.hayatguzel.com/*'
      ]
    };

    session.defaultSession.webRequest.onBeforeRequest(filter, (details: any, callback: any) => {
      if (
        details.url.includes('/reklamlar/') ||
        details.url.includes('hops1s.site') ||
        details.url.includes('btt-tr.hayatguzel.com')
      ) {
        callback({cancel: true});
      } else {
        callback({cancel: false});
      }
    });
  }

  static blockAds(window: any) {
    // Block images as soon as DOM is ready
    window.webContents.on('dom-ready', () => {
      window.webContents.executeJavaScript(`
                (function() {
                    try {
                        const images = document.querySelectorAll('img');
                        images.forEach((img) => {
                            if (img.src.includes('/reklamlar/')) {
                                img.style.display = 'none';  // Hide the image
                            }
                        });
                    } catch (error) {
                        console.error("Error while executing script for images: ", error);
                    }
                })();
            `)
        .then(() => console.log("✓ dom-ready \t\t\t—▶ [Script executed] Processed all images"))
        .catch(() => console.error("✓ dom-ready \t\t\t—▶ [Error executing script] Something went wrong!"));
    });

    // Block videos once page has fully loaded
    window.webContents.on('did-finish-load', () => {
      window.webContents.executeJavaScript(`
                (function() {
                    try {
                        const vast = document.getElementById('vast');
                        const vast_new = document.getElementById('vast_new');     
                        const pre_player = document.querySelector('.pre-player');
                        const bottomAd = document.querySelector('#bottomAd a');

                        if (bottomAd) {
                            bottomAd.click();
                        }

                        if (vast_new) {
                            vast_new.style.display = 'block';
                        }

                        if (pre_player) {
                            pre_player.parentNode.querySelector('style').remove();
                            pre_player.remove();
                        }
                        
                        if (vast && vast_new) {
                            const vastChilds = vast.querySelectorAll('*');
                            vastChilds.forEach((vastChild) => {
                                if (!vast_new.contains(vastChild)) {
                                    vastChild.parentNode && vastChild.parentNode.removeChild(vastChild);
                                }
                            });
                        } else {
                            console.error("No ads is here! vast or vast_new element not found");
                        }
                    } catch (error) {
                        console.error("Error while executing script for videos: ", error);
                    }
                })();
            `)
        .then(() => console.log("✓ did-finish-load \t\t\t—▶ [Script executed] Removed all ad videos"))
        .catch(() => console.error("✓ did-finish-load \t\t\t—▶ [Error executing script] Something went wrong!"));
    });
  }
}

export default AdBlocker;