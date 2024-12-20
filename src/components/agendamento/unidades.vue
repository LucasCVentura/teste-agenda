<template>
  <div class="full-width">
    <div class="row">
      <div class="col-12 q-headline q-mb-sm text-azul1" v-text="$t('agendamento.escolhaLocal')" />
      <div class="col-12 q-subheading q-mb-xs text-explicativo" v-text="$t('agendamento.selecaoUnidades')" />
      <div class="col-xs-12 col-sm-10 offset-sm-1 q-mb-xs q-pr-md text-cinza1 text-right" v-text="agendamento.qtdExamesMarcados + '/' + agendamento.examesSelecionados.length" />
      <q-progress class="col-xs-12 col-sm-10 offset-sm-1" :percentage="progresso" />
      <section class="col-xs-12 col-sm-10 offset-sm-1">
        <q-tabs align="justify" v-model="selectedTab" class="q-mt-lg tabsUnidades" animated>
          <q-tab slot="title" name="porUnidade" @select="listarUnidades(filtrarUnidadeExame)" :class="background1" class="text-weight-medium lowercase capitalize q-subheading" :label="$q.screen.gt.xs ? $t('agendamento.examesUnidade') : ''" :color="color1" default>
            <q-icon :class="$q.screen.gt.xs ? 'tab-left-icon' : ''" name="business" size="1.5rem" />
          </q-tab>
          <q-tab slot="title" name="porLocalidade" @select="getGeolocation" :class="background2" class="text-weight-medium lowercase capitalize q-subheading" :label="$q.screen.gt.xs ? $t('agendamento.examesLocalizacao') : ''" :color="color2">
            <q-icon :class="$q.screen.gt.xs ? 'tab-left-icon' : ''" name="location_on" size="1.5rem" />
          </q-tab>

          <q-tab-pane class="q-px-none q-pb-none" name="porUnidade">
            <q-search v-model="filtrarUnidadeExame" @input="listarUnidades" class="q-mt-sm" :placeholder="$t('agendamento.encontreUnidade')" maxlength="40" :disable="disabled" clearable upper-case />
            <main :style="loading ? 'height: 170px' : ''" class="relative-position">
              <section v-if="!loading">
                <!-- UNIDADES SELECIONADAS -->
                <div v-if="agendamento.unidadesSelecionadas.length > 0" class="q-mt-lg q-mb-md q-title text-cinza1" v-text="$t('agendamento.examesUnidadesSelecionadas')" />
                <section v-for="(data,i) in agendamento.unidadesSelecionadas" :key="i" class="row q-mt-md bg-azul1 border-azul1 shadow-4 round-borders">
                  <label class="col-xs-0 col-sm-1 text-explicativo relative-position">
                    <q-checkbox v-if="$q.screen.gt.xs" v-model="checked" color="white" class="absolute-center" :val="data.CNPJ" disable />
                  </label>
                  <q-card color="white" class="col-xs-12 col-sm-11 no-shadow text-left">
                    <q-card-title>
                      <div class="text-azul1 q-mb-sm capitalize qCardTitle-fix" v-text="(data.NOME_FANTASIA).toLowerCase()" />
                      <span slot="subtitle" class="capitalize">
                        {{ (data.ENDERECO + ', ' + data.NUMERO + ' - ' + data.BAIRRO + formatarCEP(data.CEP) + data.CIDADE).toLowerCase() + ' ' + data.UF }}
                      </span>
                      <div slot="right" class="row text-right">
                        <div class="col-12" v-text="$t('agendamento.exames')" />
                        <section class="col-2 offset-8 inherit">
                          <span class="text-azul1 q-headline" v-text="data.QTE_EXAMES" />
                          <span v-text="'/' + agendamento.examesSelecionados.length" />
                        </section>
                      </div>
                    </q-card-title>
                    <q-card-main>
                      <q-checkbox v-if="$q.screen.xs" v-model="checked" class="float-right" color="azul1" :val="data.CNPJ" disable />
                      <span class="cursor-pointer" @click="maisInformacoes(data)">
                        <q-icon color="azul1 q-mr-xs" name="fas fa-plus" size="0.8rem" />
                        <span class="text-azul1" v-text="$t('agendamento.maisInformacoes')" />
                      </span>
                    </q-card-main>
                  </q-card>
                </section>
                <!-- FIM UNIDADES SELECIONADAS -->
                <q-btn v-if="agendamento.unidadesSelecionadas.length > 0" class="q-mt-md text-azul1" @click="refazerSelecao('exame')" :label="$t('agendamento.refazerSelecao')" outline no-caps/>
                <div v-if="clinicas.length === 0 && progresso < 100" class="q-mt-xl q-mb-md q-title text-cinza1" v-text="$t('agendamento.nenhumaUnidade')" />
                <div v-else-if="progresso > 0 && progresso < 100" class="q-mt-xl q-mb-md q-title text-cinza1" v-text="$t('agendamento.examesQueFaltam')" />
                <!-- SELEÇÃO DE UNIDADES -->
                <section v-for="(data,i) in clinicas" :key="`A-${i}`" :class="checkbox.includes(data.CNPJ) ? 'bg-azul1 border-azul1 shadow-4' : 'bg-white'" class="row q-mt-md round-borders">
                  <label class="col-xs-0 col-sm-1 text-explicativo relative-position cursor-pointer">
                    <q-checkbox v-if="$q.screen.gt.xs" v-model="checkbox" @input="onCheck(data, 'exame')" color="white" class="absolute-center" :val="data.CNPJ" />
                  </label>
                  <q-card color="white" class="col-xs-12 col-sm-11 no-shadow text-left">
                    <q-card-title>
                      <div class="text-azul1 q-mb-sm capitalize qCardTitle-fix" v-text="(data.NOME_FANTASIA).toLowerCase()" />
                      <span slot="subtitle" class="capitalize">
                        {{ (data.ENDERECO + ', ' + data.NUMERO + ' - ' + data.BAIRRO + formatarCEP(data.CEP) + data.CIDADE).toLowerCase() + ' ' + data.UF }}
                      </span>
                      <div slot="right" class="row text-right">
                        <div class="col-12" v-text="$t('agendamento.exames')" />
                        <section class="col-2 offset-8 inherit">
                          <span class="text-azul1 q-headline" v-text="data.QTE_EXAMES" />
                          <span v-text="'/' + agendamento.examesSelecionados.length" />
                        </section>
                      </div>
                    </q-card-title>
                    <q-card-main>
                      <q-checkbox v-if="$q.screen.xs" v-model="checkbox" @input="onCheck(data, 'exame')" class="float-right" color="azul1" :val="data.CNPJ" />
                      <span class="cursor-pointer" @click="maisInformacoes(data)">
                        <q-icon color="azul1 q-mr-xs" name="fas fa-plus" size="0.8rem" />
                        <span class="text-azul1" v-text="$t('agendamento.maisInformacoes')" />
                      </span>
                    </q-card-main>
                  </q-card>
                </section>
                <!-- FIM SELEÇÃO DE UNIDADES -->
                <div v-if="progresso === 100" class="q-mt-xl q-mb-md text-explicativo" v-text="$t('agendamento.selecionarDiasHorarios')" />
              </section>
              <q-inner-loading color="azul1" class="bg-fundo" :visible="loading" />
            </main>
          </q-tab-pane>

          <q-tab-pane class="q-px-none" name="porLocalidade">
            <q-search v-model="filtrarUnidadeLocalizacao" @input="getGeolocation" class="q-mt-sm" :placeholder="$t('agendamento.encontreUnidade')" :disable="disabled" maxlength="40" clearable upper-case/>
            <main :style="loading ? 'height: 170px' : ''" class="relative-position">
              <section v-if="!loading">
                <!-- UNIDADES SELECIONADAS -->
                <div v-if="agendamento.unidadesSelecionadas.length > 0" class="q-mt-lg q-mb-md q-title text-cinza1" v-text="$t('agendamento.examesUnidadesSelecionadas')" />
                <section v-for="(data,i) in agendamento.unidadesSelecionadas" :key="i" class="row q-mt-md bg-azul1 border-azul1 shadow-4 round-borders">
                  <div class="col-xs-0 col-sm-1 text-explicativo relative-position">
                    <q-checkbox v-if="$q.screen.gt.xs" v-model="checked" color="white" class="absolute-center" :val="data.CNPJ" disable />
                  </div>
                  <q-card color="white" class="col-xs-12 col-sm-11 no-shadow text-left">
                    <q-card-title>
                      <div class="text-azul1 q-mb-sm capitalize qCardTitle-fix" v-text="(data.NOME_FANTASIA).toLowerCase()" />
                      <span slot="subtitle" class="capitalize">
                        {{ (data.ENDERECO + ', ' + data.NUMERO + ' - ' + data.BAIRRO + formatarCEP(data.CEP) + data.CIDADE).toLowerCase() + ' ' + data.UF }}
                      </span>
                      <div slot="right" class="row text-right">
                        <div class="col-12" v-text="$t('agendamento.exames')" />
                        <section class="col-2 offset-8 inherit">
                          <span class="text-azul1 q-headline" v-text="data.QTE_EXAMES" />
                          <span v-text="'/' + agendamento.examesSelecionados.length" />
                        </section>
                      </div>
                    </q-card-title>
                    <q-card-main>
                      <q-checkbox v-if="$q.screen.xs" v-model="checked" class="float-right" color="azul1" :val="data.CNPJ" disable />
                      <span class="cursor-pointer" @click="maisInformacoes(data)">
                        <q-icon color="azul1 q-mr-xs" name="fas fa-plus" size="0.8rem" />
                        <span class="text-azul1" v-text="$t('agendamento.maisInformacoes')" />
                      </span>
                    </q-card-main>
                  </q-card>
                </section>
                <!-- FIM UNIDADES SELECIONADAS -->
                <q-btn v-if="agendamento.unidadesSelecionadas.length > 0" class="q-mt-md text-azul1" @click="refazerSelecao('localidade')" :label="$t('agendamento.refazerSelecao')" outline no-caps/>
                <div v-if="clinicasLocalidade.length === 0 && progresso < 100" class="q-mt-xl q-mb-md q-title text-cinza1" v-text="$t('agendamento.nenhumaUnidade')" />
                <div v-else-if="progresso > 0 && progresso < 100" class="q-mt-xl q-mb-md q-title text-cinza1" v-text="$t('agendamento.examesQueFaltam')" />
                <!-- SELECIONAR UNIDADES -->
                <section v-for="(data,i) in clinicasLocalidade" :key="`A-${i}`" :class="checkbox.includes(data.CNPJ) ? 'bg-azul1 border-azul1 shadow-4' : 'bg-white'" class="row q-mt-md round-borders">
                  <div class="col-xs-0 col-sm-1 text-explicativo relative-position">
                    <q-checkbox v-if="$q.screen.gt.xs" v-model="checkbox" @input="onCheck(data, 'localidade')" color="white" class="absolute-center" :val="data.CNPJ" />
                  </div>
                  <q-card color="white" class="col-xs-12 col-sm-11 no-shadow text-left">
                    <q-card-title>
                      <div class="text-azul1 capitalize qCardTitle-fix" v-text="(data.NOME_FANTASIA).toLowerCase()" />
                      <div class="q-body-1 text-cinza1 q-mb-sm qCardTitle-fix" v-text="`${data.DISTANCIA.toFixed(1)} km`" />
                      <span slot="subtitle" class="capitalize">
                        {{ (data.ENDERECO + ', ' + data.NUMERO + ' - ' + data.BAIRRO + formatarCEP(data.CEP) + data.CIDADE).toLowerCase() + ' ' + data.UF }}
                      </span>
                      <div slot="right" class="row text-right">
                        <div class="col-12" v-text="$t('agendamento.exames')" />
                        <section class="col-2 offset-8 inherit">
                          <span class="text-azul1 q-headline" v-text="data.QTE_EXAMES" />
                          <span v-text="'/' + agendamento.examesSelecionados.length" />
                        </section>
                      </div>
                    </q-card-title>
                    <q-card-main>
                      <q-checkbox v-if="$q.screen.xs" v-model="checkbox" @input="onCheck(data, 'localidade')" class="float-right" color="azul1" :val="data.CNPJ" />
                      <span class="cursor-pointer" @click="maisInformacoes(data)">
                        <q-icon color="azul1 q-mr-xs" name="fas fa-plus" size="0.8rem" />
                        <span class="text-azul1" v-text="$t('agendamento.maisInformacoes')" />
                      </span>
                    </q-card-main>
                  </q-card>
                </section>
                <!-- FIM SELECIONAR UNIDADES -->
                <div v-if="progresso === 100" class="q-mt-xl q-mb-md text-explicativo" v-text="$t('agendamento.selecionarDiasHorarios')" />
              </section>
              <q-inner-loading color="azul1" class="bg-fundo" :visible="loading" />
            </main>
          </q-tab-pane>
        </q-tabs>
      </section>
      <!-- INICIO MODAL INFORMAÇÃO DA CLÍNICA -->
      <q-modal v-model="infoClinicaModal" :content-css="{minWidth: '60vw', minHeight: '70vh'}" content-classes="bg-fundo" >
        <q-modal-layout class="q-pa-md" content-class="no-scroll">
          <section class="full-width text-left">
            <span class="text-azul1 q-pl-sm" :class="$q.screen.gt.xs ? 'q-headline' : 'q-title'" v-text="$t('agendamento.infoClinica')"/>
            <q-btn class="text-explicativo no-shadow q-px-sm q-pb-none float-right q-mt-sm-negative" icon="fas fa-times" v-close-overlay/>
            <main class="scroll q-mt-md" style="max-height: 35rem">
              <div v-for="(info,i) in informacoesClinica" :key="i">
                <q-card v-if="info.desc" color="white" :class="i !== 'endereco' ? 'q-mt-md' : ''" class="no-shadow text-left round-borders">
                  <q-card-title>
                    <div class="text-cinza1 q-mb-sm qCardTitle-fix" v-text="info.campo" />
                    <span slot="subtitle" :class="(i === 'endereco' || i === 'seusExames') ? 'capitalize' : ''" v-html="info.desc" />
                    <div v-if="i === 'endereco'" slot="right" class="row text-right">
                      <q-btn size="md" color="azul1" text-color="white" icon="fas fa-map-marker-alt" round @click="abrirEndereco(info.desc)">
                        <q-tooltip v-if="!$q.platform.is.mobile" v-text="$t('agendamento.verMapa')" />
                      </q-btn>
                    </div>
                  </q-card-title>
                </q-card>
              </div>
            </main>
          </section>
        </q-modal-layout>
      </q-modal>
      <!-- FIM MODAL INFORMAÇÃO DA CLÍNICA -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { iziError } from '@/helpers/notifications'
