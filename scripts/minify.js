const fs = require('fs-extra');
const path = require('path');
const Terser = require('terser');
const { minify: minifyHTML } = require('html-minifier-terser');
const CleanCSS = require('clean-css');

const srcDir = path.join(__dirname, "..", "dev"); // Kaynak dizin
const buildDir = path.join(__dirname, "..", "src"); // Hedef dizin

fs.ensureDirSync(buildDir);

class Terminal {
    static processed = 0;
    static lsep = null;

    static seperator(length) {
        let sep = "";
        for (let i = 0; i < length;i++) {
            sep += "—";
        }
        return sep;
    }

    static get latestSep() {
        return Terminal.lsep;
    }

    static line(filePath, buildPath, message = "Minified") {
        console.clear();
        const prefix = `✓ ${message} ${filePath} —▶ ${buildPath}`;
        if (message === "Minified") {
            Terminal.processed += 1;
        }
        const seperator = Terminal.seperator(prefix.length);
        Terminal.lsep = seperator;
        console.log(`\n${seperator}\n Minify.js\n`);
        console.log(`${prefix}\n`);
    }

    static get end() {
        console.log(`‽ ${Terminal.processed} files were minified!\n ${Terminal.latestSep}`);
    }
}


async function minifyJS(filePath) {
    try {
        const code = await fs.readFile(filePath, 'utf8');
        const result = await Terser.minify(code);
        if (result.error) {
            console.error(`Error minifying file ${filePath}:`, result.error);
            return;
        }
        const buildPath = path.join(buildDir, path.relative(srcDir, filePath));
        await fs.ensureDir(path.dirname(buildPath));
        await fs.writeFile(buildPath, result.code, 'utf8');
        Terminal.line(filePath, buildPath);
    } catch (error) {
        console.error(`Error processing file ${filePath}:`, error);
    }
}

async function minifyHTMLFile(filePath) {
    try {
        const code = await fs.readFile(filePath, 'utf8');
        const result = await minifyHTML(code, {
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true
        });
        const buildPath = path.join(buildDir, path.relative(srcDir, filePath));
        await fs.ensureDir(path.dirname(buildPath));
        await fs.writeFile(buildPath, result, 'utf8');
        Terminal.line(filePath, buildPath);
    } catch (error) {
        console.error(`Error processing file ${filePath}:`, error);
    }
}

async function minifyCSS(filePath) {
    try {
        const code = await fs.readFile(filePath, 'utf8');
        const output = new CleanCSS().minify(code);
        if (output.errors.length > 0) {
            console.error(`Error minifying CSS file ${filePath}:`, output.errors);
            return;
        }
        const buildPath = path.join(buildDir, path.relative(srcDir, filePath));
        await fs.ensureDir(path.dirname(buildPath));
        await fs.writeFile(buildPath, output.styles, 'utf8');
        Terminal.line(filePath, buildPath);
    } catch (error) {
        console.error(`Error processing file ${filePath}:`, error);
    }
}

async function copyImages() {
    try {
        const imagesDir = path.join(srcDir, 'images');
        const buildImagesDir = path.join(buildDir, 'images');
        await fs.copy(imagesDir, buildImagesDir);
        Terminal.line(imagesDir, buildImagesDir, "Moved");
    } catch (error) {
        console.error(`Error copying images:`, error);
    }
}

async function processDir(dir) {
    try {
        const files = await fs.readdir(dir);
        await Promise.all(files.map(async (file) => {
            const filePath = path.join(dir, file);
            const stats = await fs.stat(filePath);
            if (stats.isDirectory()) {
                await processDir(filePath);
            } else if (path.extname(file) === '.js') {
                await minifyJS(filePath);
            } else if (path.extname(file) === '.html') {
                await minifyHTMLFile(filePath);
            } else if (path.extname(file) === '.css') {
                await minifyCSS(filePath);
            }
        }));
    } catch (error) {
        console.error(`Error reading directory ${dir}:`, error);
    }
}

(async () => {
    // İlk olarak resimleri kopyala
    await copyImages();
    // Ardından diğer dosyaları işle
    await processDir(srcDir);
})().then(() => Terminal.end);