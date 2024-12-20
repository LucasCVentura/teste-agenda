/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding initialization code.
 * Use "quasar new plugin <name>" and add it there.
 * One plugin per concern. Then reference the file(s) in quasar.conf.js > plugins:
 * plugins: ['file', ...] // do not add ".js" extension to it.
 **/



import 'quasar-extras/roboto-font/roboto-font.css'

import 'quasar-extras/material-icons/material-icons.css'

import 'quasar-extras/fontawesome/fontawesome.css'




import 'quasar-app-styl'


import 'src/css/app.styl'


import Vue from 'vue'
import createApp from './app.js'


import 'app/src-pwa/register-service-worker.js'



import pAxios from 'src/plugins/axios'

import pVuelidate from 'src/plugins/vuelidate'

import pVuei18n from 'src/plugins/vue-i18n'

import pIziToast from 'src/plugins/iziToast'

import pVueqrcode from 'src/plugins/vue-qrcode'





import FastClick from 'fastclick'







Vue.config.devtools = true
Vue.config.productionTip = false



console.info('[Quasar] Running PWA with MAT theme.')
console.info('[Quasar] Forcing PWA into the network-first approach to not break Hot Module Replacement while developing.')


const { app, store, router } = createApp()



  // Needed only for iOS PWAs
if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && window.navigator.standalone) {

  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body)
  }, false)

}




;[pAxios,pVuelidate,pVuei18n,pIziToast,pVueqrcode].forEach(plugin => {
  plugin({
    app,
    router,
    store,
    Vue,
    ssrContext: null
  })
})









new Vue(app)






