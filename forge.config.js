const path = require('path');
const { SyncFile } = require('./src/components');
const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

const INFO = SyncFile.read_json(path.join(__dirname, "package.json"));
const ICON_FOLDER = path.join(__dirname, "src", "images", "icons");

module.exports = {
  packagerConfig: {
    asar: true,
    name: INFO.name,
    appBundleId: `com.${INFO.author.name}.${INFO.name}`,
    executableName: INFO.name,
    icon: path.join(ICON_FOLDER, "icon"),
    win32metadata: {
      CompanyName: INFO.productName,
      ProductName: INFO.productName,
      FileDescription: INFO.description
    },
    ignore: [
      /^scripts/,
      /^dev/
    ]
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: INFO.productName,
        setupExe: `${INFO.name}_${INFO.version}_win64.exe`,
        setupIcon: path.join(ICON_FOLDER, 'icon.ico'),
        iconUrl: path.join(ICON_FOLDER, 'icon.ico')
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ['darwin'],
    },
    {
      name: "@electron-forge/maker-dmg",
      platforms: ['darwin'],
      config: {
        title: `${INFO.productName} Installer`,
        icon: path.join(ICON_FOLDER, 'icon.icns'),
        format: 'ULFO',
        overwrite: true
      },
    },
    {
      name: '@electron-forge/maker-deb',
      platforms: ["linux"],
      config: {
        bin: INFO.ProductName,
        maintainer: INFO.author.name,
        homepage: INFO.author.url,
        categories: ['Video', 'Movie', 'Series'],
        description: INFO.description,
        icon: path.join(ICON_FOLDER, 'icon.png')
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      platforms: ["linux"],
      config: {
        bin: INFO.ProductName,
        maintainer: INFO.author.name,
        homepage: INFO.author.url,
        categories: ['Video', 'Movie', 'Series'],
        description: INFO.description,
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
