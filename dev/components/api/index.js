class Api {
    static async take() {
        try {
            const response = await fetch("https://raw.githubusercontent.com/dizipaltv/api/main/dizipal.json");
            if (response.ok) {
                const json = await response.json();
                console.log("✓ Api.take \t\t\t—▶ Successfully fetched data.");
                return json;
            } else {
                console.error("✕ Api.take \t\t\t—▶ There was a problem getting the API, here is the status code:", response.status);
                return null;
            }
        } catch (err) {
            console.error("✕ Api.take \t\t\t—▶ Ups! Something went wrong.\n", err);
            return null;
        }
    }
    

    static async getCurrentSiteURL() {
        try {
            const data = await Api.take();
            if (data && data.currentSiteURL) {
                console.log("✓ Api.getCurrentSiteURL \t\t\t—▶ Successfully! returned 'Current Site URL' : ", data.currentSiteURL);
                return data.currentSiteURL;
            } else {
                console.error("✕ Api.getCurrentSiteURL \t\t\t—▶ No currentSiteURL found in API response.");
                return null;
            }
        } catch(err) {
            console.error("✕ Api.getCurrentSiteURL \t\t\t—▶ Ups! Something went wrong.\n", err);
            return null;
        }
    }
    
}

module.exports=Api;