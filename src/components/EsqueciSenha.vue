<template>
  <q-layout view="lHh Lpr lFf" class="window-height block">
    <q-page-container class="page-flexbox">
      <main class="flex-grow-1">
        <img
          class="q-mx-auto q-mb-lg assist-center"
          :src="caminhoAssistente"
          alt="Assistente"
        />
        <div
          class="q-display-1 q-my-md text-azul1"
          v-html="$t('recuperacao.esqueceuSenha')"
        />
        <div class="row">
          <div
            class="q-mt-md q-mb-none q-subheading text-explicativo col-md-8 col-xs-12 offset-md-2"
            v-html="$t('recuperacao.mensagem')"
          />
          <q-field
            class="q-my-lg col-md-8 col-xs-10 offset-md-2 offset-xs-1"
            :error="$v.emailOrCpf.$error"
          >
            <q-input
              v-model="emailOrCpf"
              :float-label="$t('recuperacao.emailOrCpf')"
              color="white"
              @blur="$v.emailOrCpf.$touch()"
              @keyup.enter="verificarUsuario"
              inverted
              inverted-light
            />
          </q-field>
          <q-field
            class="col-md-8 col-xs-10 offset-md-2 offset-xs-1"
            :error="$v.nascimento.$error || !validateData"
            :error-label="$t('cadastro.dataNascError')"
          >
            <q-input
              v-model="nascimento"
              v-mask="'##/##/####'"
              :placeholder="formatoData"
              :float-label="$t('recuperacao.dataNasc')"
              color="white"
              @blur="$v.nascimento.$touch()"
              @keyup="$v.nascimento.$touch"
              @keyup.enter="$refs.send.$el.click()"
              inverted
              inverted-light
            />
          </q-field>
        </div>
      </main>
      <footer class="q-mt-lg">
        <q-btn
          size="17px"
          class="text-azul1 bg-white no-shadow float-left"
          icon="fas fa-arrow-left"
          @click="$router.push('/login')"
          outline
          round
        />
        <q-btn
          :class="$q.screen.lt.md ? 'q-px-lg' : 'q-px-xl'"
          class="q-py-md bg-azul1 text-white float-right"
          :label="$t('recuperacao.enviar')"
          icon-right="fas fa-arrow-right"
          @click="verificarUsuario"
          :disabled="disabled"
          :loading="loading"
          ref="send"
        />
      </footer>
      <!-- INICIO DIALOG -->
      <div v-if="showConfirmDialog" class="modal">
        <div class="modal-content">
          <span class="close-btn" @click="fecharModal">&times;</span>
          <h2>
            Esqueceu sua senha?
          </h2>
          <p>Clique no botão Resgatar senha para receber via email.</p>
          <p>
            email:
            <span class="numero-telefone">{{ emailPac }}</span
            >. Caso não reconheça esse email entre em contato com a clínica.
          </p>

          <div
            style="display: flex; align-items: center; justify-content: center; gap: 15px;"
          >
            <q-btn
              style="width: 16rem;"
              class="q-py-md bg-red text-white"
              @click="cancelar"
              >Cancelar</q-btn
            >
            <q-btn
              style="width: 16rem;"
              class="q-py-md bg-azul1 text-white"
              @click="enviarSenha"
            >
              Resgatar Senha
            </q-btn>
          </div>
        </div>
      </div>
      <!-- FIM DIALOG -->
    </q-page-container>
  </q-layout>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { recuperarSenha, getEmailPac } from "@/services";
import { mask } from "vue-the-mask";
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, ""); // Remover todos os caracteres não numéricos
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  let resto;
  for (let i = 1; i <= 9; i++)
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++)
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

