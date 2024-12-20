<template>
  <div class="full-width">
    <img class="q-mx-auto q-mb-xl assist-center" :src="caminhoAssistente" alt="Assistente">
    <div class="row">
      <q-field class="col-md-8 col-xs-10 offset-md-2 offset-xs-1" :error="$v.nome.$error || validateName"
               :error-label="$t('cadastro.nomeCompletoError')">
        <q-input v-model="nome" @blur="$v.nome.$touch" @keyup="$v.nome.$touch"
                 :float-label="$t('cadastro.nomeCompleto')"/>
      </q-field>
      <q-field class="col-md-8 col-xs-10 offset-md-2 offset-xs-1 q-mt-md q-mb-xl" :error="$v.email.$error"
               :error-label="$t('cadastro.emailError')">
        <q-input v-model="email" @blur="$v.email.$touch" @keyup="$v.email.$touch" :float-label="$t('cadastro.email')"
                 :disable="disable" lower-case/>
      </q-field>
    </div>
    <div class="check_email">
      <input v-model="checkemail" type="checkbox" id="checkbox">
      <label for="checkbox" v-html="$t('cadastro.emailFrase')"></label>
    </div>
    <!-- INICIO DIALOG -->
    <q-dialog v-model="dialogEmail" @ok="$router.push('/login')">
      <span slot="title" v-html="$t('cadastro.dialogEmailTitulo')"/>
      <span slot="message" v-html="$t('cadastro.dialogEmailMensagem')"/>
      <template slot="buttons" slot-scope="props">
        <q-btn flat label="Entrar" @click="props.ok"/>
        <q-btn flat label="Cancelar" @click="props.cancel"/>
      </template>
    </q-dialog>
    <!-- FIM DIALOG -->
  </div>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators'

export default {
  props: {
    usuario: Object,
    caminhoAssistente: String
  },
  validations: {
    email: { email, required },
    nome: { required }
  },
  data () {
    return {
      nome: '',
      email: '',
      validateName: false,
      stepValidation: false,
      dialogEmail: false,
      disable: false,
      checkemail: true
    }
  },
  computed: {
    formValidation () {
      return { nomeRequired: this.$v.nome.$error, nomeValid: this.validateName, emailValid: this.$v.email.$error }
    }
  },
  mounted () {
    this.nome = this.usuario.nome ? this.usuario.nome : ''
    this.email = this.usuario.email ? this.usuario.email : ''
    // Valida a etapa caso o usuário tenha entrado com alguma mídia social
    if (this.usuario.nome && this.usuario.email) {
      this.disable = true
      this.$emit('button', false)
      this.stepValidation = true
    }
  },
  activated (val) {
    this.$emit('routes', { prevPage: '', nextPage: 'cpf' })
    this.stepValidation ? this.$emit('button', false) : this.$emit('button', true)
  },
  watch: {
    nome () {
      this.validateName = !this.nome.match(/([a-z]+[\w]* [a-z]+[\w]*)/i)
    },
    formValidation (val) {
      if (this.nome && !val.nomeRequired && !val.nomeValid && this.email && !val.emailValid) {
        this.$emit('button', false)
        this.stepValidation = true
      } else {
        this.$emit('button', true)
        this.stepValidation = false
      }
    }
  },
  methods: {
    setForm () {
      this.$store.dispatch('cadastroStep1', [this.nome, this.email, this.checkemail])
    },
    emailFound () {
      this.dialogEmail = true
    }
  }

}
</script>

<style lang="stylus">
.check_email{

}
</style>
