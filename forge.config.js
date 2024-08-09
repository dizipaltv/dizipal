const path = require('node:path');
const { Sync } = require('./src/filer');
const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

const INFO = Sync.read_json(path.join(__dirname, "package.json"));

module.exports = {
  packagerConfig: {
    asar: true,
    name: "dizipal",
    ignore: [
      "^/template/",
      "^/fvonts.config.js$",
      "^/placeholder.js$"
    ],
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
        setupExe: `${INFO.name}_${INFO.version}_win64.exe`,
        setupIcon: path.join(__dirname, 'src/icons/icon.ico'),
        iconUrl: path.join(__dirname, 'src/icons/icon.ico')
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin']
    },
    {
      name: '@electron-forge/maker-deb',
      platforms: ['linux'],
      config: {
        categories: ['Media & Entertainment'],
        description: 'Dizipal application that can work in the desktop environment.',
        icon: path.join(__dirname, 'src/icons/icon.png')
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
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'dizipaltv',
          name: 'dizipal'
        },
        prerelease: false,
        draft: false
      }
    }
  ]
};
