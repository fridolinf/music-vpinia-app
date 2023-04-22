import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
// import visualizer from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
// registerType is for caching the previous apps after downloading and if any change from the current, the app will automatically updated
export default defineConfig({
  test: {
    globals: true
  },
  plugins: [
    vue(),
    /* `VitePWA` is a plugin for Vite that helps with creating Progressive Web Apps (PWAs). The
    configuration object passed to `VitePWA` sets various options for the PWA, including: */
    VitePWA({
      registerType: 'autoUpdate', //registering default serviceWorkers config
      injectRegister: 'auto',
      /* `devOptions: { enabled: true, type: 'module' }` is a configuration option for the `VitePWA`
      plugin in a Vite configuration file. It enables the development mode for the plugin and sets
      the type of the module to be used. In this case, the type is set to `'module'`, which means
      that the plugin will use ES modules for the development environment. This option is used to
      ensure that the plugin works correctly during development and that the service worker is
      updated when changes are made to the app. */
      devOptions: { enabled: true, type: 'module' },
      /* This code block is configuring the manifest file for the Progressive Web App (PWA). The `name`
      property sets the name of the PWA, `theme_color` sets the color of the browser toolbar when
      the PWA is open, and `icons` is an array of objects that define the icons used for the PWA. In
      this case, there is only one icon defined with a source file path, size, and type. This
      information is used by the browser to display the PWA icon on the home screen and in other
      places. */
      manifest: {
        name: 'Music Vpinia',
        theme_color: '#ff5e3a',
        icons: [
          {
            src: 'assets/img/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      },
      /* `workbox` is a library that provides tools for creating offline web applications. In this
      configuration, `VitePWA` is using `workbox` to cache certain files for offline use. The
      `globPatterns` property is used to specify which files should be cached. */

      workbox: {
        /* `globPatterns:  is a configuration option for the `workbox`
        library used by the `VitePWA` plugin. It specifies which files should be cached for offline
        use by the Progressive Web App (PWA). The `***` part of the pattern means to search for
        files in all directories and subdirectories, while the `{js,css,html,png,jpg,}` part
        specifies the file extensions to include in the cache. In this case, the PWA will cache all
        JavaScript, CSS, HTML, PNG, and JPG files. */
        globPatterns: ['**/*.{js,css,html,png,jpg,}']
      }
    })
    // visualizer({ open: true })
  ],
  /* This code block is setting up an alias for the `@` symbol to point to the `src` directory of the
  project. This is useful for simplifying import statements in the code, as instead of writing out
  the full path to a file in the `src` directory, the `@` symbol can be used as a shorthand. The
  `fileURLToPath` and `URL` functions are used to convert the relative path to an absolute path that
  can be used by the `alias` configuration. */
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
