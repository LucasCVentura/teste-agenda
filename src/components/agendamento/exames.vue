<template>
  <div class="full-width">
    <div class="row">
      <div class="col-12 q-headline q-mb-md text-azul1"
        v-text="teleAtendimento ? $t('agendamento.servicoTeleAtendimento') : $t('agendamento.adicioneExames')" />
      <q-list v-if="examesSelecionados.length > 0" class="col-xs-12 col-sm-10 offset-sm-1 q-py-none" separator>
        <q-item v-for="(data, i) in examesSelecionados" :key="i" class="bg-white">
          <q-item-main class="text-azul1 capitalize">
            <q-item-tile v-if="data.sinonimia" class="capitalize">
              {{ data.sinonimia.toLowerCase() }}
            </q-item-tile>
            <q-item-tile :class="data.sinonimia && 'q-body-2'" class="text-italic capitalize q-mt-xs">
              {{ data.desc.toLowerCase() }}
            </q-item-tile>
          </q-item-main>
          <q-item-side v-if="!blockRemoveService" right>
            <q-icon color="cinza1" class="cursor-pointer" size="16px" @click.native="removerExameSelecionado(data.id)"
              name="fas fa-times" />
          </q-item-side>
        </q-item>
      </q-list>
      <q-btn :loading="loadingTeleAtendimento" v-if="!blockAddService"
        class="col-xs-12 col-sm-10 offset-sm-1 q-mt-md q-py-md bg-white text-azul1 text-weight-bold"
        :label="examesSelecionados.length > 0 ? $t('agendamento.adicionarMaisExames') : $t('agendamento.adicionarExame')"
        @click="modalListaExames = true; listarExames()" icon-right="fas fa-plus" outline no-caps />
      <!-- INICIO MODAL LISTA EXAMES -->
      <q-modal v-model="modalListaExames" :content-css="{ minWidth: '55vw', minHeight: '65vh' }" @hide="modalClosed"
        content-classes="bg-fundo">
        <q-modal-layout class="q-pa-md q-mb-sm" :content-style="{ overflow: 'hidden' }">
          <section class="full-width text-left">
            <span class="q-headline text-azul1" v-text="$t('agendamento.listaExames')" />
            <q-btn class="text-explicativo no-shadow float-right q-px-sm" icon="fas fa-times" v-close-overlay />
            <div class="q-mx-sm">
              <q-search v-model="search" @input="listarExames" class="q-mt-sm"
                :placeholder="$t('agendamento.encontreExame')" maxlength="40" upper-case />
              <section :style="loading ? 'height: 20vh' : ''" class="relative-position">
                <q-list v-if="!loading && servicosFiltrados.length > 0"
                  :style="!$q.screen.gt.xs ? 'max-height: 80vh' : 'max-height: 50vh'"
                  class="bg-white scroll q-py-none q-mt-md" link separator highlight>
                  <q-item v-for="(data, i) in servicosFiltrados" :key="i" @click.native="exibirPerguntas(data)"
                    class="list-vertical-center" multiline>
                    <q-item-main class="text-azul1">
                      <q-item-tile v-if="data.SINONIMIA" class="capitalize">
                        {{ data.SINONIMIA.toLowerCase() }}
                      </q-item-tile>
                      <q-item-tile :class="data.SINONIMIA && 'q-body-2'" class="capitalize q-mt-xs">
                        {{ data.DESC_SERV.toLowerCase() }}
                      </q-item-tile>
                      <q-item-tile class="q-body-2 text-italic text-explicativo q-mt-sm">
                        {{ data.COBERTURA === 1 ? $t('agendamento.particular') : (data.COBERTURA === 2 ?
                          $t('agendamento.coberto') : $t('agendamento.particularCoberto')) }}
                      </q-item-tile>
                    </q-item-main>
                    <q-item-side right>
                      <q-item-tile stamp><q-icon color="azul1" name="fas fa-plus" /></q-item-tile>
                    </q-item-side>
                  </q-item>
                </q-list>
                <q-list v-if="!loading && servicosFiltrados.length === 0 && search.length > 0"
                  class="q-py-none q-mt-md no-border">
                  <q-item>
                    <q-item-main class="text-negative" :label="`${$t('agendamento.nenhumResultado')} “${search}”`" />
                  </q-item>
                </q-list>
                <q-inner-loading color="azul1" class="bg-fundo" :visible="loading" />
              </section>
            </div>
          </section>
        </q-modal-layout>
      </q-modal>
      <!-- FIM MODAL LISTA EXAMES -->
      <!-- INICIO MODAL PERGUNTA EXAME -->
      <q-modal v-model="modalPerguntasVisivel" :content-css="modalStyles" content-classes="bg-fundo">
        <q-modal-layout class="q-pa-md q-mb-sm" :content-style="{ overflow: 'hidden' }">
          <section class="full-width text-left">
            <span class="q-headline text-azul1 q-mb-xs" v-text="$t('questionarioAgendamento.titulo')" />
            <section class="full-width text-left" style="margin-top: 16px;" v-if="perguntasModal.length > 0">
              <div v-for="(pergunta, index) in perguntasModal" :key="index" class="q-mt-sm row justify-between items-center" style="border-bottom: 1px solid #dcdcdc;">

                <div class="text-azul1 col-xs-12 col-lg-6">{{ pergunta.questao }}</div>

                <div class="col-xs-6 col-lg-2">
                  <div class="column">
                    <label>
                      <input type="radio" :name="'resposta-' + index" v-model="respostasPerguntas[index]" :value="true"> {{ $t('questionarioAgendamento.respostaSim') }}
                    </label>
                    <label>
                      <input type="radio" :name="'resposta-' + index" v-model="respostasPerguntas[index]" :value="false"> {{ $t('questionarioAgendamento.respostaNao') }}
                    </label>
                  </div>
                </div>

                <div class="col-xs-6 col-lg-4">
                  <q-input v-model="respostasTextuais[index]" :placeholder="$t('questionarioAgendamento.placeholderObservacao')" maxlength="100" />
                </div>

              </div>
            </section>
            <section v-else>
              <span class="q-headline text-negative">{{$t('questionarioAgendamento.ErroCarregamentoPerguntas')}}</span>
            </section>
            <div class="q-mt-md q-pt-md" style="text-align: right;">
              <q-btn :label="$t('questionarioAgendamento.botaoCancelar')" color="negative" @click="modalPerguntasVisivel = false" class="q-mx-xs q-px-sm" />
              <q-btn :label="$t('questionarioAgendamento.botaoEnviar')" color="primary" @click="processarRespostas" class="q-mx-xs q-px-sm" />
            </div>
          </section>
        </q-modal-layout>
      </q-modal>
      <!-- FIM MODAL PERGUNTA EXAME -->
      <medi-infoAdicional v-on:modalClosed="listarExames" />
    </div>
  </div>
