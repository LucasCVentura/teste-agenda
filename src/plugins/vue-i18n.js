import VueI18n from 'vue-i18n'
import { Quasar } from 'quasar'
import messages from '@/i18n'
import dateTimeFormats from '@/i18n/dateTimeFormats'

let i18n

export default ({ app, Vue }) => {
  Vue.use(VueI18n)
  // Pega a linguagem do browser no início
  let language = Quasar.i18n.getLocale()
  if (language.includes('es-')) {
    language = 'es-es'
  } else if (language.includes('en-')) {
    language = 'en-us'
  } else {
    language = 'pt-br'
  }
  app.i18n = new VueI18n({
    locale: language,
    fallbackLocale: 'pt-br',
    dateTimeFormats,
    messages
  })
  i18n = app.i18n
}

export { i18n }
