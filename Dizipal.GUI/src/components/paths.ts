import * as path from "path";

interface PathInterface {
    readonly preload: string;
    readonly noConnection: string;
    readonly icon: string;
    readonly homedir: string;
    readonly workdir: string;
    readonly outdir: string;
}

const Paths: PathInterface = {
    preload: path.join(__dirname, "..", "preload.js"),
    noConnection: path.join(__dirname, "..", "pages", "no-connection", "index.html"),
    icon: path.join(__dirname, "..", "images", "icons", "icon.png"),
    homedir: path.join(__dirname, "..", ".."),
    workdir: path.join(__dirname, "..", "..", "src"),
    outdir: path.join(__dirname, "..", "..", ".webpack", "renderer")
};

export default Paths;
