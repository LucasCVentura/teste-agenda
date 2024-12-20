<template>
  <q-layout view="lHh Lpr lFf" class="window-height block">
    <q-page-container class="page-flexbox">
      <medi-menu :config="'cadastro'" />
      <main class="flex-grow-1" @keyup.enter="$refs.confirm.$el.click()">
        <img class="q-mx-auto assist-center" :src="caminhoAssistente" alt="Assistente">
        <div class="row">
          <h4 class="text-azul1 col-sm-10 col-xs-12 offset-sm-1 q-mt-lg" v-html="$t('confirmacao.cadastroConcluido')" />
          <q-input v-model="codigo" :maxlength="codMaxLength" :float-label="$t('confirmacao.insiraCodConf')" class="col-md-8 col-xs-10 offset-md-2 offset-xs-1 q-mt-lg" color="white" inverted inverted-light />
          <span class="col-xs-6 col-sm-4 offset-xs-3 offset-sm-4 reenviarCodigo q-mt-md q-body-2 uppercase" v-html="$t('confirmacao.reenviarCodigo')" @click="reenviarCodigo()" ref="step"/>
        </div>
      </main>
      <footer class="row">
        <q-btn class="col-xs-6 col-sm-4 offset-xs-3 offset-sm-4 q-py-md bg-azul1 text-white" :label="$t('confirmacao.confirmar')" icon-right="fas fa-arrow-right" @click="autenticarCodigo()" :disabled="disabled" :loading="loading" ref="confirm"/>
      </footer>
      <!-- INICIO MODAL CONFIRMACAO -->
      <q-modal content-classes="bg-fundo" v-model="modalConfirmacao" @show="$refs.toDashboard.$el.focus()" maximized>
        <q-modal-layout class="layout-agenda">
          <div class="page-flexbox">
            <medi-menu :config="'cadastro'" />
            <main class="flex-grow-1">
              <img class="q-mx-auto q-mb-lg assist-center" :src="caminhoAssistente" alt="Assistente">
              <section class="row">
                <div class="q-display-1 q-mb-sm q-mt-none text-azul1 col-10 offset-1" v-html="$t('confirmacao.vamosAgendar')" />
                <div class="q-title q-mt-none text-azul1 col-xs-12 col-sm-10 col-md-8 offset-sm-1 offset-md-2" v-html="$t('confirmacao.acesso')" />
                <div class="q-title q-mt-lg q-mb-md text-cinza1 col-xs-12 col-md-8 offset-md-2" v-html="$t('confirmacao.agendaRequisitos')" />
                <div v-for="(item, i) in required" :key="i" class="q-title text-secondary q-mb-xs col-xs-10 col-sm-6 col-md-5 offset-xs-1 offset-sm-3 offset-md-4 text-left">
                  <span class="q-ml-lg">
                    <q-icon color="secondary" name="fas fa-check-square" /><span class="q-ml-sm">{{ item.message }}</span>
                  </span>
                </div>
              </section>
            </main>
            <footer>
              <q-btn size="17px" class="text-azul1 bg-white no-shadow float-left" icon="fas fa-arrow-left" outline v-close-overlay round />
              <q-btn :class="$q.screen.lt.md ? 'q-px-lg' : 'q-px-xl'" class="q-py-md bg-azul1 text-white float-right" :label="$t('confirmacao.agendar')" icon-right="fas fa-arrow-right" to="/dashboard" ref="toDashboard" />
            </footer>
          </div>
        </q-modal-layout>
      </q-modal>
      <!-- FIM MODAL CONFIRMACAO -->
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import { verificarCodigo, autenticarMidiaSocial, reenviarCodigo } from '@/services'
import JwtToken from '@/services/jwt-token'
import menuOpcoes from '@/components/menuOpcoes'

export default {
  components: {
    'medi-menu': menuOpcoes
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('limparUsuario')
    next()
  },
  data () {
    return {
      codigo: '',
      disabled: true,
      loading: false,
      confirmed: false,
      modalConfirmacao: false,
      codMaxLength: 6,
      required: [
        { message: this.$t('confirmacao.requisito1') },
        { message: this.$t('confirmacao.requisito2') }
      ]
    }
  },
  computed: {
    ...mapGetters({
      usuario: 'usuario'
    }),
    caminhoAssistente () {
      return this.$store.state.config.assistente
    }
  },
  watch: {
    codigo () {
      this.codigo.length === this.codMaxLength ? this.disabled = false : this.disabled = true
    }
  },
  methods: {
    autenticarCodigo () {
      if (!this.confirmed) {
        this.loading = true
        const login = this.usuario.email ? this.usuario.email : this.usuario.cpf
        new Promise((resolve, reject) => {
          verificarCodigo(login, this.codigo, resolve, reject)
        }).then(() => {
          let oauth = this.usuario.oauth
          if (oauth.token) {
            new Promise((resolve, reject) => {
              if (oauth.id.google) {
                autenticarMidiaSocial(this.usuario.email, oauth.id.google, oauth.token, 'Google', resolve, reject)
              } else {
                autenticarMidiaSocial(this.usuario.email, oauth.id.facebook, oauth.token, 'Facebook', resolve, reject)
              }
            }).then(response => {
              JwtToken.token = oauth.token
              this.$store.commit('AUTENTICAR')
              this.confirmed = true
              this.modalConfirmacao = true
            })
          } else {
            let usuario = { login: login, senha: this.usuario.senha, block: true }
            this.$store.dispatch('login', usuario)
              .then(() => {
                this.confirmed = true
                this.modalConfirmacao = true
              })
          }
        }).finally(() => {
          this.loading = false
        })
      } else {
        this.modalConfirmacao = true
      }
    },
    reenviarCodigo () {
      this.loading = true
      new Promise((resolve, reject) => {
        reenviarCodigo(this.usuario.cpf, this.usuario.email, resolve, reject)
      }).then(() => {
        this.loading = false
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="stylus">

.reenviarCodigo
  color $cinza2
  background-color transparent
  text-decoration none
  &&:hover
    cursor pointer
    text-decoration underline
</style>
