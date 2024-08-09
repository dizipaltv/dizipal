const { SyncFiles } = require("./sync");
const { AsyncFiles } = require("./async");

module.exports = {
    Sync: SyncFiles,
    Async: AsyncFiles
}