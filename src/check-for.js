const https = require('https');

const dizipalApiURLS = {
    prefix: "https://raw.githubusercontent.com/dizipaltv/api/main",
    origin: "dizipal.json",
    test: "test-api.json"
}

class CheckFor {
    static async apis(which = 'origin', timeout = 5000) {
        const fetchURL = `${dizipalApiURLS.prefix}/${dizipalApiURLS[which]}`;
        return new Promise((resolve, reject) => {
            const req = https.get(fetchURL, { timeout }, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        console.error(`Parsing Error: ${e.message}`);
                        reject(new Error('Failed to parse response JSON'));
                    }
                });
            });
    
            req.on('error', (error) => {
                console.error(`Request Error: ${error.message}`);
                reject(new Error(`Request error: ${error.message}`));
            });
    
            req.on('timeout', () => {
                req.destroy(new Error('Request timeout'));
            });
        });
    };
}


module.exports = {
    CheckFor,
}