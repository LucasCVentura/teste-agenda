// Configuration for your app

const path = require('path');

module.exports = function (ctx) {
  return {
    // app plugins (src/plugins)
    plugins: [
      'axios',
      'vuelidate',
      'vue-i18n',
      'iziToast',
      'vue-qrcode'
    ],
    // import css files (src/css)
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons',
      'fontawesome'
      // 'ionicons',
      // 'mdi'
    ],
    supportIE: false,
    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          // loader: 'eslint-loader',
          exclude: /node_modules/
        }),
        cfg.resolve.alias = {
          ...cfg.resolve.alias,
          '@': path.resolve(__dirname, './src')
        }
      }
    },
    devServer: {
      https: true,
      port: 9443,
      open: true // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QLayout',
        'QPageContainer',
        'QModal',
        'QModalLayout',
        'QField',
        'QInput',
        'QBtn',
        'QBtnToggle',
        'QIcon',
        'QDialog',
        'QStepper',
        'QStep',
        'QInnerLoading',
        'QPopover',
        'QList',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QToggle',
        'QSelect',
        'QTabs',
        'QTab',
        'QTabPane',
        'QCard',
        'QCardTitle',
        'QCardMain',
        'QCardActions',
        'QCollapsible',
        'QSearch',
        'QItemTile',
        'QProgress',
        'QCheckbox',
        'QTooltip',
        'QSlideTransition'
      ],
      directives: [
        'Ripple',
        'CloseOverlay'
      ],
      // Quasar plugins
      plugins: [
        'Screen',
        'LocalStorage',
        'Loading'
      ],
      iconSet: 'fontawesome', // ctx.theme.mat ? 'material-icons' : 'ionicons'
      i18n: 'pt-br' // Quasar language
    },
    // animations: 'all' --- includes all animations
    animations: [],
    ssr: {
      pwa: false
    },
    pwa: {
      workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        
        "name": "MediAgenda",
        "short_name": "mediagenda_3.0",
        "description": "Agendamento online",
        "display": "standalone",
        "start_url": "/",
        "orientation": "portrait",
        "background_color": "#ffffff",
        "theme_color": "#027be3",
        "icons": [
          {
              "src": "/statics/icons/icon-128x128.png",
              "sizes": "128x128",
              "type": "image/png"
          },
          {
              "src": "/statics/icons/icon-192x192.png",
              "sizes": "192x192",
              "type": "image/png"
          },
          {
              "src": "/statics/icons/icon-256x256.png",
              "sizes": "256x256",
              "type": "image/png"
          },
          {
              "src": "/statics/icons/icon-384x384.png",
              "sizes": "384x384",
              "type": "image/png"
          },
          {
              "src": "/statics/icons/icon-512x512.png",
              "sizes": "512x512",
              "type": "image/png"
          }
        ]
      
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
