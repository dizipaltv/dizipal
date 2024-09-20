import cloudscraper from 'cloudscraper';
import config from '../config.js';
import {
    __configdir,
    __configfile,
    __baseconfig,
    BaseConfig,
    log,
    Metadata
} from '../utils.js';


interface SiteConfig {
    url: string | undefined,
    latest: boolean,
    api: string | undefined,
    raw?: boolean
}


class Find {
    #url_returned_api: string | undefined;


    async latest(api?: string | undefined, raw?: boolean) {
        if (!raw) {
            log.info("Finding the latest dizipal URL...");
        }
        await this.#find_site({
            url: undefined,
            latest: true,
            api: api,
            raw: raw
        });
    }


    async with_url(url: string, raw?: boolean) {
        if (!raw) {
            log.info(`URL search starts with ~wb ${url}~`);
        }
        await this.#find_site({
            url: url,
            latest: false,
            api: undefined,
            raw: raw
        });
    }


    get get_api_url() {
        return typeof this.#url_returned_api === "string" && this.#url_returned_api;
    }

    // undici ile 403 olan site adreslerini yakalayayım ve 403 olanları cloudscraper ile tarayayım ve 200 kodu döndürenlerin dizipal adresi olup olmadığını tarayayım.
    async #find_site(params: SiteConfig) {
        try {
            const get_config = await config.read();
            if (params.latest) {
                if (params.api && typeof params.url === "string") {
                    params.url = await get_config.currentSiteURL;
                } else {
                    params.url = await get_config.currentSiteURL;
                }
            }

            if (typeof params.url === "string") {
                this.#url_returned_api = params.url;
                // @ts-ignore: no problem here.
                await cloudscraper.get({ url: params.url, followRedirect: false, simple: false, method: "GET", preRequest: function (options) { console.log("Request options before the request:", options.statusCode);return true; } }, async (error, response) => {
                    if (error) {
                        if (!params.raw) {
                            log.error(`There was a problem sending a request to ~rb,b ${params.url}~!`);
                            console.error(error);
                        }
                        await this.#fence_site(params.url, params.raw);
                        return;
                    }

                    if (response.statusCode === 200) {
                        const bodyText = response.body;
                        if (bodyText.includes(`<svg id="katman_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.3 573.5"><defs><style>.cls-1{fill:#fff;}</style></defs><g id="Page-1"><path class="cls-1" d="M0,12.1C47.8,4.4,112.3,0,178.9,0c107.9,0,175.6,17.5,231.5,55.9,62,42.8,101.9,112.9,101.9,216.3,0,114.6-43.4,189.1-98.3,231.9-61.9,48.1-154.1,69.4-264.1,69.4C77.7,573.5,28.8,568.7,0,564.3V12.1ZM150.5,454.7c7.9,1.7,21.7,1.7,31.9,1.7,97.7,1.3,169.9-52.4,169.9-179.3,0-110-65.5-161.8-155.9-161.8-23.6,0-38.2,1.9-45.9,3.8V454.7Z"/></g></svg>`)) {
                            await this.#founded_site(params.url, params.raw);
                            return;
                        }
                        
                        if (!params.raw) {
                            log.error(`This is not a valid dizipal website: ~rb ${params.url}~`);
                        }
                        return;
                    }
                    
                    // [201, 301, 302, 303, 305, 307, 308].includes(statusCode)
                    if (response.headers.location) {
                        if (!params.raw) {
                            log.info(`~mb ${params.url}~ redirects us to -> ~blb ${response.headers.location}~`);
                        }
                        await this.#find_site({
                            url: response.headers.location.toString(),
                            latest: false,
                            api: undefined,
                            raw: params.raw
                        });
                        return;
                    }
    
                    if (!params.raw) {
                        log.error(`Failed to request. Status = ~rb ${response.statusCode}~`);
                    } 
                    await this.#fence_site(params.url, params.raw);
                });
            }
        } catch (error: any) {
            if (params.url) {
                await this.#fence_site(params.url, params.raw);
            }
        }
    }


    async #founded_site(url: string | undefined, raw?: boolean) {
        if (raw === true) {
            console.log(url); 
            return;
        } else {
            if (this.#url_returned_api === url && __baseconfig.currentSiteURL === url) {
                log.info(`(Not Changed) Latest ~b Dizipal~ address on ~blb,b ${url}~`);
                return;
            }
            const meta = await Metadata();
            const update_config: BaseConfig = {
                currentSiteURL: url,
                latestCLI: meta.version,
                firstProcess: 0
            }
            await config.update(update_config);
            log.nice(`(Changed) Latest ~b Dizipal~ address on ~gb,b ${url}~`);
        }
    }


    async #fence_site(latest_url: string | undefined, raw?: boolean) {
        let url_number: undefined | number;
        if (!raw) {
            log.error(`This is not a valid dizipal website: ~rb ${latest_url}~ URL search starts again...`);
        }
        if (
            typeof url_number === "number" &&
            typeof latest_url === "string"
        ) {
            url_number = parseInt(latest_url.replace(/https:\/\/dizipal|\.com/g, ''), 10);
            await this.with_url(`https://dizipal${url_number + 1}.com`, raw);
        }
    }
}

const find = new Find();

export default find;