import { buscarClinicas, buscarClinicasGeolocalizacao, agendarTeleAtendimento } from '@/services'
import enderecoMaps from '@/mixins/enderecoMaps'

export default {
  mixins: [enderecoMaps],
  data () {
    return {
      disabled: false,
      clinicas: [],
      clinicasLocalidade: [],
      loading: false,
      checked: true,
      checkbox: [],
      filtrarUnidadeExame: '',
      filtrarUnidadeLocalizacao: '',
      background1: 'bg-azul1',
      background2: 'bg-white',
      color1: 'white',
      color2: 'azul1',
      selectedTab: '',
      informacoesClinica: {
        endereco: { 'campo': this.$t('agendamento.endereco'), 'desc': '' },
        contato: { 'campo': this.$t('agendamento.contato'), 'desc': '' },
        seusExames: { 'campo': this.$t('agendamento.seusExames'), 'desc': '' },
        hrFuncionamento: { 'campo': this.$t('agendamento.hrFuncionamento'), 'desc': '' },
        hrColeta: { 'campo': this.$t('agendamento.hrColeta'), 'desc': '' },
        examesRealizados: { 'campo': this.$t('agendamento.examesRealizados'), 'desc': '' },
        facilidades: { 'campo': this.$t('agendamento.facilidades'), 'desc': '' }
      },
      infoClinicaModal: false,
      progresso: 0
    }
  },
  created () {
    this.updateProgress()
  },
  computed: {
    ...mapGetters({
      agendamento: 'agendamento'
    })
  },
  watch: {
    selectedTab (val) {
      // Controle de cor da tab ativa
      if (val === 'porUnidade') {
        this.background1 = 'bg-azul1'
        this.background2 = 'bg-white'
        this.color1 = 'white'
        this.color2 = 'azul1'
      } else {
        this.background1 = 'bg-white'
        this.background2 = 'bg-azul1'
        this.color1 = 'azul1'
        this.color2 = 'white'
      }
    }
  },
  methods: {
    getGeolocation () {
      if (navigator.geolocation) {
        let config = {
          enableHighAccuracy: true,
          timeout: 6000,
          maximumAge: 0
        }
        this.loading = true
        navigator.geolocation.getCurrentPosition(this.geolocationSuccess, this.geolocationError, config)
      } else {
        iziError(this.$t('agendamento.geolocationErroBrowser'))
      }
    },
    geolocationSuccess (position) {
      this.listarUnidadesLocalizacao({ latitude: position.coords.latitude, longitude: position.coords.longitude }, this.filtrarUnidadeLocalizacao)
    },
    geolocationError (error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          iziError(this.$t('agendamento.geolocationErro1'))
          break
        case error.POSITION_UNAVAILABLE:
          iziError(this.$t('agendamento.geolocationErro2'))
          break
        case error.TIMEOUT:
          iziError(this.$t('agendamento.geolocationErro3'))
          break
        case error.UNKNOWN_ERROR:
          iziError(this.$t('agendamento.geolocationErro4'))
          break
      }
      this.loading = false
      this.selectedTab = 'porUnidade'
    },
    listarUnidadesLocalizacao (coordenadas, filtro) {
      // Tratamentos dos parâmetros
      let servicosList = []
      this.agendamento.examesSelecionados.map(exame => {
        if (!exame.marcado) servicosList.push(exame.id)
      })

      new Promise((resolve, reject) => {
        buscarClinicasGeolocalizacao(servicosList, coordenadas, filtro, this.$store.state.agendamento.teleAtendimento, resolve, reject)
      }).then(data => {
        this.clinicasLocalidade = data
      }).finally(() => {
        this.loading = false
      })
    },
    listarUnidades (filtro) {
      // Tratamentos dos parâmetros
      let servicosList = []
      this.agendamento.examesSelecionados.map(exame => {
        if (!exame.marcado) servicosList.push(exame.id)
      })

      this.loading = true
      new Promise((resolve, reject) => {
        buscarClinicas(servicosList, filtro, this.$store.state.agendamento.teleAtendimento, resolve, reject)
      }).then(data => {
        this.clinicas = data
      }).finally(() => {
        this.loading = false
      })
    },
    onCheck (val, param) {
      if (this.checkbox.includes(val.CNPJ)) {
        this.$store.dispatch('agendamentoStep2', val)
          .then(() => {
            param === 'exame' ? this.listarUnidades(this.filtrarUnidadeExame) : this.getGeolocation()
            this.updateProgress()
          })
      }
    },
    agendarTeleConsulta () {
      let promises = []
      promises.push(
        new Promise((resolve, reject) => { agendarTeleAtendimento(this.agendamento.examesSelecionados[0].id, this.$store.state.agendamento.unidadesSelecionadas[0].CNPJ, this.agendamento.examesSelecionados[0].cobertura, resolve, reject) })
      )
      Promise.all(promises)
        .then(codigosAgendamento => {
          this.$emit('agendamentoConcluido', codigosAgendamento)
        }).finally(() => {
          this.$q.loading.hide()
        })
    },
    refazerSelecao (param) {
      this.checkbox = []
      this.$store.dispatch('refazerSelecao')
        .then(() => {
          this.updateProgress()
          param === 'exame' ? this.listarUnidades(this.filtrarUnidadeExame) : this.getGeolocation()
        })
    },
    updateProgress () {
      this.agendamento.qtdExamesMarcados === 0 ? this.progresso = 0 : this.progresso = (this.agendamento.qtdExamesMarcados / this.agendamento.examesSelecionados.length) * 100
      if (this.progresso === 100) {
        this.disabled = true
        this.$emit('button', false)
      } else {
        this.disabled = false
        this.$emit('button', true)
      }
    },
    formatarParaHTML (text) {
      let formatedText
      text ? formatedText = text.replace(/\r\n/g, '<br>') : formatedText = text
      return formatedText
    },
    maisInformacoes (val) {
      // Formatters
      let hrFuncionamento = this.formatarParaHTML(val.HR_FUNCIONAMENTO)
      let hrColeta = this.formatarParaHTML(val.HR_COLETA)
      let examesRealizados = this.formatarParaHTML(val.EXAMES_REALIZADOS)
      let facilidades = this.formatarParaHTML(val.FACILIDADES)
      let seusExames = ''
      val.DESC_EXAMES.map((nomeExame, index, array) => {
        if (array.length - 1 === index) {
          seusExames += nomeExame
        } else {
          seusExames += `${nomeExame}<br>`
        }
      })

      // Construção dos detalhes
      this.informacoesClinica.endereco.desc = (val.ENDERECO + ', ' + val.NUMERO + ' - ' + val.BAIRRO + this.formatarCEP(val.CEP) + val.CIDADE).toLowerCase() + ' ' + val.UF
      this.informacoesClinica.seusExames.desc = seusExames.toLowerCase()
      this.informacoesClinica.hrFuncionamento.desc = hrFuncionamento
      this.informacoesClinica.hrColeta.desc = hrColeta
      this.informacoesClinica.examesRealizados.desc = examesRealizados
      this.informacoesClinica.facilidades.desc = facilidades
      this.informacoesClinica.contato.desc = (val.TELEFONE ? `${this.$t('agendamento.telefone')} ${val.TELEFONE}` : '') + (val.EMAIL ? `<br>${this.$t('agendamento.email')} ${val.EMAIL}` : '') + (val.SITE ? `<br>${this.$t('agendamento.site')} ${val.SITE}` : '')

      this.infoClinicaModal = true
    }
  }
}
</script>

<style lang="stylus">

.tabsUnidades
  &&.q-tabs-inverted .q-tabs-head
    background none

  .q-tab-label-parent
    margin-left 24px

  .tab-left-icon
    position absolute
    top 25%
    left 5%

</style>
