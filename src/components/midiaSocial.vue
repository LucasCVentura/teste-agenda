<template>
  <section class="col-md-6 col-sm-8 col-xs-12 offset-sm-2 offset-md-3">
    <q-btn class="full-width facebook text-white" :label="$t('login.facebook')" icon="fab fa-facebook-f" size="lg" @click="openFbLoginDialog" rounded no-caps />
    <q-btn class="full-width q-mt-md google text-white" :label="$t('login.google')" icon="fab fa-google" size="lg" ref="googleSignIn" rounded no-caps />
    <!-- INICIO DIALOG -->
    <q-dialog v-model="vinculoDialog" @ok="$router.push(next)" prevent-close>
      <span slot="title" v-html="$t('login.dialogTitulo')" />
      <span slot="message" v-html="`${$t('login.dialogMensagem1')} ${midia} ${$t('login.dialogMensagem2')}`" />
    </q-dialog>
    <!-- FIM DIALOG -->
  </section>
</template>

<script>
/* global FB, gapi */
import { date } from 'quasar'
const { formatDate } = date
import JwtToken from '@/services/jwt-token'
import { autenticarMidiaSocial } from '@/services'

export default {
  data () {
    return {
      midia: '',
      next: '',
      vinculoDialog: false
    }
  },
  created () {
    let facebookSrc = 'http://connect.facebook.net/pt_BR/all.js'
    let googleSrc = 'https://apis.google.com/js/platform.js'
    let scriptsExists = [...document.head.querySelectorAll('script')].filter(script => script.src === facebookSrc || script.src === googleSrc)

    if (scriptsExists.length === 0) {
      let facebookScript = document.createElement('script')
      facebookScript.setAttribute('src', facebookSrc)
      facebookScript.async = true
      document.head.appendChild(facebookScript)
      facebookScript.onload = () => {
        this.initFacebookClient()
      }

      let googleScript = document.createElement('script')
      googleScript.setAttribute('src', googleSrc)
      googleScript.async = true
      document.head.appendChild(googleScript)
      googleScript.onload = () => {
        this.initGoogleClient()
      }
    }
  },
  methods: {
    initFacebookClient () {
      window.fbAsyncInit = function () {
        FB.init({
          appId: '358648771371014',
          status: true,
          cookie: true,
          xfbml: true,
          version: 'v3.3'
        })
      }
    },
    initGoogleClient () {
      gapi.load('auth2', () => {
        const auth2 = gapi.auth2.init({
          client_id: '1046275115885-ug3g9ro0qg3rfbf3rfmtap3eonp0segp.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin'
          // ux_mode: 'redirect' - Não abre popup
        })

        this.openGoogleDialog(auth2)
      })
    },
    openFbLoginDialog () {
      this.$emit('mediaLoading', true)

      FB.login(response => {
        if (response.status === 'connected') {
          const { userID, accessToken } = response.authResponse

          FB.api('/me', 'GET', { fields: 'name,id,gender,birthday,email' }, facebookUser => {
            const { email, name, gender } = facebookUser

            new Promise((resolve, reject) => {
              autenticarMidiaSocial(email, userID, accessToken, 'Facebook', resolve, reject)
            }).then(response => {
              if (response.status === 204) { // Usuário não encontrado
                let dataNasc = formatDate(new Date(facebookUser.birthday), 'DD/MM/YYYY')
                this.$store.dispatch('cadastroStep1', [name, email])
                this.$store.commit('SET_OAUTH_TOKEN', accessToken)
                this.$store.commit('SET_ID_FACEBOOK', userID)
                this.$store.commit('SET_DATA_NASC', dataNasc)
                // Solicitar permissão user_gender na API
                if (gender) this.$store.commit('SET_SEXO', gender)
                return this.$emit('mediaNotFound')
              }

              if (response.status === 200) { // Usuário logado
                JwtToken.token = accessToken
                this.$store.commit('AUTENTICAR')
                this.next = '/dashboard'
              } else { // Usuário não confirmou seu cadastro
                this.$store.commit('SET_EMAIL', email)
                this.$store.commit('SET_ID_FACEBOOK', userID)
                this.$store.commit('SET_OAUTH_TOKEN', accessToken)
                this.$store.dispatch('confirmarCodigo', true)
                this.next = '/confirmacao/codigo'
              }

              if (response.data) { // Conta vinculada a mídia
                this.midia = 'Facebook'
                this.vinculoDialog = true
              } else {
                this.$router.push(this.next)
              }
            }).finally(() => {
              this.$emit('mediaLoading', false)
            })
          })
        } else {
          this.$emit('mediaLoading', false)
        }
      }, { scope: 'email' })
    },
    openGoogleDialog (auth2) {
      auth2.attachClickHandler(this.$refs.googleSignIn.$el, () => { this.$emit('mediaLoading', true) }, response => {
        let accessToken = response.getAuthResponse().id_token
        let googleUser = response.getBasicProfile()
        let id = googleUser.getId()
        let nome = googleUser.getName()
        let email = googleUser.getEmail()

        new Promise((resolve, reject) => {
          autenticarMidiaSocial(email, id, accessToken, 'Google', resolve, reject)
        }).then(response => {
          if (response.status === 204) { // Usuário não encontrado
            this.$store.dispatch('cadastroStep1', [nome, email])
            this.$store.commit('SET_ID_GOOGLE', id)
            this.$store.commit('SET_OAUTH_TOKEN', accessToken)
            return this.$emit('mediaNotFound')
          }

          if (response.status === 200) { // Usuário logado
            JwtToken.token = accessToken
            this.$store.commit('AUTENTICAR')
            this.next = '/dashboard'
          } else { // Usuário não confirmou seu cadastro
            this.$store.commit('SET_EMAIL', email)
            this.$store.commit('SET_ID_GOOGLE', id)
            this.$store.commit('SET_OAUTH_TOKEN', accessToken)
            this.$store.dispatch('confirmarCodigo', true)
            this.next = '/confirmacao/codigo'
          }

          if (response.data) { // Conta vinculada a mídia
            this.midia = 'Google'
            this.vinculoDialog = true
          } else {
            this.$router.push(this.next)
          }
        }).finally(() => {
          this.$emit('mediaLoading', false)
        })
      }, error => {
        console.log(error)
        this.$emit('mediaLoading', false)
      })
    }
  }
}
</script>

<style lang="stylus">

btnSocial(args)
  background args

.facebook
  btnSocial(#5488C4)
  .q-btn-inner
    div
      width 85%

.google
  btnSocial(#DF4A32)
  i.fab.fa-google
    margin-right 0
  .q-btn-inner
    div
      width 85%

</style>
