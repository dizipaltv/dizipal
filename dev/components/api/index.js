class Api {
    static async take() {
        try {
            const response = await fetch("https://raw.githubusercontent.com/dizipaltv/api/main/dizipal.json");
            if (response.ok) {
                const json = await response.json();
                console.log("✅ [--api.Api.take--] - Successfully fetched data.\n", json);
                return json;
            } else {
                console.error("❌ [--api.Api.take--] - There was a problem getting the API, here is the status code:", response.status);
                return null;
            }
        } catch (err) {
            console.error("❌ [--api.Api.take--] - Ups! Something went wrong.\n", err);
            return null;
        }
    }
    

    static async getCurrentSiteURL() {
        try {
            const data = await Api.take();
            if (data && data.currentSiteURL) {
                console.log("✅ [--api.Api.getCurrentSiteURL--] - Successfully! returned api.currentSiteURL.\n", data.currentSiteURL);
                return data.currentSiteURL;
            } else {
                console.error("❌ [--api.Api.getCurrentSiteURL--] - No currentSiteURL found in API response.");
                return null;
            }
        } catch(err) {
            console.error("❌ [--api.Api.getCurrentSiteURL--] - Ups! Something went wrong.\n", err);
            return null;
        }
    }
    
}

module.exports=Api;