import { Platform, LocalStorage } from 'quasar'

export default {
  getServer () {
    return LocalStorage.get.item('urlAgendaServidor') ? LocalStorage.get.item('urlAgendaServidor') : window.location.origin
  },
  getProjectPath () {
    if (Platform.is.mobile) {
      return 'mediagenda_web'
    }
    return window.location.pathname.split('/')[1] ? window.location.pathname.split('/')[1] : 'mediagenda_web'
  },
  getURL () {
    return `${this.getServer()}/${this.getProjectPath()}/rest`
  }
}
