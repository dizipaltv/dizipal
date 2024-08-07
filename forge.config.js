const path = require('path');
const { version, name } = require('./package.json');
const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

const outputDir = path.join(__dirname, "releases", `${name}_${version}`);

module.exports = {
  packagerConfig: {
    asar: true,
    out: outputDir,
    name: "dizipal",
    executableName: "dizipal",
    icon: path.join(__dirname, 'src/icons/icon'),
    win32metadata: {
      CompanyName: 'Dizipal',
      ProductName: 'Dizipal',
      FileDescription: 'Dizipal application that can work in the desktop environment.'
    }
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'Dizipal',
        setupExe: `${name}_${version}_win64.exe`,
        setupIcon: path.join(__dirname, 'src/icons/icon.ico'),
        iconUrl: path.join(__dirname, 'src/icons/icon.ico'),
        outputDirectory: path.join(outputDir, "Windows")
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
      config: {
        out: path.join(outputDir, "Mac")
      }
    },
    {
      name: '@electron-forge/maker-deb',
      platforms: ['linux'],
      config: {
        categories: ['Media & Entertainment'],
        description: 'Dizipal application that can work in the desktop environment.',
        icon: path.join(__dirname, 'src/icons/icon.png'),
        out: path.join(outputDir, "Linux")
      }
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
