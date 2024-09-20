import { dirs } from "../../dizipal.config";
import { app } from "electron";

class App {
    static relaunch() {
        app.relaunch();
        app.exit(0);
    }

    static get mainDir() {
        return dirs.mainDir;
    }
}

export default App;