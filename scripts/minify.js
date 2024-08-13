const fs = require('fs-extra');
const path = require('path');
const Terser = require('terser');
const { minify: minifyHTML } = require('html-minifier-terser');
const CleanCSS = require('clean-css'); // clean-css'i içe aktarın

const srcDir = path.join(__dirname, "..", "dev");
const buildDir = path.join(__dirname, "..", "src");

fs.ensureDirSync(buildDir);

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
        console.log(`Minified ${filePath} -> ${buildPath}`);
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
        console.log(`Minified ${filePath} -> ${buildPath}`);
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
        console.log(`Minified ${filePath} -> ${buildPath}`);
    } catch (error) {
        console.error(`Error processing file ${filePath}:`, error);
    }
}

async function copyImages() {
    try {
        const imagesDir = path.join(srcDir, 'images');
        const buildImagesDir = path.join(buildDir, 'images');
        await fs.copy(imagesDir, buildImagesDir);
        console.log(`Copied images from ${imagesDir} to ${buildImagesDir}`);
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
            } else if (path.extname(file) === '.css') { // CSS dosyalarını da işle
                await minifyCSS(filePath);
            }
        }));
    } catch (error) {
        console.error(`Error reading directory ${dir}:`, error);
    }
}

(async() => {
    // İlk olarak resimleri kopyala
    await copyImages();
})()

// Ardından diğer dosyaları işle
processDir(srcDir);