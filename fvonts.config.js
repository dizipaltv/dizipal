const path = require("node:path");
const fs = require("node:fs");

class Filer {
    static read(file_name="package.json") {
        const file = fs.readFileSync(path.join(__dirname, file_name), "utf-8");
        return JSON.parse(file);
    }
}

const package_json = Filer.read();

module.exports = {
    config: {
        package: package_json,
        custom: {
            userName: "ahmetcanisik",
            repoUrl: "https://github.com/dizipaltv/dizipal",
            styles: path.join(__dirname, "src", "styles.css")
        }
    }
}