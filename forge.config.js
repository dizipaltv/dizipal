const path = require('path');
const { SyncFile } = require('./src/components');
const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

const INFO = SyncFile.read_json(path.join(__dirname, "package.json"));
const ICON_FOLDER = path.join(__dirname, "src", "images", "icons");

module.exports = {
  packagerConfig: {
    asar: true,
    name: "dizipal",
    executableName: "dizipal",
    icon: path.join(ICON_FOLDER, "icon"),
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
        name: "Dizipal",
        setupExe: `${INFO.name}_${INFO.version}_win64.exe`,
        setupIcon: path.join(ICON_FOLDER, 'icon.ico'),
        iconUrl: path.join(ICON_FOLDER, 'icon.ico')
      },
    },
    {
      name: '@electron-forge/maker-deb',
      platform: ["linux"],
      config: {
        bin: INFO.ProductName,
        maintainer: INFO.author.name,
        homepage: INFO.author.url,
        categories: ['Sound & Video'],
        description: 'Dizipal application that can work in the desktop environment.',
        icon: path.join(ICON_FOLDER, 'icon.png')
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      platform: ["linux"],
      config: {
        bin: INFO.ProductName,
        maintainer: INFO.author.name,
        homepage: INFO.author.url,
        categories: ['Sound & Video'],
        description: 'Dizipal application that can work in the desktop environment.',
        icon: path.join(ICON_FOLDER, 'icon.png')
      },
    }
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
  ]
};
