<template>
  <div class="full-width">
    <div class="row">
      <div class="col-12 q-headline q-mb-md text-azul1" v-text="$t('agendamento.confirmaDataHorario')" />
      <div class="col-12 q-pt-md q-mt-xs relative-position">
        <!-- SESSÃO CLINICA -->
        <section v-for="(unidade,i) in agendamento.unidadesSelecionadas" :key="i" class="q-pb-md">
          <div class="q-mt-none q-mb-sm q-ml-sm q-mr-xl text-azul1 text-left q-title capitalize">
            <q-icon size="1.5rem" class="q-mt-sm-negative" name="business" />
            {{ unidade.NOME_FANTASIA.toLowerCase() }}
            <q-btn class="right-0 absolute q-mt-md" size="sm" color="azul1" text-color="white" icon="fas fa-map-marker-alt" round @click="abrirEndereco(unidade.ENDERECO + '+' + unidade.NUMERO + '+' + unidade.BAIRRO + '+' + unidade.CIDADE + '+' + unidade.UF)">
              <q-tooltip v-if="!$q.platform.is.mobile" v-text="$t('agendamento.verMapa')" />
            </q-btn>
          </div>
          <div class="q-mt-none q-mb-sm q-ml-sm q-mr-xl text-explicativo text-left q-subheading capitalize">
            {{ (unidade.ENDERECO + ', ' + unidade.NUMERO + ' - ' + unidade.BAIRRO + formatarCEP(unidade.CEP) + unidade.CIDADE).toLowerCase() + ' ' + unidade.UF }}
          </div>
          <!-- SESSÃO EXAME -->
          <section v-for="(exame,j) in unidade.ID_EXAMES" :key="j" class="full-width q-pb-md row">
            <div class="col-xs-0 col-sm-1 text-explicativo">
              <svg height="72" width="100%" style="transform: rotate(90deg); margin-top: 20%;"><g fill="none" stroke="#B3B3B3" stroke-width="2"><path stroke-dasharray="5,6" d="M5 40 l80 0" /></g></svg>
              <q-icon class="q-mt-sm-negative q-mr-sm" name="far fa-calendar" size="1.4rem" />
              <svg height="72" width="100%" style="transform: rotate(90deg); margin-top: -6px;"><g fill="none" stroke="#B3B3B3" stroke-width="2"><path stroke-dasharray="5,6" d="M5 40 l80 0" /></g></svg>
            </div>
            <q-card color="white" class="col-xs-12 col-sm-11 qCard-fix horarioFix">
              <q-card-title class="q-pr-none q-py-none text-left">
                <span :class="!$q.screen.gt.xs ? 'q-subheading' : ''" class="text-azul1 capitalize qCardTitle-fix" v-text="getInfoExame(exame, 'desc')" />
                <div slot="right" class="row q-mr-xs q-mt-xs items-center">
                  <q-btn class="text-explicativo no-shadow q-py-none q-px-sm" icon="fas fa-times" @click="deletarExame(i, j, exame)" />
                </div>
              </q-card-title>
              <q-card-main class="text-left q-mt-sm q-pb-none row">
                <p class="col-12 text-cinza1 capitalize" v-text="getInfoExame(exame, 'modalidade')" />
                <div class="col-12 q-mb-sm text-explicativo" v-text="getInfoExame(exame, 'cobertura')" />
              </q-card-main>
              <q-card-actions class="q-px-md">
                <!-- SESSÃO DATA & HORA -->
                <q-field :label="$t('agendamento.data')" class="q-mb-sm col-xs-12 col-sm-5 horarioLabel relative-position" label-width="12">
                  <q-select class="selectDataHorario q-body-2" @input="onDataSelect(i, j, exame)" v-model="model[i][j].dataSelecionada" :popup-max-height="!$q.screen.gt.xs ? '120px' : '240px'" :ref="`selectData${i}${j}`" @click.native="teleAtendimento ? getTeleDatas(i, j) : getDatas(i, j, unidade.ID_EXAMES[j], unidade.CNPJ)" color="fundo" :options="model[i][j].datasDisponiveis" separator inverted-light />
                  <q-inner-loading color="azul1" :visible="model[i][j].loadingData" />
                </q-field>
                <q-field :label="$t('agendamento.horario')" class="q-mb-sm col-xs-12 col-sm-5 offset-sm-2 horarioLabel relative-position" label-width="12">
                  <q-select class="selectDataHorario q-body-2 qSelect-fix" @input="horarioCheck(), bloquearHorario(i, j, exame), permitirAgendamento(i, j, exame)" v-model="model[i][j].horarioSelecionado" :popup-max-height="!$q.screen.gt.xs ? '120px' : '240px'" :ref="`selectHorario${i}${j}`" @click.native="teleAtendimento ? getTeleHorarios(i, j, unidade.ID_EXAMES[j]) : getHorarios(i, j, unidade.ID_EXAMES[j], unidade.CNPJ)" color="fundo" :options="model[i][j].horariosDisponiveis" :disable="model[i][j].horarioControl" separator inverted-light />
                  <q-inner-loading color="azul1" :visible="model[i][j].loadingHorario" />
                </q-field>
                <!-- FIM SESSÃO DATA & HORA -->
              </q-card-actions>
            </q-card>
          </section>
          <!-- FIM SESSÃO EXAME -->
        </section>
        <!-- FIM SESSÃO CLINICA -->
      </div>
    </div>
    <!-- INICIO DIALOG -->
    <q-dialog v-model="dialogExclusao" @ok="confirmarExclusao" prevent-close>
      <span slot="title" v-html="$t('agendamento.excluirExame')" />
      <span slot="message" class="uppercase" v-text="deletarParams.nome" />
      <template slot="buttons" slot-scope="props">
        <q-btn flat :label="$t('agendamento.sim')" @click="props.ok" />
        <q-btn flat :label="$t('agendamento.nao')" @click="props.cancel" />
      </template>
    </q-dialog>
    <!-- FIM DIALOG -->
  </div>