</template>

<script>
import infoAdicional from '@/components/informacoesAdicionais'
import { iziError, iziWarning } from '@/helpers/notifications'
import { buscarServicos, getPerguntasByServico, buscarUltimaResposta } from '@/services'

export default {
  components: {
    'medi-infoAdicional': infoAdicional
  },
  data() {
    return {
      teleAtendimento: false,
      blockAddService: false,
      blockRemoveService: false,
      modalListaExames: false,
      loading: false,
      loadingTeleAtendimento: false,
      servicos: [],
      servicosFiltrados: [],
      search: '',
      timeoutID: null,
      modalPerguntasVisivel: false,
      perguntasModal: [],
      respostasPerguntas: [],
      respostasTextuais: [],
      exameComPerguntas: null,
      bloquearAgendamento: false,
      exameTemp: null
    }
  },
  computed: {
    idConvenioPaciente() {
      return this.$store.state.agendamento.idConvenioPaciente
    },
    examesSelecionados() {
      return this.$store.state.agendamento.examesSelecionados
    },
    modalStyles() {
      let styles = {
        minWidth: '55vw',
        minHeight: '20vh'
      };

      if (this.$q.screen.width >= 600) {
        styles.maxWidth = '40vw';
      }

      return styles;
    }
  },
  mounted() {
    this.onLoad()
  },
  watch: {
    examesSelecionados() {
      this.examesSelecionados.length > 0 ? this.$emit('button', false) : this.$emit('button', true)
      if (this.servicosFiltrados.length >= 1 && this.examesSelecionados.length >= 1 && this.$store.state.agendamento.teleAtendimento === true) {
        this.blockAddService = true
      } else {
        this.blockAddService = false
      }
    }
  },
  methods: {
    removerExameSelecionado(idServico) {
      this.examesSelecionados.map((exame, index) => {
        if (exame.id === idServico) {
          this.$store.commit('DELETE_EXAME_SELECIONADO', index)
          this.$store.dispatch('refazerSelecao')
        }
      })
    },
    modalClosed() {
      // Limpar pesquisa
      this.search = ''
      this.servicos = []
      this.servicosFiltrados = []
    },
    adicionarExame(exame) {
      if (exame.FL_AGENDARWEB === 'F') {
        iziWarning(this.$t('agendamento.verificaAgendarWeb'))
        return
      }

      this.proceedAdicionarExame(exame)

    },
    proceedAdicionarExame(exame) {
      let idsExame = []
      this.examesSelecionados.map(e => {
        idsExame.push(e.id)
      })
      if (idsExame.includes(exame.ID_SERV)) {
        iziError(this.$t('agendamento.exameJaAdd'))
      } else {
        let dadosExame = {
          'id': exame.ID_SERV,
          'desc': exame.DESC_SERV,
          'sinonimia': exame.SINONIMIA,
          'modalidade': exame.DESC_MODALIDADE,
          'cobertura': exame.COBERTURA,
          'marcado': false,
          'idPac': this.$store.state.usuario.idpac,
          'perguntas': exame.perguntasModal,
          'respostas': exame.respostasPerguntas,
          'observacoes': exame.respostasTextuais
        }
        this.$store.dispatch('agendamentoStep1', dadosExame)
        this.$store.dispatch('refazerSelecao')
        this.modalListaExames = false
      }
    },
    async exibirPerguntas(exame) {

      this.loading = true;
      const perguntas = await this.getPerguntasByServico(exame.ID_SERV);

      if (perguntas && perguntas.length > 0) {
        const resultados = await this.verificarRepeticao(perguntas);

        // Filtra as perguntas que devem ser repetidas
        const perguntasParaRepetir = perguntas.filter(pergunta => {
          const resultado = resultados.find(res => res.id === pergunta.id_questionario_agendamento);
          return resultado && resultado.repetir;
        });

        if (perguntasParaRepetir.length > 0) {
          this.exameComPerguntas = exame;
          this.perguntasModal = perguntasParaRepetir;
          this.respostasPerguntas = [];
          this.respostasTextuais = [];
          this.modalPerguntasVisivel = true;
        } else {
          // Se não houver perguntas para repetir, adicione o exame diretamente
          this.adicionarExame(exame);
        }
      } else {
        // Se não houver perguntas atreladas ao serviço, adicione o exame diretamente
        this.adicionarExame(exame);
      }
    },
    // responderPergunta(index, resposta) {
    //   this.$set(this.respostasPerguntas, index, resposta);
    // },
    processarRespostas() {
      this.bloquearAgendamento = false;
      for (let i = 0; i < this.perguntasModal.length; i++) {
        const pergunta = this.perguntasModal[i];
        const resposta = this.respostasPerguntas[i];

        if (resposta == undefined) {
          this.bloquearAgendamento = true;
          iziError(this.$t('questionarioAgendamento.preencherQuestionario'));
          return;
        }

        if ((pergunta.fl_resposta_bloqueio === '1' && resposta === true) ||
          (pergunta.fl_resposta_bloqueio === '2' && resposta === false)) {
          this.bloquearAgendamento = true;
          break;
        }
      }

      if (this.bloquearAgendamento) {
        iziError(this.$t('questionarioAgendamento.bloquearAgendamento'));
      } else {

        // new Promise((resolve, reject) => {
        //   salvarRespostas(
        //     this.$store.state.usuario.idpac,
        //     this.perguntasModal,
        //     this.respostasPerguntas,
        //     this.respostasTextuais,
        //     resolve, reject)
        // }).then(data => {
        //   // console.log(data);
        //   this.adicionarExame(this.exameComPerguntas);
        // });

        this.exameComPerguntas.perguntasModal = this.perguntasModal;
        this.exameComPerguntas.respostasPerguntas = this.respostasPerguntas;
        this.exameComPerguntas.respostasTextuais = this.respostasTextuais;

        this.adicionarExame(this.exameComPerguntas);

      }
      this.modalPerguntasVisivel = false;
    },

    async getPerguntasByServico (idService) {
      return new Promise((resolve, reject) => {
        getPerguntasByServico(
          idService,
          resolve,
          reject
        );
      }).then(data => {
        // console.log(data);
        return data;
      }).finally(() => {
        this.loading = false;
      });
    },

    async verificarRepeticao(perguntas) {

        const resultados = await Promise.all(perguntas.map(async (pergunta) => {
        const ultimaResposta = await this.obterUltimaResposta(pergunta.id_questionario_agendamento);

        if (!ultimaResposta || ultimaResposta.length === 0) {
          // Se não houver resposta anterior, considere que a pergunta deve ser repetida
          return { id: pergunta.id_questionario_agendamento, repetir: true };
        }

        if (pergunta.fl_repetir === '0') {
          return { id: pergunta.id_questionario_agendamento, repetir: true }; // Sempre repetir
        } else if (pergunta.fl_repetir === '1') {
          return { id: pergunta.id_questionario_agendamento, repetir: ultimaResposta.qtdMesesUltimaResposta >= pergunta.repetir_meses };
        } else if (pergunta.fl_repetir === '2') {
          return { id: pergunta.id_questionario_agendamento, repetir: false }; // Nunca repetir
        }
      }));

      return resultados;
    },
    obterUltimaResposta(idQuestionarioAgendamento) {
      return new Promise((resolve, reject) => {
        buscarUltimaResposta(
          this.$store.state.usuario.idpac,
          idQuestionarioAgendamento,
          resolve,
          reject
        );
      }).then(data => {
        // console.log(data);
        return data;
      }).catch(error => {
        console.error(error);
      });
    },
    listarExames() {
      if (this.timeoutID) clearTimeout(this.timeoutID)
      this.loading = true
      let filtro = this.search
      this.timeoutID = setTimeout(() => {
        if (this.search || this.$store.state.agendamento.teleAtendimento) {
          new Promise((resolve, reject) => {
            buscarServicos(this.idConvenioPaciente, filtro, this.examesSelecionados, this.$store.state.agendamento.teleAtendimento, resolve, reject)
          }).then(data => {
            this.servicos = data
            this.servicosFiltrados = data
            if (this.servicosFiltrados.length === 1 && this.examesSelecionados.length === 0 && this.$store.state.agendamento.teleAtendimento === true) {
              this.adicionarExame(this.servicosFiltrados[0])
              this.blockAddService = true
              this.blockRemoveService = true
            }
            if (filtro.trim() === this.search.trim()) this.loading = false
            this.loadingTeleAtendimento = false
          })
        } else {
          this.servicos = []
          this.servicosFiltrados = []
          this.search = ''
          this.loading = false
        }
      }, 1000, filtro)
    },
    onLoad() {
      this.teleAtendimento = this.$store.state.agendamento.teleAtendimento
      this.examesSelecionados.length > 0 ? this.$emit('button', false) : this.$emit('button', true)
      if (this.teleAtendimento && this.examesSelecionados.length === 0) this.loadingTeleAtendimento = true
    }
  }
}
</script>

<style lang="stylus">
.selected {
  background-color: #007bff !important; /* Azul para botão selecionado */
  color: white !important; /* Texto branco */
}
list-vertical-center
  display flex
  align-items center
  .q-item-side.q-item-side-right
    min-width 0

@media (max-width: 576px)
  .q-mt-md, .q-my-md
    margin-top: 16px
  .q-pb-sm, .q-py-sm
    padding-bottom: 0
    padding-top: 0
  .q-item
    padding: 2px 16px
  .q-mt-lg, .q-my-lg
    margin-top: 16px

@media (max-width: 375px)
  .assist-left
    max-width: 70px

@media (max-width: 320px)
  .assist-left
    max-width: 50px
  .q-mt-md, .q-my-md
    margin-top: 10px
  .q-pb-sm, .q-py-sm
    padding-bottom: 0
    padding-top: 0
  .q-item
    padding: 1px 10px
  .q-mt-lg, .q-my-lg
    margin-top: 10px
  .q-headline
    font-size: 16px
    line-height: 20px
  .q-pb-md, .q-py-md
    padding-bottom: 10px
    padding-top: 10px
  .btn-back
    font-size: 14px
</style>
