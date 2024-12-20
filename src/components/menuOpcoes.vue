<template>
  <header class="q-mb-sm">
    <img v-if="config !== 'servidor'" class="float-left" style="max-height: 36px" :src="caminhoLogo" alt="Logo">
    <q-btn v-if="config === 'servidor'" class="text-azul1 no-shadow float-right" icon="fas fa-bars">
      <q-popover class="menuOpcoes">
        <q-list link>
          <q-item v-if="!isProduction" @click.native="servidor.dialog = true" v-close-overlay>
            <q-item-main :label="$t('menuOpcoes.servidor')" />
          </q-item>
          <q-item v-else @click.native="tratarQRCode" v-close-overlay>
            <q-item-main :label="$t('menuOpcoes.servidor')" />
          </q-item>
          <q-item @click.native="idioma.dialog = true" v-close-overlay>
            <q-item-main :label="$tc('menuOpcoes.idioma', 1)" />
          </q-item>
          <q-item separator>
            <q-item-main :label="versao ? versao : '-'"/>
          </q-item>
        </q-list>
      </q-popover>
    </q-btn>
    <q-btn v-else :label="$t('menuOpcoes.menu')" class="text-azul1 no-shadow float-right" icon-right="fas fa-bars">
      <q-popover class="menuOpcoes">
        <q-list link>
          <q-item v-if="config === 'cadastro'" to="/login" v-close-overlay>
            <q-item-main :label="$t('menuOpcoes.inicio')" />
          </q-item>
          <q-item v-if="config === 'agendamento'" to="/dashboard" v-close-overlay>
            <q-item-main :label="$t('menuOpcoes.meusExames')"/>
          </q-item>
          <q-item v-if="config === 'dashboard'" to="/DadosCadastrais" v-close-overlay>
            <q-item-main :label="$t('menuOpcoes.minhaConta')"/>
          </q-item>
          <q-item v-if="config === 'dashboard'" @click.native="setTeleAtendimento(false)" v-close-overlay>
            <q-item-main :label="$t('menuOpcoes.agendarExames')"/>
          </q-item>
          <q-item v-if="config === 'dashboard' && this.$store.state.config.teleAtendimento == 'true'" @click.native="setTeleAtendimento(true)" v-close-overlay>
            <q-item-main :label="$t('menuOpcoes.teleAtendimento')"/>
          </q-item>
          <q-item v-if="config === 'dashboard'" @click.native="idioma.dialog = true" v-close-overlay>
            <q-item-main :label="$tc('menuOpcoes.idioma', 1)" />
          </q-item>
          <q-item v-if="config === 'dashboard'" @click.native="logout" v-close-overlay>
            <q-item-main :label="$t('menuOpcoes.sair')" />
          </q-item>
        </q-list>
      </q-popover>
    </q-btn>

    <!-- MODAL LEITURA QRCODE -->
    <q-modal v-model="lendoQRCode" class="qrcode-overlay" content-css="background-color: rgba(0,0,0,0.15);" maximized @hide="pararQRCode">
      <q-modal-layout footer-class="no-shadow">
        <div class="absolute-center qrcode-reader"> <hr> </div>
        <img class="q-mt-xl" style="max-height: 60px;" :src="caminhoLogo" alt="Logo">
        <footer slot="footer" class="no-shadow">
          <q-btn class="q-mb-xl bg-azul1 text-white" :label="$t('menuOpcoes.voltar')" @click="pararQRCode" />
        </footer>
      </q-modal-layout>
    </q-modal>
    <!-- FIM MODAL LEITURA QRCODE -->

    <!-- INICIO DIALOG APONTAMENTO -->
    <q-dialog v-model="apontamentoDialog" class="qrcode-servidor text-left">
      <span slot="title" v-html="$t('menuOpcoes.servidor')" />
      <div slot="body">
        <qrcode :value="qrcodeText" :options="{ width: 225 }"></qrcode>
      </div>
    </q-dialog>
    <!-- FIM DIALOG APONTAMENTO -->

    <!-- INICIO DIALOG SERVIDOR -->
    <q-dialog v-model="servidor.dialog" class="text-left" @ok="salvarDevServer" @cancel="servidor.URL = ''">
      <span slot="title" v-html="$t('menuOpcoes.urlServidor')" />
      <span slot="message" class="text-cinza1" v-text="`${$t('menuOpcoes.urlAtual')} `" />
      <strong slot="message" class="text-cinza1" v-text="servidor.urlPadrao" />
      <div slot="body">
        <q-field :label="$t('menuOpcoes.exemploUrl')" :helper="$t('menuOpcoes.urlHelper')" :label-width="12">
          <q-input @keyup.enter="salvarDevServer" prefix="http://" v-model="servidor.URL" />
        </q-field>
      </div>
      <template slot="buttons" slot-scope="props">
        <q-btn flat :label="$t('menuOpcoes.fechar')" @click="props.cancel" />
        <q-btn flat :label="$t('menuOpcoes.salvar')" @click="props.ok" />
      </template>
    </q-dialog>
    <!-- FIM DIALOG SERVIDOR -->

    <!-- INICIO DIALOG IDIOMA -->
    <q-dialog v-model="idioma.dialog" class="text-left" @ok="mudarIdioma">
      <span slot="title" v-text="$t('menuOpcoes.escolhaIdioma')" />
      <div slot="body">
        <q-select v-model="idioma.selecionado" class="q-mb-md" :float-label="$tc('menuOpcoes.idioma', 2)" :options="idioma.opcoes" />
      </div>
      <template slot="buttons" slot-scope="props">
        <q-btn flat :label="$t('menuOpcoes.fechar')" @click="props.cancel" />
        <q-btn flat :label="$t('menuOpcoes.definir')" @click="props.ok" />
      </template>
    </q-dialog>
    <!-- FIM DIALOG IDIOMA -->
  </header>
