<template>
  <div class="full-width">
    <img
      class="q-mx-auto q-mb-xl assist-center"
      :src="caminhoAssistente"
      alt="Assistente"
    />
    <div class="row">
      <q-field
        class="col-md-8 col-xs-10 offset-md-2 offset-xs-1"
        :error="$v.dataNasc.$error || errorData"
        :error-label="$t('cadastro.dataNascError')"
      >
        <q-input
          v-model="dataNasc"
          v-mask="'##/##/####'"
          :placeholder="formatoData"
          :after="[{ icon: 'date_range' }]"
          @blur="$v.dataNasc.$touch"
          @keyup="$v.dataNasc.$touch"
          :float-label="$t('cadastro.dataNasc')"
          class="col-md-8 col-xs-10 offset-md-2 offset-xs-1"
        />
      </q-field>
      <q-field
        class="col-md-8 col-xs-10 offset-md-2 offset-xs-1 q-mt-md q-mb-xl"
        :error="$v.telefone.$error"
        :error-label="$t('cadastro.telefoneError')"
      >
        <q-input
          v-model="telefone"
          v-mask="telMask"
          placeholder=""
          :after="[{ icon: 'phone' }]"
          @blur="$v.telefone.$touch"
          @keyup="$v.telefone.$touch"
          :float-label="$t('cadastro.telefone')"
        />
      </q-field>
    </div>
    <div class="check_sms">
      <input v-model="checksms" type="checkbox" id="checkbox" />
      <label for="checkbox" v-html="$t('cadastro.smsFrase')"></label>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mask } from "vue-the-mask";
import { i18n } from "@/plugins/vue-i18n";

export default {
  directives: { mask },
  validations: {
    dataNasc: { required },
    telefone: { required }
  },
  props: {
    usuario: Object,
    caminhoAssistente: String
  },
  data() {
    return {
      dataNasc: "",
      telefone: "",
      errorData: false,
      stepValidation: false,
      formatoData: "dd/mm/aaaa",
      telMask: this.$store.state.config.telMask,
      checksms: true
    };
  },
  computed: {
    formValidation() {
      return {
        dataNascRequired: this.$v.dataNasc.$error,
        dataNascValid: this.errorData,
        telRequired: this.$v.telefone.$error
      };
    },
  },
  created() {
    this.formatoData = this.$store.state.config.formatoDataIngles
      ? "mm/dd/yyyy"
      : "dd/mm/aaaa";
  },
  mounted() {
    this.dataNasc = this.usuario.dataNasc ? this.usuario.dataNasc : "";
  },
  activated() {
    this.$emit("routes", { prevPage: "cpf", nextPage: "senha" });
    this.stepValidation
      ? this.$emit("button", false)
      : this.$emit("button", true);
  },
  watch: {
    dataNasc() {
      let data = this.dataNasc.split("/");

      let validDateFormat = this.$store.state.config.formatoDataIngles
        ? this.dataNasc.match(
            /(1[0-2]|0[1-9])\/(0[1-9]|[1-2][0-9]|3[0-1])\/\d\d\d\d/i
          )
        : this.dataNasc.match(
            /(0[1-9]|[1-2][0-9]|3[0-1])\/(1[0-2]|0[1-9])\/\d\d\d\d/i
          );
      if (
        !validDateFormat ||
        new Date(`${data[1]}/${data[0]}/${data[2]}`) > Date.now()
      ) {
        this.errorData = true;
      } else {
        this.errorData = false;
      }
    },
    formValidation(val) {
      if (
        this.dataNasc &&
        !val.dataNascRequired &&
        !val.dataNascValid &&
        !val.telRequired &&
        this.telefone.length >= 10
      ) {
        this.$emit("button", false);
        this.stepValidation = true;
      } else {
        this.$emit("button", true);
        this.stepValidation = false;
      }
    },
  },
  methods: {
    setForm() {
      this.$store.dispatch("cadastroStep3", [
        this.dataNasc,
        this.telefone,
        this.checksms
      ]);
    }
  }
};
</script>

<style lang="stylus"></style>
