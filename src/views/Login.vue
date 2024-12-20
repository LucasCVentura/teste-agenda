<template>
  <q-layout view="lHh Lpr lFf" class="window-height block">
    <cookie-law
      style="text-align:left;background-color:#E9E9E9"
      theme="base"
      buttonClass="buttonCookie Cookie__button"
      storageName="CookieInfoScriptMediAgendaWeb"
      :buttonText="`${$t('login.aceitarCookie')}`"
      :message="`${$t('login.cookieMensagem')}`"
    ></cookie-law>
    <q-page-container
      :class="this.$q.platform.is.mobile ? 'page-flexbox' : 'login-container'"
    >
      <medi-menu class="menuServidor" :config="'servidor'" />
      <main :class="this.$q.platform.is.mobile ? 'flex-grow-1' : ''">
        <section class="full-width">
          <img
            class="q-mt-md q-mb-sm"
            style="max-height: 60px;"
            :src="configInicial.imagemLogo"
            alt="Logo"
          />
         
          <installPWA />
          
          <div
            class="q-display-1 q-mt-md q-mb-lg text-azul1"
            v-html="$t('login.agendaOnline')"
          />
          <div class="row">
            <template
              v-if="!this.$q.platform.is.cordova && configInicial.midiasSociais"
            >
              <medi-midiaSocial
                @mediaLoading="mediaLoading"
                @mediaNotFound="unregisteredModal = true"
              />
              <div
                class="q-mt-md q-mb-xs q-body-1 text-explicativo col-10 offset-1"
                v-html="$t('login.mensagem')"
              />
              <div
                class="q-my-md q-body-1 text-cinza1 col-12"
                v-html="$t('login.ou')"
              />
            </template>
            <section
              class="col-md-8 col-xs-10 offset-md-2 offset-xs-1"
              @keyup.enter="$refs.continue.$el.click()"
            >
              <q-field
                v-if="!senhaStep"
                class="q-mb-lg"
                :error="erroLogin"
                :error-label="$t('login.loginError')"
              >
                <q-input
                  v-model="login"
                  class="errorColorFix"
                  :float-label="$t('login.login')"
                  color="white"
                  inverted
                  inverted-light
                />
              </q-field>
              <div v-else class="q-mb-lg">
                <q-field class="q-mb-md">
                  <q-input
                    v-model="senha"
                    type="password"
                    class="errorColorFix col-4"
                    :float-label="$t('login.senha')"
                    color="white"
                    :before="[
                      {
                        icon: 'arrow_back',
                        handler() {
                          senhaStep = false;
                        }
                      }
                    ]"
                    inverted
                    inverted-light
                  />
                </q-field>
                <router-link tag="section" to="/recuperacao/senha">
                  <span
                    class="esqueciSenha q-body-2 uppercase"
                    v-html="$t('login.esqueciSenha')"
                  />
                </router-link>

                <router-link
                  v-if="
                    this.$store.state.config.habilitarRecuperacaoWhatsApp ===
                      'T'
                  "
                  tag="section"
                  to="/recuperacao/senhawpp"
                >
                  <span
                    class="esqueciSenha q-body-2 uppercase"
                    v-html="$t('login.esqueciSenhaWpp')"
                  />
                </router-link>
              </div>
            </section>
          </div>
        </section>
      </main>
      <footer class="row">
        <q-btn
          class="col-xs-6 col-sm-4 offset-xs-3 offset-sm-4 q-mt-lg q-py-md bg-azul1 text-white"
          :label="$t('login.continuar')"
          icon-right="fas fa-arrow-right"
          @click="autenticar"
          :loading="loading"
          :disabled="disabled"
          ref="continue"
        />
      </footer>
      <!-- INICIO MODAL NÃO CADASTRADO -->
      <q-modal
        content-classes="bg-fundo"
        v-model="unregisteredModal"
        @show="$refs.toCadastro.$el.focus()"
        @hide="modalClose"
        maximized
      >
        <q-modal-layout class="layout-agenda">
          <div class="page-flexbox">
            <medi-menu :config="'idioma'" />
            <main class="flex-grow-1">
              <img
                class="q-mx-auto q-mb-lg assist-center"
                :src="configInicial.assistente"
                alt="Assistente"
              />
              <h4 class="text-azul1" v-html="$t('login.naoCadastrado')" />
            </main>
            <footer class="flex justify-between">
              <q-btn
                size="17px"
                class="text-azul1 bg-white no-shadow"
                icon="fas fa-arrow-left"
                outline
                v-close-overlay
                round
              />
              <q-btn
                :class="$q.screen.lt.md ? 'q-px-lg' : 'q-px-xl'"
                class="q-py-md bg-azul1 text-white"
                :label="$t('login.continuar')"
                icon-right="fas fa-arrow-right"
                to="/cadastro/nome"
                ref="toCadastro"
              />
            </footer>
          </div>
        </q-modal-layout>
      </q-modal>
      <!-- FIM MODAL NÃO CADASTRADO -->
    </q-page-container>
  </q-layout>
