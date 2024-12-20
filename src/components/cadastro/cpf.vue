<template>
  <div class="full-width">
    <div class="q-mb-md assist-left-container row">
      <div class="col-xs-12 col-sm-4 col-md-3 offset-md-1 offset-sm-0">
        <img class="assist-left" :src="caminhoAssistente" alt="Assistente" align="middle">
      </div>
      <div class="col-xs-12 col-sm-8 text-left q-headline text-azul1 assistente-sidetext">
        <span v-html="$t('cadastro.bemVindo')" />
        <span class="capitalize"> {{(this.usuario.nome).split(" ")[0]}}</span>
      </div>
    </div>
    <div class="row">
      <q-field class="col-md-8 col-xs-10 offset-md-2 offset-xs-1" :error="$v.cpf.$error || erroCPF" :error-label="$t('cadastro.cpfError')">
        <q-input v-if="docMask === 'false'" v-model="cpf" @blur="$v.cpf.$touch" :float-label="$t('cadastro.cpf')" />
        <q-input v-else v-model="cpf" v-mask="docMask" @blur="$v.cpf.$touch" :float-label="$t('cadastro.cpf')" />
      </q-field>
      <q-field v-if="isMultiDocumento === 'true'" class="col-md-8 col-xs-10 offset-md-2 offset-xs-1 q-mt-sm q-mb-md" :error="$v.rg.$error" :error-label="$t('cadastro.rgError')">
        <q-input v-model="rg" @keyup="$v.rg.$touch" @blur="$v.rg.$touch" :float-label="$t('cadastro.rg')" />
      </q-field>
      <q-field :label="$t('cadastro.sexo')" class="col-md-8 col-xs-10 offset-md-2 offset-xs-1 q-mb-xl text-right sexo">
        <q-btn-toggle v-model="sexo" color="grey" :toggle-color="sexoColor" :options="[{label: $t('cadastro.sexoF'), value: 'F'},{label: $t('cadastro.sexoM'), value: 'M'}]" no-caps />
      </q-field>
    </div>
    <!-- INICIO MODAL -->
    <q-modal v-model="modalCpf" content-classes="bg-fundo">
      <q-modal-layout class="layout-agenda">
        <div class="page-flexbox" :style="$q.screen.gt.sm ? 'min-height: 45vh' : ''">
          <header>
            <q-btn class="text-explicativo no-shadow float-right" icon="fas fa-times" v-close-overlay />
          </header>
          <main class="flex-grow-1">
            <div class="row">
              <div class="q-display-1 q-mb-sm q-mt-none text-azul1 col-10 offset-1" v-html="$t('cadastro.modalCpfTitulo')" />
              <div class="q-title q-mt-sm q-mb-md text-azul1 col-xs-12 col-md-8 offset-md-2" v-html="`${$t('cadastro.modalCpfMensagem1')} ${emailRetorno}`" />
              <div class="q-title q-mt-lg q-mb-md text-cinza1 col-xs-12 col-md-8 offset-md-2" v-html="$t('cadastro.modalCpfMensagem2')" />
              <div class="q-title q-mt-sm q-mb-md text-cinza1 col-xs-12 col-md-8 offset-md-2" v-html="$t('cadastro.modalCpfMensagem3')" />
            </div>
          </main>
          <footer class="row">
            <q-btn class="col-xs-4 offset-xs-1 q-mt-xl q-py-md bg-white text-azul1" icon="fas fa-arrow-left" :label="$t('cadastro.entrar')" to="/login" />
            <q-btn class="col-xs-4 offset-xs-2 q-mt-xl q-py-md bg-azul1 text-white" :label="$t('cadastro.alterar')" @click="atualizar" :loading="loading" />
          </footer>
        </div>
      </q-modal-layout>
    </q-modal>
    <!-- FIM MODAL -->
  </div>
</template>

<script>
import { mask } from 'vue-the-mask'
import { required } from 'vuelidate/lib/validators'
import { atualizarEmail } from '@/services'
import CPF from 'gerador-validador-cpf'

export default {
  directives: { mask },
  validations () {
    if (this.isMultiDocumento === 'false') {
      return {
        cpf: { required },
        sexo: { required }
      }
    } else {
      return {
        cpf: { required },
        rg: { required },
        sexo: { required }
      }
    }
  },
  props: {
    usuario: Object,
    caminhoAssistente: String
  },
  data () {
    return {
      rg: '',
      cpf: '',
      sexo: null,
      erroCPF: false,
      sexoColor: '',
      stepValidation: false,
      modalCpf: false,
      emailRetorno: '',
      emailAntigo: '',
      loading: false,
      docMask: this.$store.state.config.docMask,
      validarCpf: this.$store.state.config.validarCpf,
      isMultiDocumento: this.$store.state.config.multiDocumento
    }
  },
  computed: {
    formValidation () {
      let errorRG = this.$v.rg === undefined ? false : this.$v.rg.$error
      return { cpfRequired: this.$v.cpf.$error, cpfValid: this.erroCPF, rgRequired: errorRG, sexoRequired: this.sexo }
    }
  },
  mounted () {
    this.sexo = this.usuario.sexo ? this.usuario.sexo : ''
    this.cpf = this.usuario.cpf ? this.usuario.cpf : ''
  },
  activated () {
    this.$emit('routes', { prevPage: 'nome', nextPage: 'nasc' })
    this.stepValidation ? this.$emit('button', false) : this.$emit('button', true)
  },
  watch: {
    cpf () {
      if (this.validarCpf === 'TRUE') {
        CPF.validate(this.cpf) ? this.erroCPF = false : this.erroCPF = true
      }
    },
    sexo () {
      this.sexo === 'M' ? this.sexoColor = 'azul1' : this.sexoColor = 'purpura'
    },
    formValidation (val) {
      let validarRg = this.isMultiDocumento === 'false' ? true : this.rg
      if (this.cpf && !val.cpfRequired && !val.cpfValid && validarRg && !val.rgRequired && val.sexoRequired) {
        this.$emit('button', false)
        this.stepValidation = true
      } else {
        this.$emit('button', true)
        this.stepValidation = false
      }
    }
  },
  methods: {
    atualizar () {
      this.loading = true
      new Promise((resolve, reject) => {
        atualizarEmail(this.emailAntigo, this.usuario.email, this.cpf.replace(/\D/g, ''), resolve, reject)
      }).finally(() => {
        this.loading = false
        this.$router.push('/login')
      })
    },
    setForm () {
      this.$store.dispatch('cadastroStep2', [this.cpf, this.rg, this.sexo])
    },
    cpfFound (email) {
      let hiddenEmail
      let beforeAt = email.split('@')[0]
      let afterAt = email.split('@')[1]
      if (beforeAt.length > 2) {
        hiddenEmail = beforeAt.replace(/\B(.)(?!$)/g, '*') + '@' + afterAt
      } else {
        hiddenEmail = beforeAt.replace(/./g, '*') + '@' + afterAt
      }
      this.emailRetorno = hiddenEmail
      this.emailAntigo = email
      this.modalCpf = true
    }
  }
}
</script>

<style lang="stylus">

@media (max-width: 576px)
  .sexo
    text-align center
    .q-field-content
      margin-top 6px
    .q-field-label-inner
      justify-content space-around

</style>