</template>

<script>
import client from '@/services/client'
import { instance, configuracoesIniciais } from '@/services/chamadas/semToken'
import { instance as tokenInstance } from '@/services/chamadas/comToken'
import JwtToken from '@/services/jwt-token'
import { i18n } from '@/plugins/vue-i18n'

export default {
  props: {
    config: String
  },
  data () {
    return {
      isProduction: process.env.PROD,
      idioma: {
        icone: '',
        dialog: false,
        selecionado: i18n.locale,
        opcoes: [
          { label: `${this.$t('menuOpcoes.ingles')} ${this.$q.platform.is.mobile ? '&#127482&#127480' : '(&#127482&#127480)'}`, value: 'en-us' },
          { label: `${this.$t('menuOpcoes.portugues')} ${this.$q.platform.is.mobile ? '&#127463&#127479' : '(&#127463&#127479)'}`, value: 'pt-br' },
          { label: `${this.$t('menuOpcoes.espanhol')} ${this.$q.platform.is.mobile ? '&#127466&#127480' : '(&#127466&#127480)'}`, value: 'es-es' }
        ]
      },
      servidor: {
        URL: '',
        urlPadrao: '',
        dialog: false
      },
      apontamentoDialog: false,
      lendoQRCode: false,
      formatoData: 'DD/MM/YYYY'
    }
  },
  created () {
    const config = this.$store.state.config;

    let updatedConfig = config;

    if (i18n.locale === "en-us") {
      updatedConfig = {
        ...config,
        formatoDataIngles: true
      };

      console.log(updatedConfig)
      this.$store.commit("ALTERAR_CONFIG", updatedConfig);
    }

  },
  computed: {
    caminhoLogo () {
      return this.$store.state.config.logo
    },
    qrcodeText () {
      return this.$store.state.config.urlServidor
    },
    versao () {
      return this.$store.state.config.versao
    },
    currentLocale() {
      return i18n.locale; // Supondo que você tenha uma instância de i18n
    }
  },
  mounted () {
    if (this.$q.localStorage.get.item('urlAgendaServidor')) {
      this.servidor.urlPadrao = this.$q.localStorage.get.item('urlAgendaServidor')
    } else {
      this.servidor.urlPadrao = window.location.origin
      this.$q.localStorage.set('urlAgendaServidor', window.location.origin)
    }
  },
  beforeDestroy () {
    if (this.$q.platform.is.cordova) this.pararQRCode()
  },
  methods: {
    iniciarQRCode () {
      window.QRScanner.prepare((err, status) => {
        if (err) {
          console.error(err)
        }
        if (status.authorized) {
          this.lendoQRCode = true
          document.querySelector('body').style.backgroundColor = 'transparent'
          document.querySelector('#q-app').style.opacity = 0
          window.QRScanner.scan((err, text) => {
            if (err) {
              console.log(err)
            } else {
              console.log(text)
              this.mudarServidor(text)
              this.pararQRCode()
            }
          })
          window.QRScanner.show()
        }
      })
    },
    pararQRCode () {
      window.QRScanner.destroy((status) => {
        document.querySelector('#q-app').style.opacity = null
        setTimeout(() => {
          document.querySelector('body').style.backgroundColor = null
          this.lendoQRCode = false
        }, 100)
      })
    },
    tratarQRCode () {
      if (this.$q.platform.is.cordova) {
        this.iniciarQRCode()
      } else {
        this.apontamentoDialog = true
      }
    },
    salvarDevServer () {
      let newURL = `http://${this.servidor.URL}`
      this.servidor.dialog = false
      this.mudarServidor(newURL)
      this.servidor.urlPadrao = newURL
      this.servidor.URL = ''
    },
    mudarServidor (newURL) {
      this.$q.localStorage.set('urlAgendaServidor', newURL)
      let newBaseURL = `${newURL}/${client.getProjectPath()}/rest`
      instance.defaults.baseURL = newBaseURL
      tokenInstance.defaults.baseURL = newBaseURL
      configuracoesIniciais()
    },
    mudarIdioma () {
      i18n.locale = this.idioma.selecionado
    },
    logout () {
      JwtToken.logout()
    },
    setTeleAtendimento (value) {
      if (value) {
        this.$store.dispatch('agendarTeleAtendimento')
          .then(() => {
            this.$router.push('/agendamento/exames')
          })
      } else {
        this.$store.dispatch('removerTeleAtendimento')
          .then(() => {
            this.$router.push('/agendamento/exames')
          })
      }
    }
  },
  watch: {
    currentLocale(newLocale) {
      console.log("O idioma foi alterado para:", newLocale);

      const config = this.$store.state.config;

      const isEnglish = newLocale === "en-us";
      const updatedConfig = {
        ...config,
        formatoDataIngles: isEnglish
      };

      console.log(updatedConfig);

      this.$store.commit("ALTERAR_CONFIG", updatedConfig);

    }
  },
}
</script>

<style lang="stylus">

@keyframes MoveUpDown
  0%, 100%
    margin-top 0
  50%
    margin-top 296px

.qrcode-reader
  background-color rgba(255, 255, 255, 0.1)
  height 300px
  width 300px
  border: 0.3px solid white
  hr
    height 4px
    border none
    background #3c9fce
    animation MoveUpDown 3s linear infinite

.qrcode-overlay, .qrcode-overlay .modal-content
  transition none !important

.qrcode-scan
  opacity 0
  background-color transparent

.qrcode-servidor .modal-body.modal-scroll
  overflow hidden

.menuOpcoes.q-popover
  .q-list
    padding 8px 0
    text-transform none
    min-width 100px

</style>
