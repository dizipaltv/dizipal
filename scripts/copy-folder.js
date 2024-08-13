const fs = require('fs-extra');
const path = require("path");

const srcDir = path.join(__dirname, "..", "dev");
const destDir = path.join(__dirname, "..", "src");

fs.copy(srcDir, destDir, { overwrite: true }, err => {
  if (err) {
    return console.error('Kopyalama işlemi başarısız:', err);
  }
  console.log(`Kopyalama işlemi ${srcDir} adresinden ${destDir} adresine başarıyla kopyalandı.`);
});