</template>

<script>
import CookieLaw from "vue-cookie-law";
import { buscarUsuario } from "@/services";
import midiaSocial from "@/components/midiaSocial";
import menuOpcoes from "@/components/menuOpcoes";
import { required, email } from "vuelidate/lib/validators";
import CPF from "gerador-validador-cpf";
import { mapGetters } from "vuex";
import { iziWarning } from "@/helpers/notifications";
import { i18n } from "@/plugins/vue-i18n";
import InstallPWA from '@/components/InstallPWA.vue';  // Importando o componente

export default {
  components: {
    "medi-menu": menuOpcoes,
    "medi-midiaSocial": midiaSocial,
    CookieLaw,
    InstallPWA
  },
  validations: {
    login: { required, email }
  },
  data() {
    return {
      login: "",
      tipoLogin: "", // Login por email ou cpf
      senha: "",
      loading: false,
      senhaStep: false,
      disabled: false,
      erroLogin: false,
      unregisteredModal: false,
      isCpf: this.$store.state.config.validarCpf
    };
  },
  computed: {
    ...mapGetters({
      configInicial: "config"
    })
  },
  methods: {
    autenticar() {
      if (this.senhaStep) {
        let usuario = { login: this.login, senha: this.senha };
        this.loading = true;
        this.$store.dispatch("login", usuario).finally(() => {
          if (this.tipoLogin === "email") {
            this.$store.commit("SET_EMAIL", this.login);
          } else {
            this.isCpf === "true"
              ? this.$store.commit("SET_CPF", CPF.format(this.login))
              : this.$store.commit("SET_CPF", this.login);
          }
          this.loading = false;
        });
      } else {
        this.$v.login.$touch();
        const aplicarValidacao =
          this.isCpf === "true" ? CPF.validate(this.login) : true;
        if (
          (!this.$v.login.$error || aplicarValidacao) &&
          this.$v.login.required
        ) {
          this.loading = true;
          this.erroLogin = false;
          !this.$v.login.$error
            ? (this.tipoLogin = "email")
            : (this.tipoLogin = "cpf");
          this.searchPromise();
        } else {
          this.erroLogin = true;
        }
      }
    },
    searchPromise() {
      new Promise((resolve, reject) => {
        buscarUsuario(this.login, this.tipoLogin, resolve, reject);
      })
        .then(response => {
          this.registered(response.status);
        })
        .catch(error => {
          error && this.registered(error);
        })
        .then(() => {
          this.loading = false;
        });
    },
    registered(status) {
      if (status === 200) {
        this.senhaStep = true;
      } else if (status === 201) {
        this.senhaStep = true;
        iziWarning(i18n.t("erro.servidor"));
      } else if (status === 401) {
        if (this.tipoLogin === "email") {
          this.$store.commit("SET_EMAIL", this.login);
        } else {
          this.isCpf === "true"
            ? this.$store.commit("SET_CPF", CPF.format(this.login))
            : this.$store.commit("SET_CPF", this.login);
        }
        this.unregisteredModal = true;
      }
    },
    modalClose() {
      this.$store.dispatch("limparUsuario");
    },
    mediaLoading(res) {
      this.loading = res;
    }
  },
  watch: {
    senhaStep() {
      this.senhaStep ? (this.disabled = true) : (this.disabled = false);
    },
    senha() {
      this.senha.length >= 0 ? (this.disabled = false) : (this.disabled = true);
    }
  }
};
</script>

<style lang="stylus">

.login-container
  min-height 100%
  padding 20px

.menuServidor
  position absolute
  right 10px
  top 16px

.errorColorFix.bg-negative.text-white
  color black !important
  background white !important
  .q-if-label-inner.ellipsis
    color $negative !important

.esqueciSenha
  color $cinza2
  background-color transparent
  text-decoration none
  &&:hover
    cursor pointer
    text-decoration underline
.buttonCookie
  background #0771bc !important
  color #fff !important
</style>
