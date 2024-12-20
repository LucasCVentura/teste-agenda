<template>
  <div class="full-width">
    <div class="assist-left-container row">
      <div class="col-xs-12 col-sm-4 col-md-3 offset-md-1 offset-sm-0">
        <img class="assist-left" :src="caminhoAssistente" alt="Assistente" align="middle">
      </div>
      <div class="col-xs-12 col-sm-8 text-left assistente-sidetext">
        <div class="q-headline text-azul1 q-mb-sm full-width" v-html="$t('cadastro.criarSenha')" />
        <div class="q-title text-explicativo full-width q-mb-xs" v-html="$t('cadastro.senhaRequisitos')" />
        <div :class="validateColor(1)" class="q-title full-width">
          <q-icon class="q-mb-xs" v-if="senha.length === 0" color="explicativo" name="fas fa-minus" />
          <q-icon class="q-mb-xs" v-else-if="!$v.senha.letrasNumeros" color="negative" name="fas fa-times" />
          <q-icon class="q-mb-xs" v-else color="secondary" name="fas fa-check" />
          <span v-html="` ${$t('cadastro.senharequisito1')}`" />
        </div>
        <div :class="validateColor(2)" class="q-title full-width">
          <q-icon class="q-mb-xs" v-if="senha.length === 0" color="explicativo" name="fas fa-minus" />
          <q-icon class="q-mb-xs" v-else-if="!$v.senha.minLength" color="negative" name="fas fa-times" />
          <q-icon class="q-mb-xs" v-else color="secondary" name="fas fa-check" />
          <span v-html="` ${$t('cadastro.senharequisito2')}`" />
        </div>
      </div>
    </div>
    <div class="row q-mt-lg">
      <q-field class="col-md-8 col-xs-10 offset-md-2 offset-xs-1" :error="senha ? $v.senha.$error : false" :error-label="$t('cadastro.senhaError')">
        <q-input v-model="senha" type="password" :float-label="$t('cadastro.senha')" @keyup="$v.senha.$touch" />
      </q-field>
      <q-field class="col-md-8 col-xs-10 offset-md-2 offset-xs-1 q-mt-sm" :error="confirmarSenha ? $v.confirmarSenha.$error : false" :error-label="$t('cadastro.confirmarSenhaError')">
        <q-input v-model="confirmarSenha" type="password" :float-label="$t('cadastro.confirmarSenha')" @keyup="$v.confirmarSenha.$touch" />
      </q-field>
    </div>
  </div>
</template>

<script>
import { required, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
  props: {
    caminhoAssistente: String
  },
  validations: {
    senha: {
      required,
      minLength: minLength(6),
      letrasNumeros: function (value) {
        let validation = value.match(/(?=.*[a-z])(?=.*\d)[a-z\d]+/i)
        if (validation !== null) {
          return true
        }
        return false
      }
    },
    confirmarSenha: { sameAsPassword: sameAs('senha') }
  },
  data () {
    return {
      senha: '',
      confirmarSenha: '',
      stepValidation: false
    }
  },
  computed: {
    formValidation () {
      return { validacaoSenha: !this.$v.senha.$error, confSenha: this.$v.confirmarSenha.sameAsPassword }
    }
  },
  activated () {
    this.$emit('routes', { prevPage: 'nasc', nextPage: '' })
    this.stepValidation ? this.$emit('button', false) : this.$emit('button', true)
  },
  watch: {
    formValidation (form) {
      if (form.validacaoSenha && form.confSenha) {
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
      this.$store.dispatch('cadastroStep4', this.senha)
    },
    validateColor (option) {
      let classe = 'text-'
      if (this.senha.length === 0) return classe + 'explicativo'
      switch (option) {
        case 1:
          if (!this.$v.senha.letrasNumeros) {
            classe += 'negative'
          } else {
            classe += 'secondary'
          }
          break
        case 2:
          if (!this.$v.senha.minLength) {
            classe += 'negative'
          } else {
            classe += 'secondary'
          }
          break
      }
      return classe
    }
  }
}
</script>

<style lang="stylus">

</style>
