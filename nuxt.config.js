import { defineNuxtConfig } from '@nuxt/bridge'

import defineApolloConfig, {
  toApolloEndpoint,
} from './utils/config/defineApolloConfig'

import { URLS } from './utils/constants'

const baseUrl = process.env.BASE_URL || 'http://localhost:9090'

export default defineNuxtConfig({
  alias: {
    tslib: 'tslib/tslib.es6.js',
  },

  vue: {
    config: {
      productionTip: false,
      runtimeCompiler: true,
    },
  },

  server: {
    port: 9090, // default: 3000
    host: '0.0.0.0',
  },

  // currently we can only use nitro in development https://github.com/nuxt/framework/issues/886
  bridge: {
    nitro: process.env.NODE_ENV !== 'production',
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'KodaDot - Kusama NFT Market Explorer',
    titleTemplate: '%s | Low Carbon NFTs',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      // { property: 'og:site_name', content: 'KodaDot' },
      {
        hid: 'description',
        name: 'description',
        content: 'Creating Carbonless NFTs on Kusama',
      },
      { property: 'og:locale', content: 'en_US' },
      { property: 'twitter:site', content: '@KodaDot' },
      { property: 'twitter:card', content: 'summary_large_image' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: baseUrl },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'KodaDot - Kusama NFT Market Explorer',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Creating Carbonless NFTs on Kusama',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${baseUrl}/kodadot_card_root.png`,
      },
      { hid: 'twitter:url', name: 'twitter:url', content: baseUrl },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'KodaDot - Kusama NFT Market Explorer',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'Creating Carbonless NFTs on Kusama',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: `${baseUrl}/kodadot_card_root.png`,
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@600;700&display=swap',
      },
    ],
  },

  loadingIndicator: {
    name: 'folding-cube',
    color: '#fc007b',
    background: 'black',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['styles/index.scss', '@fortawesome/fontawesome-svg-core/styles.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vuex-persist', mode: 'client' },
    { src: '~/plugins/polkadot', mode: 'client' },
    { src: '~/plugins/endpoint', mode: 'client' },
    { src: '~/plugins/seoMetaGenerator', mode: 'client' },
    { src: '~/plugins/keyboardEvents', mode: 'client' },
    { src: '~/plugins/userBalance', mode: 'client' },
    { src: '~/plugins/icons', mode: 'client' },
    { src: '~/plugins/InfiniteScroll', mode: 'client' },
    { src: '~/plugins/consola', mode: 'client' },
    '~/plugins/filters',
    '~/plugins/globalVariables',
    '~/plugins/pwa',
    '~/plugins/vueAudioVisual',
    '~/plugins/vueClipboard',
    '~/plugins/vueSocialSharing',
    '~/plugins/vueTippy',
    '~/plugins/vueGtag',
  ],

  router: {
    middleware: ['prefix', 'redirects'],
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      {
        path: '~/components',
        extensions: ['vue'],
      },
      {
        path: '~/components/landing',
        extensions: ['vue'],
      },
      {
        path: '~/components/metadata',
        extensions: ['vue'],
      },
      {
        path: '~/components/rmrk',
        extensions: ['vue'],
      },
      {
        path: '~/components/series',
        extensions: ['vue'],
      },
      {
        path: '~/components/settings',
        extensions: ['vue'],
      },
      {
        path: '~/components/shared',
        extensions: ['vue'],
      },
      {
        path: '~/components/spotlight',
        extensions: ['vue'],
      },
      {
        path: '~/components/transfer',
        extensions: ['vue'],
      },
      {
        path: '~/components/unique',
        extensions: ['vue'],
      },
    ],
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/pwa'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    [
      'nuxt-buefy',
      {
        css: false,
        defaultIconPack: 'fas',
        defaultIconComponent: 'vue-fontawesome',
        defaultFieldLabelPosition: 'inside',
      },
    ],
    '@nuxtjs/apollo',
    '@nuxtjs/i18n',
  ],

  pwa: {
    manifest: {
      name: 'KodaDot - Polkadot / Kusama NFT explorer',
      short_name: 'KodaDot',
      background_color: '#000000',
      theme_color: '#000000',
    },
    workbox: {
      // importScripts: [
      //   'service-worker.js'
      // ],
      // swDest: 'service-worker.js',
      // swURL: './'
    },

    // according to Google using purpose ['any', 'maskable'] is discouraged
    icon: {
      purpose: ['any'],
    },
  },

  i18n: {
    vueI18nLoader: true,
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lang',
      fallbackLocale: 'en',
      alwaysRedirect: true,
    },
    loadLanguagesAsync: true,
    langDir: 'langDir',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json' },
      { code: 'cn', iso: 'cn', file: 'cn.json' },
      { code: 'fr', iso: 'fr', file: 'fr.json' },
      { code: 'es', iso: 'es', file: 'es.json' },
      { code: 'bn', iso: 'bn', file: 'bn.json' },
      { code: 'cz', iso: 'cz', file: 'cz.json' },
      { code: 'de', iso: 'de', file: 'de.json' },
      { code: 'hi', iso: 'hi', file: 'hi.json' },
      { code: 'it', iso: 'it', file: 'it.json' },
      { code: 'jp', iso: 'jp', file: 'jp.json' },
      { code: 'ko', iso: 'ko', file: 'ko.json' },
      { code: 'nl', iso: 'nl', file: 'nl.json' },
      { code: 'pl', iso: 'pl', file: 'pl.json' },
      { code: 'pt', iso: 'pt', file: 'pt.json' },
      { code: 'ru', iso: 'ru', file: 'ru.json' },
      { code: 'sk', iso: 'sk', file: 'sk.json' },
      { code: 'tu', iso: 'tu', file: 'tu.json' },
      { code: 'ua', iso: 'ua', file: 'ua.json' },
      { code: 'ur', iso: 'ur', file: 'ur.json' },
      { code: 'vt', iso: 'vt', file: 'vt.json' },
    ],
    strategy: 'no_prefix',
    vueI18n: '~/utils/config/i18n',
  },

  apollo: {
    clientConfigs: {
      ...defineApolloConfig(),
      subsquid: toApolloEndpoint(
        process.env.SUBSQUID_ENDPOINT || URLS.koda.subsquidv6
      ),
      bsx: toApolloEndpoint(URLS.koda.snekk),
    }, // https://github.com/nuxt-community/apollo-module#options
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      // silence babel warning regarding exceeding file sizes (>500kb)
      compact: true,
    },
    transpile: [
      '@kodadot1/sub-api',
      '@polkadot/api',
      '@polkadot/rpc-core',
      '@polkadot/rpc-provider',
      '@polkadot/types',
      '@polkadot/extension-dapp',
      '@polkadot/util-crypto',
      '@polkadot/keyring',
      '@polkadot/ui-keyring',
      '@polkadot/ui-settings',
      '@polkadot/hw-ledger',
      '@polkadot/types-codec',
      '@google/model-viewer', // TODO check to see if it works without transpilation in future nuxt releases
    ],
    extend(config) {
      // add markdown loader
      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader',
      })

      config.module.rules.push({
        test: /\.js$/,
        loader: require.resolve('@open-wc/webpack-import-meta-loader'),
      })
      config.resolve.alias['vue$'] = 'vue/dist/vue.esm.js'
      config.node = {
        fs: 'empty',
      }
    },
    postcss: null,
  },

  // env: {
  //   baseUrl : process.env.BASE_URL || 'http://localhost:9090',
  // },
  // https://nuxtjs.org/docs/configuration-glossary/configuration-env/
  publicRuntimeConfig: {
    prefix: process.env.URL_PREFIX || 'rmrk',
    baseUrl: process.env.BASE_URL || 'http://localhost:9090',
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || '',
  },
  // In case of using ssr
  // privateRuntimeConfig: {}
})
