import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [new MakerSquirrel({}), new MakerZIP({}, ['darwin']), new MakerRpm({}), new MakerDeb({})],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/menus/about/index.html', // "About" menüsü için HTML dosyası
            js: './src/menus/about/renderer.ts',  // "About" menüsü için renderer dosyası
            name: 'about',                // Bu pencerenin adı
            preload: {
              js: './src/preload.ts',            // Preload dosyası
            },
          },
          {
            html: './src/menus/settings/index.html', // "Settings" menüsü için HTML dosyası
            js: './src/menus/settings/renderer.ts',  // "Settings" menüsü için renderer dosyası
            name: 'settings',               // Bu pencerenin adı
            preload: {
              js: './src/preload.ts',            // Preload dosyası
            },
          },
          {
            html: './src/pages/no-connection/index.html', // "No Connection" sayfası için HTML dosyası
            js: './src/pages/no-connection/renderer.ts',  // "No Connection" sayfası için renderer dosyası
            name: 'no-connection',               // Bu pencerenin adı
            preload: {
              js: './src/preload.ts',            // Preload dosyası
            },
          },
          {
            html: './src/screens/loading/index.html',   // Loading ekranı için HTML dosyası
            js: './src/screens/loading/renderer.ts', // Loading ekranı için renderer dosyası
            name: 'loading',                    // Loading ekranı pencere adı
            preload: {
              js: './src/preload.ts',            // Preload dosyası
            },
          },
          // Diğer pencere veya ekranlar için benzer yapılandırmalar ekleyebilirsiniz
        ],
      },
    }),
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

export default config;