</template>

<script>
import { date } from 'quasar'
const { formatDate } = date
import { mapGetters } from 'vuex'
import { buscarDatas, buscarHorarios, agendarExame, agendarTeleAtendimento, bloquearHorario, desbloquearHorarios, permitirAgendamento } from '@/services'
import { iziError } from '@/helpers/notifications'
import iziToast from 'izitoast'
import enderecoMaps from '@/mixins/enderecoMaps'
import { i18n } from "@/plugins/vue-i18n";
import { computed } from 'vue'

export default {
  mixins: [enderecoMaps],
  data () {
    return {
      deletarParams: {
        'nome': '',
        'indexExame': '',
        'indexUnidade': '',
        'idServico': ''
      },
      dialogExclusao: false,
      model: [],
      teleAtendimento: false,
      formatoData: 'DD/MM/YYYY'
    }
  },
  computed: {
    ...mapGetters({
      agendamento: 'agendamento'
    }),
  },
  created () {
    window.addEventListener('beforeunload', this.desbloquearHorarios, false)
    this.teleAtendimento = this.$store.state.agendamento.teleAtendimento

    this.formatoData = this.$store.state.config.formatoDataIngles ? 'MM/DD/YYYY' : 'DD/MM/YYYY'
    // Montagem das variáveis
    this.agendamento.unidadesSelecionadas.map((unidade, i) => {
      this.model.push([])
      unidade.ID_EXAMES.map(() => {
        this.model[i].push({
          loadingData: false,
          loadingHorario: false,
          horarioControl: true,
          dataSelecionada: '',
          horarioSelecionado: '',
          datasDisponiveis: [],
          horariosDisponiveis: []
        })
      })
    })
    this.$emit('button', true)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.desbloquearHorarios, false)
  },
  methods: {
    agendar () {
      let promises = []
      this.$q.loading.show({ spinnerColor: 'primary', customClass: 'page-loading' })
      this.model.map((clinica, i) => {
        this.model[i].map((exame, j) => {

          const idServico = this.agendamento.unidadesSelecionadas[i].ID_EXAMES[j];
          const exameSelecionado = this.agendamento.examesSelecionados.find(exame => exame.id === idServico);

          const respostas = []

          if (exameSelecionado.perguntas) {
          for (let index = 0; index < exameSelecionado.perguntas.length; index++) {
            const pergunta = exameSelecionado.perguntas[index];
            const resposta = exameSelecionado.respostas[index];
            const observacao = exameSelecionado.observacoes[index];

            const respostaCompleta = {}

            respostaCompleta.idPergunta = pergunta.id_questionario_agendamento;
            respostaCompleta.resposta = resposta == true ? 1 : 2;
          
            if (observacao) {
              respostaCompleta.observacao = observacao;
            } else {
              respostaCompleta.observacao = "";
            }

            respostaCompleta.liberadoMedico = "";

            respostas.push(respostaCompleta);
            
          }
          }

          promises.push(
            new Promise((resolve, reject) => { agendarExame(exame.dataSelecionada, exame.horarioSelecionado.hora, exame.horarioSelecionado.idEquip, this.agendamento.unidadesSelecionadas[i].ID_EXAMES[j], this.agendamento.unidadesSelecionadas[i].CNPJ, exameSelecionado.cobertura, exameSelecionado.idPac, respostas, resolve, reject) })
          )
        })
      })

      Promise.all(promises)
        .then(codigosAgendamento => {
          this.$emit('agendamentoConcluido', codigosAgendamento)
        }).finally(() => {
          this.$q.loading.hide()
          window.removeEventListener('beforeunload', this.desbloquearHorarios, false)
        })
    },
    agendarTeleConsulta () {
      let promises = []
      this.$q.loading.show({ spinnerColor: 'primary', customClass: 'page-loading' })
      this.model.map((clinica, i) => {
        this.model[i].map((exame, j) => {
          promises.push(
            new Promise((resolve, reject) => { agendarTeleAtendimento(exame.horarioSelecionado.idEquip, this.agendamento.unidadesSelecionadas[i].ID_EXAMES[j], this.agendamento.examesSelecionados[j].cobertura, resolve, reject) })
          )
        })
      })

      Promise.all(promises)
        .then(codigosAgendamento => {
          this.$emit('agendamentoConcluido', codigosAgendamento)
        }).finally(() => {
          this.$q.loading.hide()
          window.removeEventListener('beforeunload', this.desbloquearHorarios, false)
        })
    },
    confirmarExclusao () {
      // Controle de horários
      this.desbloquearHorarios(this.deletarParams.indexUnidade, this.deletarParams.indexExame)

      // Controle do exame selecionado
      this.agendamento.examesSelecionados.map((exame, index) => {
        if (exame.id === this.deletarParams.idServico) {
          this.$store.commit('DELETE_EXAME_SELECIONADO', index)
        }
      })
      // Controle da unidade selecionada
      let indexId = this.agendamento.unidadesSelecionadas[this.deletarParams.indexUnidade].ID_EXAMES.indexOf(this.deletarParams.idServico)
      this.$store.dispatch('removerExameUnidade', { 'unidade': this.deletarParams.indexUnidade, 'exame': indexId })
        .then(() => {
          if (!this.agendamento.unidadesSelecionadas.length) {
            this.$emit('inicioAgendamento')
          }
        })
      // Controle do modelo de data_horario
      this.model[this.deletarParams.indexUnidade].splice(this.deletarParams.indexExame, 1)
      if (this.model[this.deletarParams.indexUnidade].length === 0) {
        this.model.splice(this.deletarParams.indexUnidade, 1)
      }
      this.horarioCheck()
    },
    deletarExame (indexUnidade, indexExame, idServico) {
      this.deletarParams.nome = this.getInfoExame(idServico, 'desc')
      this.deletarParams.indexUnidade = indexUnidade
      this.deletarParams.indexExame = indexExame
      this.deletarParams.idServico = idServico
      this.dialogExclusao = true
    },
    bloquearHorario (indexUnidade, indexExame, exame) {
      if (!this.teleAtendimento) {
        let modelo = this.model[indexUnidade][indexExame]
        let bloqueioData = {
          'data': modelo.dataSelecionada,
          'horario': modelo.horarioSelecionado.hora,
          'idEquip': modelo.horarioSelecionado.idEquip,
          'exame': exame
        }
        modelo.loadingHorario = true
        new Promise((resolve, reject) => {
          bloquearHorario(bloqueioData, resolve, reject)
        }).catch(() => {
          modelo.horarioSelecionado = ''
        }).finally(() => {
          modelo.loadingHorario = false
        })
      }
    },
    desbloquearHorarios (indexUnidade, indexExame) {
      let desbloqueioData = []
      if (Number.isInteger(indexUnidade) && Number.isInteger(indexExame)) {
        let modelo = this.model[indexUnidade][indexExame]
        const idServico = this.agendamento.unidadesSelecionadas[indexUnidade].ID_EXAMES[indexExame];
        if (!modelo.horarioSelecionado.hora) return
        desbloqueioData.push({
          'data': modelo.dataSelecionada,
          'hora': modelo.horarioSelecionado.hora,
          'idEquip': modelo.horarioSelecionado.idEquip,
          'idServ': idServico
        })
      } else {
        this.model.map((clinica, i) => {
          this.model[i].map((exame, j) => {
            if (!exame.horarioSelecionado.hora) return

            const idServico = this.agendamento.unidadesSelecionadas[i].ID_EXAMES[j];
            
            desbloqueioData.push({
              'data': exame.dataSelecionada,
              'hora': exame.horarioSelecionado.hora,
              'idEquip': exame.horarioSelecionado.idEquip,
              'idServ': idServico
            })
          })
        })
      }

      return new Promise((resolve, reject) => {
        desbloquearHorarios(desbloqueioData, resolve, reject)
      }).then(() => {
        false && console.log('Horário(s) desbloqueado(s)')
      })
    },
    horarioCheck () {
      let count = 0
      this.model.map((m, i) => {
        this.model[i].map(obj => {
          obj.horarioSelecionado && count++
        })
      })
      count === this.agendamento.qtdExamesMarcados ? this.$emit('button', false) : this.$emit('button', true)
    },

    async permitirAgendamento(indexUnidade, indexExame, idServico) {
      let idConvPac = 0;

      if (this.agendamento.idConvenioPaciente) {
        idConvPac = this.agendamento.idConvenioPaciente;
      }

      const idPac = this.$store.state.usuario.idpac;
      
      let datasMarcacao = [], idsServ = [], horasMarcacao = [], idsEquip = [];

      this.model.map((clinica, i) => {
        this.model[i].map((exame, j) => {

          const idServico = this.agendamento.unidadesSelecionadas[i].ID_EXAMES[j];
          const exameSelecionado = this.agendamento.examesSelecionados.find(exame => exame.id === idServico);

          idsServ.push(exameSelecionado.id);
          datasMarcacao.push(exame.dataSelecionada);
          if (exame.horarioSelecionado.hora) {
            horasMarcacao.push(exame.horarioSelecionado.hora);
          } else {
            horasMarcacao.push(""); //valor padrão
          }

          if (exame.horarioSelecionado.idEquip) {
            idsEquip.push(exame.horarioSelecionado.idEquip);
          } else {
            idsEquip.push(0); //valor padrão
          }

        });
      });

      const dataSelecionada = this.model[indexUnidade][indexExame].dataSelecionada;

      try {
        const result = await new Promise((resolve, reject) => {
          permitirAgendamento(idServico, idConvPac, dataSelecionada, idPac, datasMarcacao, idsServ, horasMarcacao, idsEquip, resolve, reject)
        })

        if (result && !result.permitir) {

          iziToast.warning({
            message: `${result.msg}`,
            position: 'topCenter',
            progressBar: true,
            timeout: 7000,
          });

          await this.desbloquearHorarios(indexUnidade, indexExame)
          this.model[indexUnidade][indexExame].dataSelecionada = ''
          this.model[indexUnidade][indexExame].horarioControl = true
          this.model[indexUnidade][indexExame].horarioSelecionado = ''
          this.horarioCheck()

        }
      } catch (error) {
        this.model[indexUnidade][indexExame].dataSelecionada = ''
        iziError(this.$t('agendamento.erroSelecionarData'));
      }
    },

    async onDataSelect (indexUnidade, indexExame, idServico) {
      this.model[indexUnidade][indexExame].horarioControl = false
      this.model[indexUnidade][indexExame].horarioSelecionado = ''

      this.permitirAgendamento(indexUnidade, indexExame, idServico);

    },
    getInfoExame (idServico, param) {
      let info = this.agendamento.examesSelecionados.filter(ex => ex.id === idServico)[0]
      if (param === 'cobertura') {
        return info[param] === 1 ? this.$t('agendamento.particular') : this.$t('agendamento.coberto')
      }
      return info[param].toLowerCase()
    },
    getDatas (indexUnidade, indexExame, idServ, cnpj) {
      this.$refs['selectData' + indexUnidade + indexExame][0].hide()
      this.model[indexUnidade][indexExame].loadingData = true
      this.$refs['selectHorario' + indexUnidade + indexExame][0].hide()
      let exame = this.model[indexUnidade][indexExame]
      if (exame.horarioSelecionado) {
        this.desbloquearHorarios(indexUnidade, indexExame)
        exame.horarioSelecionado = ''
        this.horarioCheck()
        this.$emit('button', true)
      }
      // this.model[indexUnidade][indexExame].horarioControl = false
      // this.model[indexUnidade][indexExame].horarioSelecionado = ''
      new Promise((resolve, reject) => {
        buscarDatas(idServ, cnpj, resolve, reject)
      }).then(response => {
        this.model[indexUnidade][indexExame].datasDisponiveis = response.map(el => {
          let dt = new Date(el.DATA)
          dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset())
          let selectData = {
            'value': formatDate(dt, this.formatoData),
            'label': formatDate(dt, this.formatoData)
          }
          return selectData
        })
        this.$refs['selectData' + indexUnidade + indexExame][0].show()
      }).finally(() => {
        this.model[indexUnidade][indexExame].loadingData = false
      })
    },
    getTeleDatas (indexUnidade, indexExame) {
      this.$refs['selectData' + indexUnidade + indexExame][0].hide()
      this.model[indexUnidade][indexExame].loadingData = true
      this.$refs['selectHorario' + indexUnidade + indexExame][0].hide()
      this.model[indexUnidade][indexExame].horarioControl = false
      this.model[indexUnidade][indexExame].horarioSelecionado = ''
      this.model[indexUnidade][indexExame].datasDisponiveis = [{ 'value': this.$t('agendamento.hoje'), 'label': this.$t('agendamento.hoje') }]
      this.$refs['selectData' + indexUnidade + indexExame][0].show()
      this.model[indexUnidade][indexExame].loadingData = false
    },
    async getHorarios (indexUnidade, indexExame, idServ, cnpj) {
      this.$refs['selectHorario' + indexUnidade + indexExame][0].hide()
      let exame = this.model[indexUnidade][indexExame]

      // Só busca caso tenha selecionado uma data
      if (!exame.horarioControl) {
        let dataSelecionada = exame.dataSelecionada
        exame.loadingHorario = true

        if (exame.horarioSelecionado) {
          await this.desbloquearHorarios(indexUnidade, indexExame)
          exame.horarioSelecionado = ''
          this.horarioCheck()
        }

        new Promise((resolve, reject) => {
          buscarHorarios(idServ, cnpj, dataSelecionada, resolve, reject)
        }).then(response => {
          exame.horariosDisponiveis = response.map(horario => {
            let dataFormatada = {}
            dataFormatada.label = horario.hora
            // Retira o equipamento
            let hora = horario.hora.split(' - ')
            horario.hora = hora[0]
            dataFormatada.value = horario
            return dataFormatada
          })

          this.$refs['selectHorario' + indexUnidade + indexExame][0].show()
        }).finally(() => {
          exame.loadingHorario = false
        })
      }
    },
    getTeleHorarios (indexUnidade, indexExame, idServ) {
      this.$refs['selectHorario' + indexUnidade + indexExame][0].hide()
      let exame = this.model[indexUnidade][indexExame]

      // Só busca caso tenha selecionado uma data
      if (!exame.horarioControl) {
        exame.loadingHorario = true
        exame.horariosDisponiveis = [{ 'label': this.$t('agendamento.agora'), 'value': { 'hora': this.$t('agendamento.agora'), 'idEquip': `${idServ}` } }]
        this.$refs['selectHorario' + indexUnidade + indexExame][0].show()
        exame.loadingHorario = false
      }
    }
  }
}
</script>

<style lang="stylus">

.q-popover
  .q-list
    padding 0
    text-transform capitalize

.horarioFix
  .q-card-title
    line-height 1.3rem !important

</style>
