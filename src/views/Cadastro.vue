<template>
  <q-layout view="lHh Lpr lFf" class="window-height block">
    <q-page-container class="page-flexbox">
      <medi-menu :config="'cadastro'" />
      <main class="flex-grow-1" @keyup.enter="$refs.step.$el.click()">
        <keep-alive>
          <component :is="$route.params.step" :caminhoAssistente="caminhoAssistente" :usuario="usuario" @routes="routesControl" @button="buttonControl" ref="form" />
        </keep-alive>
      </main>
      <footer class="flex justify-between">
        <q-btn @click="prevStep" size="17px" class="text-azul1 bg-white no-shadow" icon="fas fa-arrow-left" outline round />
        <q-btn :class="$q.screen.lt.md ? 'q-px-lg' : 'q-px-xl'" class="q-py-md bg-azul1 text-white" :label="$t('cadastro.proximo')" icon-right="fas fa-arrow-right" @click="updateForm(); nextStep()" :disabled="disabled" :loading="loading" ref="step" />
      </footer>
    </q-page-container>
  </q-layout>
</template>

<script>
import nome from '@/components/cadastro/nome'
import cpf from '@/components/cadastro/cpf'
import nasc from '@/components/cadastro/nasc'
import senha from '@/components/cadastro/senha'
import menuOpcoes from '@/components/menuOpcoes'
import { cadastrarUsuario, buscarUsuario } from '@/services'
import { mapGetters } from 'vuex'

export default {
  components: {
    'nome': nome,
    'cpf': cpf,
    'nasc': nasc,
    'senha': senha,
    'medi-menu': menuOpcoes
  },
  beforeRouteLeave (to, from, next) {
    if (to.name !== 'confirmacao') {
      this.$store.dispatch('limparUsuario')
    }
    next()
  },
  beforeRouteUpdate (to, from, next) {
    // Controle para não pular etapas do cadastro
    if (!this.stepControl) {
      this.stepControl = true
      next('nome')
    } else {
      this.stepControl = false
      next()
    }
  },
  data () {
    return {
      nextPage: '',
      prevPage: '',
      disabled: true,
      loading: false,
      stepControl: false
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
  methods: {
    prevStep () {
      if (this.$route.params.step === 'nome') {
        this.$router.push('/login')
      }

      this.stepControl = true
      this.$router.replace(this.prevPage)
    },
    nextStep () {
      if (this.$route.params.step === 'nome') {
        this.loading = true
        this.searchPromise(this.usuario.email, 'email')
      } else if (this.$route.params.step === 'cpf') {
        this.loading = true
        this.searchPromise(this.usuario.cpf, 'cpf')
      } else if (this.$route.params.step === 'senha') {
        this.loading = true
        new Promise((resolve, reject) => {
          cadastrarUsuario(this.usuario, resolve, reject)
        }).then(() => {
          this.stepControl = true
          this.$store.dispatch('confirmarCodigo', true)
            .then(() => {
              this.$router.push('/confirmacao/codigo')
            })
        }).finally(() => {
          this.loading = false
        })
      } else {
        this.stepControl = true
        this.$router.replace(this.nextPage)
      }
    },
    searchPromise (val, param) {
      new Promise((resolve, reject) => {
        buscarUsuario(val, param, resolve, reject)
      }).then(response => {
        param === 'email' ? this.$refs.form.emailFound() : this.$refs.form.cpfFound(response.data)
      }).catch(error => {
        if (error) {
          this.stepControl = true
          this.$router.replace(this.nextPage)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    routesControl (response) {
      // Controle da próxima página e da anterior
      this.prevPage = response.prevPage
      this.nextPage = response.nextPage
      this.disabled = true
    },
    buttonControl (response) {
      // Habilita o botão caso não haja nenhum erro nos campos
      this.disabled = response
    },
    updateForm () {
      this.$refs.form.setForm()
    }
  }
}
</script>

<style lang="stylus">
</style>
