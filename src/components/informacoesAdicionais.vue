<template>
  <q-modal content-classes="bg-fundo" :value="modalOpened" @show="carregarInformacoes" no-esc-dismiss maximized>
    <q-modal-layout class="agenda-modal">
      <div class="page-flexbox">
        <medi-menu :config="'agendamento'" />
        <main class="flex-grow-1 q-mb-sm" @keyup.enter="enterEvent($event)">
          <div class="assist-left-container row">
            <div class="col-xs-12 col-sm-4 col-md-3 offset-md-1 offset-sm-0">
              <img class="assist-left" :src="caminhoAssistente" alt="Assistente" align="middle">
            </div>
            <div v-if="nomeUsuario" class="col-xs-12 col-sm-8 text-left q-headline text-azul1 assistente-sidetext">
              <span v-html="`${$t('infoAdicional.tratamento')}<br>`" />
              <span class="capitalize" v-html="`${nomeUsuario},<br>`" />
              <span v-html="$t('infoAdicional.confirmarInfo')" />
            </div>
          </div>
          <div class="row">
            <q-list separator class="col-xs-12 col-sm-10 offset-sm-1 q-mt-md onlyBottomBorder">
              <q-item v-if="informacoesComplementares" class="cursor-pointer" tag="label">
                <q-item-main class="q-mr-md text-cinza1" :label="$t('infoAdicional.limitacoes')" />
                <q-item-side right>
                  <q-toggle v-model="deficiencia" checked-icon="check" unchecked-icon="fas fa-times" />
                </q-item-side>
              </q-item>
              <q-item v-if="informacoesComplementares" class="q-mt-md cursor-pointer" tag="label">
                <q-item-main class="q-mr-md q-my-md text-cinza1" :label="$t('infoAdicional.medicamento')" />
                <q-item-side right>
                  <q-toggle v-model="usaMedicamento" @input="tratarMedicamento" checked-icon="check" unchecked-icon="fas fa-times" />
                </q-item-side>
              </q-item>
              <q-field v-if="usaMedicamento" class="q-mx-md" :label="$t('infoAdicional.qualMedicamento')" label-width="12">
                <q-input v-model="medicamentos" type="textarea" color="white" :max-height="100" rows="4" inverted inverted-light />
              </q-field>
              <q-item class="q-mt-sm cursor-pointer" tag="label">
                <q-item-main class="q-mr-md q-my-md text-cinza1" :label="$t('infoAdicional.possuiConvenio')" />
                <q-item-side right>
                  <q-toggle v-model="temConvenio" @input="tratarConvenio" checked-icon="check" unchecked-icon="fas fa-times" />
                </q-item-side>
              </q-item>
              <div v-if="temConvenio" class="q-mx-md">
                <q-select v-model="selectedConvenio" @input="buscarPlanosAndValidMatObriga" @click.native="buscarConvenios" ref="selectConvenio" class="qSelect-fix q-mb-md" :float-label="$t('infoAdicional.convenio')" :options="convenios" popup-max-height="250px" filter />
                <q-select v-if="selectedConvenio" v-model="selectedPlano" class="qSelect-fix q-mb-md" :float-label="$t('infoAdicional.planos')" :options="planos" filter />
                <q-input v-if="selectedConvenio && selectedPlano" v-model="matriculaConvenio" class="q-mb-md" :float-label="$t('infoAdicional.carteirinha')" maxlength="30" />
              </div>
            </q-list>
            <span class="col-xs-12 col-sm-10 offset-sm-1 text-left q-mt-lg q-pl-md text-cinza1" v-html="$t('infoAdicional.alturaPeso')" />
            <q-input class="col-xs-4 col-sm-3 offset-sm-2 offset-xs-1 q-px-md q-py-sm q-mt-md" placeholder="1,80" v-model="altura" v-mask="'#,##'" color="white" suffix="m" inverted inverted-light />
            <q-input class="col-xs-4 col-sm-3 offset-sm-2 offset-xs-2 q-px-md q-py-sm q-mt-md" placeholder="100" v-model="peso" v-mask="'###'" color="white" suffix="kg" inverted inverted-light />
          </div>
        </main>
        <footer class="q-mt-lg">
          <q-btn size="17px" class="text-azul1 bg-white no-shadow float-left" icon="fas fa-arrow-left" @click="$router.push('/dashboard')" outline round />
          <q-btn :class="$q.screen.lt.md ? 'q-px-lg' : 'q-px-xl'" class="q-py-md bg-azul1 text-white float-right" :label="$t('infoAdicional.continuar')" icon-right="fas fa-arrow-right" @click="adicionarInformacoes" ref="update" :loading="btnLoading" :disabled="disabled" />
        </footer>
      </div>
      <!-- <q-inner-loading size="55px" color="azul1" :visible="pageLoading" /> -->
    </q-modal-layout>
  </q-modal>
