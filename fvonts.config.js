const path = require("path");
const { Sync } = require("./src/filer");

const package_json = Sync.read_json(path.join(__dirname, "package.json"));

module.exports = {
    config: {
        package: package_json,
        custom: {
            userName: "ahmetcanisik",
            repoUrl: "https://github.com/dizipaltv/dizipal",
            menusCSS: path.join(__dirname, "src", "styles", "menus.css"),
            patternCSS: path.join(__dirname, "src", "styles", "pattern.css"),
            mythemeCSS: path.join(__dirname, "src", "styles", "mytheme.min.css"),
            loadingCSS: path.join(__dirname, "src", "styles", "loading.css"),
            settingsRenderer: path.join(__dirname, "src", "menus", "settings", "renderer.js"),
            icon: path.join(__dirname, "src", "icons", "icon.png")
        }
    }
}