const { dirs } = require("../../../dizipal.config");
const { app } = require("electron");

class App {
    static relaunch() {
        app.relaunch();
        app.exit(0);
    }

    static get mainDir() {
        return dirs.mainDir;
    }
}

module.exports=App;