export default {
  directives: { mask },
  validations: {
    emailOrCpf: {
      required,
      emailOrCpfValidator(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) || validarCPF(value);
      }
    },
    nascimento: { required }
  },
  data() {
    return {
      emailOrCpf: "",
      nascimento: "",
      validateData: true,
      disabled: true,
      loading: false,
      responseDialog: false,
      formatoData: "dd/mm/aaaa",
      tipoRecuperacao: "email",
      emailPac: "",
      showConfirmDialog: false
    };
  },
  computed: {
    formValidation() {
      return {
        emailOrCpf: this.emailOrCpf,
        nascValid: this.validateData
      };
    },
    caminhoAssistente() {
      return this.$store.state.config.assistente;
    }
  },
  created() {
    this.formatoData = this.$store.state.config.formatoDataIngles
      ? "mm/dd/yyyy"
      : "dd/mm/aaaa";
  },
  watch: {
    formValidation(val) {
      if (
        !this.$v.emailOrCpf.$error &&
        !this.$v.nascimento.$error &&
        this.validateData
      ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    nascimento() {
      this.validateData = this.$store.state.config.formatoDataIngles
        ? this.nascimento.match(
            /(1[0-2]|0[1-9])\/(0[1-9]|[1-2][0-9]|3[0-1])\/\d\d\d\d/i
          )
        : this.nascimento.match(
            /(0[1-9]|[1-2][0-9]|3[0-1])\/(1[0-2]|0[1-9])\/\d\d\d\d/i
          );
    }
  },
  methods: {
    verificarUsuario() {
      new Promise((resolve, reject) => {
        this.loading = true;
        getEmailPac(this.emailOrCpf, this.nascimento, resolve, reject);
      })
        .then(response => {
          console.log(response);
          this.emailPac = this.mascararEmail(response);
          console.log(this.emailPac);
          this.showConfirmDialog = true;
        })
        .catch(err => {
          this.errorMessage = "Usuário não encontrado ou dados incorretos";
        })
        .finally(() => {
          this.loading = false;
        });
    },
    enviarSenha() {
      new Promise((resolve, reject) => {
        this.loading = true;
        recuperarSenha(this.emailOrCpf, this.tipoRecuperacao, resolve, reject);
      })
        .then(response => {
          this.responseDialog = true;
        })
        .catch(err => {
          // Opcional: manipular o erro aqui, se necessário
        })
        .finally(() => {
          this.loading = false;
          this.showConfirmDialog = false;
          this.$router.push("/login");
        });
    },
    fecharModal() {
      this.showConfirmDialog = false; // Fecha o modal
    },
    cancelar() {
      this.fecharModal();
      this.$router.push("/login"); // Navega para a página de login
    },
    mascararEmail(email) {
      // Certifica-se de que o valor é uma string
      const emailStr = String(email);

      // Verifica se o e-mail é válido e contém um "@" com algo depois
      const [localPart, domain] = emailStr.split("@");
      if (!localPart || !domain) {
        return emailStr; // Retorna o e-mail sem alterações se for inválido
      }

      // Definimos para exibir os primeiros 3 caracteres da parte local
      const visiblePart = localPart.slice(0, 3); // Primeiros 3 caracteres
      const maskedLocalPart = visiblePart + "******"; // Máscara para o restante
      return `${maskedLocalPart}@${domain}`;
    }
  }
};
</script>

<style lang="stylus">
.modal
  display block
  position fixed
  left 0
  top 0
  width 100%
  height 100%
  background-color rgba(0, 0, 0, 0.6) // Fundo preto com mais opacidade
  z-index 1000
  display flex
  justify-content center
  align-items center

.modal-content
  background-color white
  padding 30px
  border-radius 12px
  width 400px
  text-align center
  z-index 1001
  box-shadow 0px 4px 12px rgba(0, 0, 0, 0.2) // Sombra mais suave
  position relative

h2
  font-size 1.5rem
  margin-bottom 15px
  color #333
  font-weight 600

p
  font-size 1.2rem
  color #666
  margin-bottom 20px


button:last-child:hover
  background-color #007bb5

.numero-telefone
  color #4CAF50  // Cor verde para o número
  font-weight bold  // Destacar com negrito

.close-btn
  position absolute
  top 10px
  right 10px
  color #aaa
  font-size 24px
  font-weight bold
  cursor pointer

.close-btn:hover,
.close-btn:focus
  color black
</style>
