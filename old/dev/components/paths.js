const path = require("path");

module.exports = {
    preload: path.join(__dirname, "..", "preload.js"),
    noConnection: path.join(__dirname, "..", "pages", "no-connection", "index.html"),
    icon: path.join(__dirname, "..", "images", "icons", "icon.png")
}