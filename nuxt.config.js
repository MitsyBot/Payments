export default {
  server: {
    port: 5671
  },
  head: {
    titleTemplate: '%s | PoluxPayments',
    htmlAttrs: {
      lang: 'pt-br'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Gateway de pagamentos utilizado pelos serviços PoluxTrail' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [{ src: 'roboto-base64', lang: 'css' }, '@/assets/css/styles.css'],

  loading: { color: '#f895fb' },

  plugins: [
  ],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss'
  ],

  modules: [
    '@nuxtjs/axios'
  ],

  axios: {},

  build: {
  }
}
