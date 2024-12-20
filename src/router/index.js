import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import jwtToken from '@/services/jwt-token'
import store from '@/store/'

Vue.use(VueRouter)

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes,

  // Leave these as is and change from quasar.conf.js instead: quasar.conf.js -> build -> vueRouterMode
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE
})

router.beforeEach((to, from, next) => {
  if (!jwtToken.hasToken()) {
    store.commit('CANCELAR_AUTENTICACAO')
    to.name === 'agendamento' || to.name === 'dashboard' ? next('/login') : next()
  } else if ((to.name === 'login' || to.name === 'recuperacao' || to.name === 'cadastro' || to.name === 'confirmacao') && jwtToken.hasToken()) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