</template>

<script>
import { mask } from 'vue-the-mask'
import { buscarInfoPaciente, buscarConvenios, buscarPlanosDoConvenio, atualizarPaciente, matObrigaConv } from '@/services'
import menuOpcoes from '@/components/menuOpcoes'

export default {
  directives: { mask },
  components: {
    'medi-menu': menuOpcoes
  },
  data () {
    return {
      nomeUsuario: '',
      informacoesComplementares: false,
      cadastroSemNumCarteirinha: null,
      matObriga: false,
      deficiencia: false,
      usaMedicamento: false,
      medicamentos: null,
      temConvenio: false,
      altura: '',
      peso: '',
      selectedConvenio: null,
      selectedPlano: 0,
      matriculaConvenio: '',
      // pageLoading: false,
      convenios: [],
      planos: [],
      btnLoading: false,
      disabled: true
    }
  },
  computed: {
    modalOpened () {
      return this.$store.state.agendamento.infoModalAberto
    },
    formValidation () {
      return { altura: this.altura, peso: this.peso, usaMedicamento: this.usaMedicamento, desc_medicamentos: this.medicamentos, temConvenio: this.temConvenio, convenio: this.selectedConvenio, plano: this.selectedPlano, matricula: this.matriculaConvenio, cadastroSemNumCarteirinha: this.cadastroSemNumCarteirinha, matObriga: this.matObriga }
    },
    caminhoAssistente () {
      return this.$store.state.config.assistente
    }
  },
  created () {
    this.informacoesComplementares = this.$store.state.config.informacoesComplementares
    this.cadastroSemNumCarteirinha = this.$store.state.config.cadastroSemNumCarteirinha
  },
  mounted () {
    // Fix do scroll do modal
    let modalContent = document.getElementsByClassName('q-modal-layout-content')
    modalContent[modalContent.length - 1].classList.remove('scroll')
  },
  methods: {
    enterEvent (event) {
      if (!event.target.classList.contains('q-select')) {
        this.$refs.update.$el.click()
      }
    },
    tratarConvenio (temConvenio) {
      if (!temConvenio) {
        this.selectedConvenio = null
        this.selectedPlano = 0
        this.matriculaConvenio = ''
        this.disabled = false
      }
    },
    buscarConvenios () {
      this.disabled = true
      this.$refs.selectConvenio.hide()
      this.$q.loading.show({ spinnerColor: 'primary', customClass: 'page-loading' })
      new Promise((resolve, reject) => {
        buscarConvenios(resolve, reject)
      }).then(data => {
        this.convenios = data.map(item => {
          let convenio = { 'value': item.ID_CONV, 'label': item.NM_CONV }
          return convenio
        })
        this.$refs.selectConvenio.show()
      }).finally(() => {
        this.$q.loading.hide()
      })
    },
    tratarMedicamento (usaMedicamento) {
      if (usaMedicamento) {
        this.disabled = true
      } else {
        this.medicamentos = null
        this.disabled = false
      }
    },
    buscarPlanosAndValidMatObriga (idConv) {
      this.$q.loading.show({ spinnerColor: 'primary', customClass: 'page-loading' })
      new Promise((resolve, reject) => {
        buscarPlanosDoConvenio(idConv, resolve, reject)
      }).then(data => {
        this.planos = data.map(item => {
          let plano = { 'value': item.ID, 'label': item.DESCRICAO }
          return plano
        })
      }).finally(() => {
        this.selectedPlano = null
        this.matriculaConvenio = ''
        this.$q.loading.hide()
      })
      new Promise((resolve, reject) => {
        matObrigaConv(idConv, resolve, reject)
      }).then(data => {
        this.matObriga = data
        // this.cadastroSemNumCarteirinha = !data
      }).finally(() => {
        this.$q.loading.hide()
      })
    },
    carregarInformacoes () {
      this.$q.loading.show({ spinnerColor: 'primary', customClass: 'page-loading' })
      new Promise((resolve, reject) => {
        buscarInfoPaciente(resolve, reject)
      }).then(data => {

        // console.log(data);
        if (data.map) {
          data = data.map;
        }

        if (data.ID) {
          this.$store.dispatch('updateIdPac', data.ID);
        }
        
        this.nomeUsuario = ((data.NOME).split(' ')[0]).toLowerCase()

        // Carrega os dados do paciente caso já existam
        if (data.MOBILIDADE === 'T') {
          this.deficiencia = true
        }
        if (data.MEDICAMENTO === 'T') {
          this.usaMedicamento = true
          this.medicamentos = data.DESC_MEDICAMENTO
        }
        if (data.PARTICULAR === 'F') {
          this.temConvenio = true
          this.convenios = [{ 'value': data.ID_CONVENIO, 'label': data.CONVENIO }]
          this.selectedConvenio = data.ID_CONVENIO
          this.planos = [{ 'value': data.ID_PLANO, 'label': data.PLANO }]
          this.selectedPlano = data.ID_PLANO
          this.matriculaConvenio = data.MATRICULA
        }
        if (data.ALTURA) {
          this.altura = data.ALTURA.toString().replace('.', ',')
        }
        if (data.PESO) {
          this.peso = data.PESO
        }
        if (data.matObriga) {
          this.matObriga = data.matObriga
        }
      }).finally(() => {
        this.$q.loading.hide()
      })
    },
    adicionarInformacoes () {
      // Estruturação das informações
      let informacoes = this.formValidation
      informacoes.deficiencia = this.deficiencia
      informacoes.origemReq = ''
      delete informacoes['temConvenio']

      this.btnLoading = true
      new Promise((resolve, reject) => {
        atualizarPaciente(informacoes, resolve, reject)
      }).then(() => {
        this.$store.commit('SET_ID_CONVENIO', this.selectedConvenio)
        this.$store.dispatch('controleInfoModal', false)
        this.$emit('modalClosed', true)
      }).finally(() => {
        this.btnLoading = false
      })
    }
  },
  watch: {
    formValidation (val) {
      // Validação dos campos do formulário
      if (val.altura && val.peso) {
        if (!val.usaMedicamento) {
          this.disabled = false
        } else {
          if (val.desc_medicamentos.trim()) {
            this.disabled = false
          } else {
            this.disabled = true
            return
          }
        }
        if (!val.temConvenio) {
          this.disabled = false
        } else {
          if (val.convenio && val.plano) {
            if (!val.matricula.trim()) {
              if (val.matObriga == null && !val.cadastroSemNumCarteirinha) {
                this.disabled = true
              } else if (val.matObriga !== null && val.matObriga && !val.cadastroSemNumCarteirinha) {
                this.disabled = true
              } else {
                this.disabled = false
              }
            } else {
              this.disabled = false
            }
          } else {
            this.disabled = true
          }
        }
      } else {
        this.disabled = true
      }
    }
  }
}
</script>

<style lang="stylus">

.onlyBottomBorder
  border-left none
  border-right none
  border-top none

</style>
