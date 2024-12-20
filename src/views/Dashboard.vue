<template>
  <q-layout view="lHh Lpr lFf" class="window-height block">
    <q-page-container class="page-flexbox">
      <medi-menu :config="'dashboard'" />
      <div class="flex-grow-1">
        <section class="full-width">
          <div class="assist-left-container row">
            <div class="col-xs-12 col-sm-4 col-md-3 offset-md-1 offset-sm-0">
              <img
                class="assist-left"
                :src="caminhoAssistente"
                alt="Assistente"
                align="middle"
              />
            </div>
            <div
              v-if="nomeUsuario"
              class="col-xs-12 col-sm-8 text-left assistente-sidetext"
            >
              <span
                class="q-display-1 text-azul1"
                v-html="`${$t('dashboard.ola')} ${$t('dashboard.tratamento')} `"
              />
              <span
                class="q-display-1 text-azul1 capitalize"
                v-html="`${nomeUsuario}!<br>`"
              />
              <span
                class="q-title text-explicativo"
                v-html="
                  qtdAgendados
                    ? $t('dashboard.possuiExames')
                    : $t('dashboard.naoPossuiExames')
                "
              />
              <div class="divToggle">
                <q-item class="q-mt-sm cursor-pointer itens" tag="label">
                  <q-item-main
                    class="q-mr-md q-my-md text-cinza1"
                    :label="$t('cadastro.smsFrase')"
                  />
                  <q-item-side right>
                    <q-toggle
                      v-if="!loading"
                      v-model="valorToggle"
                      @input="toggleSms"
                      checked-icon="check"
                      unchecked-icon="fas fa-times"
                    />
                  </q-item-side>
                </q-item>
                <q-item class="q-mt-sm cursor-pointer itens" tag="label">
                  <q-item-main
                    class="q-mr-md q-my-md text-cinza1"
                    :label="$t('cadastro.emailFrase')"
                  />
                  <q-item-side right>
                    <q-toggle
                      v-if="!loading"
                      v-model="valorToggleEmail"
                      @input="toggleEmail"
                      checked-icon="check"
                      unchecked-icon="fas fa-times"
                    />
                  </q-item-side>
                </q-item>
              </div>
            </div>
          </div>
          <q-tabs
            align="justify"
            v-model="selectedTab"
            class="q-mt-lg full-width tabsExames"
            animated
            inverted
          >
            <q-tab
              slot="title"
              name="tab-agendados"
              :class="!$q.screen.gt.xs ? 'q-subheading' : 'q-title'"
              class="text-weight-medium lowercase capitalize"
              :label="$t('dashboard.agendados')"
              :color="
                selectedTab === 'tab-agendados' ? 'primary' : 'explicativo'
              "
              :count="qtdAgendados"
              default
            >
              <q-icon
                class="tab-left-icon"
                name="far fa-calendar-alt"
                size="1.5rem"
              />
            </q-tab>
            <q-tab
              slot="title"
              name="tab-resultados"
              :class="!$q.screen.gt.xs ? 'q-subheading' : 'q-title'"
              class="text-weight-medium lowercase capitalize"
              :label="$t('dashboard.resultados')"
              :color="
                selectedTab === 'tab-resultados' ? 'primary' : 'explicativo'
              "
              :count="qtdResultadosPendentes"
            >
              <q-icon
                class="tab-left-icon"
                name="far fa-calendar-check"
                size="1.5rem"
              />
            </q-tab>
            <q-tab
              slot="title"
              name="tab-pendentes"
              :class="!$q.screen.gt.xs ? 'q-subheading' : 'q-title'"
              class="text-weight-medium lowercase capitalize"
              :label="$t('dashboard.naoRealizados')"
              :color="
                selectedTab === 'tab-pendentes' ? 'primary' : 'explicativo'
              "
              :count="qtdPendentes"
            >
              <q-icon
                class="tab-left-icon"
                name="far fa-calendar-times"
                size="1.5rem"
              />
            </q-tab>

            <!-- TAB DE EXAMES AGENDADOS -->
            <q-tab-pane
              name="tab-agendados"
              class="relative-position"
              :style="loading ? 'height: 200px' : ''"
              keep-alive
            >
              <div v-if="!loading" class="q-pt-md">
                <div
                  v-if="!qtdAgendados && !loading"
                  class="q-mt-md text-explicativo"
                >
                  <q-icon name="far fa-calendar-alt" size="2.5rem" />
                  <div
                    class="q-subheading q-my-sm"
                    v-html="$t('dashboard.agendadosMsg')"
                  />
                </div>
                <!-- SESSÃO DATA -->
                <section
                  v-else
                  v-for="(data, i) in examesAgendados"
                  :key="i"
                  class="q-pb-md"
                >
                  <h6
                    class="q-mt-none q-mb-sm q-ml-sm text-left text-azul1 q-title dataCard"
                    v-text="tratarData(i)"
                  />
                  <!-- SESSÃO EXAME -->
                  <section
                    class="q-pb-md row"
                    v-for="(exame, j) in data"
                    :key="j"
                  >
                    <div class="col-xs-0 col-sm-1 text-explicativo">
                      <svg
                        height="73"
                        width="100%"
                        style="transform: rotate(90deg); margin-top: 20%"
                      >
                        <g fill="none" stroke="#B3B3B3" stroke-width="2">
                          <path stroke-dasharray="5,6" d="M5 40 l80 0" />
                        </g>
                      </svg>
                      <q-icon
                        class="q-mt-sm-negative q-mr-sm"
                        name="far fa-calendar"
                        size="1.4rem"
                      />
                      <svg
                        height="73"
                        width="100%"
                        style="transform: rotate(90deg); margin-top: -6px"
                      >
                        <g fill="none" stroke="#B3B3B3" stroke-width="2">
                          <path stroke-dasharray="5,6" d="M5 40 l80 0" />
                        </g>
                      </svg>
                    </div>
                    <q-card color="white" class="col-xs-12 col-sm-10 qCard-fix">
                      <q-card-title class="q-pr-none q-py-none text-left">
                        <div
                          :class="!$q.screen.gt.xs ? 'q-subheading' : ''"
                          class="text-azul1 capitalize qCardTitle-fix"
                          v-text="exame.EXAME.toLowerCase()"
                        />
                        <q-btn
                          v-if="
                            exame.FL_TELECONSULTA == 'T' &&
                              $store.state.config.teleAtendimento == 'true' &&
                              exame.URL
                          "
                          :disabled="exame.FINALIZADO"
                          icon="fas fa-tv"
                          @click="getCodAgendamento(exame)"
                          class="bg-azul1 absolute btnTeleAtendimento"
                        >
                          <q-tooltip>{{
                            $t("dashboard.acessarTeleAtendimento")
                          }}</q-tooltip>
                        </q-btn>
                        <div
                          slot="right"
                          :class="$q.screen.gt.xs ? 'q-mt-xs' : ''"
                          class="row q-mr-xs items-center"
                        >
                          <q-btn
                            class="text-explicativo no-shadow q-py-none q-px-sm"
                            icon="fas fa-times"
                            @click="excluirExame(exame)"
                          />
                        </div>
                      </q-card-title>
                      <q-card-main class="text-left q-mt-sm q-pb-none row">
                        <p
                          class="text-cinza1 col-12 capitalize box"
                          v-text="exame.MODALIDADE.toLowerCase()"
                        />
                        <p
                          class="text-explicativo col-12 box"
                          v-text="
                            exame.COBERTURA === 1
                              ? $t('dashboard.particular')
                              : $t('dashboard.coberto')
                          "
                        />
                        <p
                          class="text-azul1 col-6"
                          v-html="$t('dashboard.horario')"
                        />
                        <p
                          class="text-azul1 col-6 text-right q-title"
                          v-text="exame.HORA.slice(0, -3)"
                        />
                        <q-collapsible
                          :class="$q.screen.lt.md ? 'shadow-1' : ''"
                          class="col-12 text-cinza1 dbCollapsible q-mb-md q-pt-none"
                          :label="$t('dashboard.verDetalhes')"
                          :popup="$q.screen.gt.sm ? true : false"
                        >
                          <div class="row">
                            <p
                              :class="!$q.screen.gt.xs ? 'text-justify' : ''"
                              class="col-10 q-pt-sm text-cinza1 capitalize"
                            >
                              {{
                                (
                                  exame.ENDERECO +
                                  ", " +
                                  exame.NUMERO +
                                  " - " +
                                  exame.BAIRRO +
                                  formatarCEP(exame.CEP) +
                                  exame.CIDADE
                                ).toLowerCase() +
                                  " " +
                                  exame.UF
                              }}
                            </p>
                            <q-btn
                              style="right: 16px"
                              class="absolute"
                              size="sm"
                              color="azul1"
                              text-color="white"
                              icon="fas fa-map-marker-alt"
                              round
                              @click="
                                abrirEndereco(
                                  exame.ENDERECO +
                                    '+' +
                                    exame.NUMERO +
                                    '+' +
                                    exame.BAIRRO +
                                    '+' +
                                    exame.CIDADE +
                                    '+' +
                                    exame.UF
                                )
                              "
                            >
                              <q-tooltip
                                v-if="!$q.platform.is.mobile"
                                v-text="$t('dashboard.verMapa')"
                              />
                            </q-btn>
                            <q-btn
                              class="col-xs-12 col-sm-8 offset-sm-2 q-mt-md q-mb-sm"
                              :label="$t('dashboard.consultarPreparo')"
                              color="azul1"
                              @click="mostrarPreparo(exame.PREPARO)"
                              text-color="white"
                              no-caps
                            />
                          </div>
                        </q-collapsible>
                        <div
                          v-if="exame.btnAnamnese"
                          class="col-12 text-left q-mt-md"
                          style="padding-bottom: 10px"
                        >
                          <q-btn
                            v-if="!exame.replied"
                            class="col-12 text-center q-mt-md"
                            color="primary"
                            style="padding: 5px; width: 60px; height: 50px"
                            @click="
                              navegarParaNovaPagina(
                                exame.CODAGENDAMENTO,
                                exame.patientName,
                                exame.idSurvey
                              )
                            "
                          >
                            <i
                              class="q-icon fas fa-file-medical"
                              style="font-size: 30px"
                            ></i>
                          </q-btn>
                          <q-btn
                            v-else
                            class="col-12 text-center q-mt-md"
                            color="secondary"
                            style="padding: 5px; width: 60px; height: 50px"
                            @click="showQuestionarioError"
                          >
                            <i
                              class="q-icon fas fa-file-medical"
                              style="font-size: 30px"
                            ></i>
                          </q-btn>
                        </div>
                      </q-card-main>
                    </q-card>
                  </section>
                  <!-- FIM SESSÃO EXAME -->
                </section>
                <!-- FIM SESSÃO DATA -->
              </div>
              <q-inner-loading
                size="50px"
                class="bg-transparent q-py-lg"
                color="azul1"
                :visible="loading"
              />
            </q-tab-pane>

            <!-- TAB DE EXAMES NÃO REALIZADOS -->
            <q-tab-pane
              name="tab-pendentes"
              class="relative-position"
              :style="loading ? 'height: 200px' : ''"
              keep-alive
            >
              <div v-if="!loading" class="q-pt-md">
                <div v-if="!qtdPendentes" class="q-mt-md text-explicativo">
                  <q-icon name="far fa-calendar-times" size="2.5rem" />
                  <div
                    class="q-subheading q-my-sm"
                    v-html="$t('dashboard.naoRealizadosMsg')"
                  />
                </div>
                <!-- SESSÃO DATA -->
                <section
                  v-else
                  v-for="(data, i) in examesPendentes"
                  :key="i"
                  class="q-pb-md"
                >
                  <h6
                    class="q-mt-none q-mb-sm q-ml-sm text-left text-azul1 q-title dataCard"
                    v-text="tratarData(i)"
                  />
                  <!-- SESSÃO EXAME -->
                  <section
                    class="q-pb-md row"
                    v-for="(exame, j) in data"
                    :key="j"
                  >
                    <div class="col-xs-0 col-sm-1 text-explicativo">
                      <svg
                        height="73"
                        width="100%"
                        style="transform: rotate(90deg); margin-top: 20%"
                      >
                        <g fill="none" stroke="#B3B3B3" stroke-width="2">
                          <path stroke-dasharray="5,6" d="M5 40 l80 0" />
                        </g>
                      </svg>
                      <q-icon
                        class="q-mt-sm-negative q-mr-sm"
                        name="far fa-calendar"
                        size="1.4rem"
                      />
                      <svg
                        height="73"
                        width="100%"
                        style="transform: rotate(90deg); margin-top: -6px"
                      >
                        <g fill="none" stroke="#B3B3B3" stroke-width="2">
                          <path stroke-dasharray="5,6" d="M5 40 l80 0" />
                        </g>
                      </svg>
                    </div>
                    <q-card color="white" class="col-xs-12 col-sm-10 qCard-fix">
                      <q-card-title class="q-pr-none q-py-none text-left">
                        <div
                          :class="!$q.screen.gt.xs ? 'q-subheading' : ''"
                          class="text-azul1 capitalize qCardTitle-fix q-pb-sm"
                          v-text="exame.EXAME.toLowerCase()"
                        />
                      </q-card-title>
                      <q-card-main class="text-left q-mt-sm q-pb-none row">
                        <p
                          class="text-cinza1 col-12 capitalize"
                          v-text="exame.MODALIDADE.toLowerCase()"
                        />
                        <p
                          class="text-explicativo col-12"
                          v-text="
                            exame.COBERTURA === 1
                              ? $t('dashboard.particular')
                              : $t('dashboard.coberto')
                          "
                        />
                        <p
                          class="text-azul1 col-6"
                          v-html="$t('dashboard.horario')"
                        />
                        <p
                          class="text-azul1 col-6 text-right q-title"
                          v-text="exame.HORA.slice(0, -3)"
                        />
                        <q-collapsible
                          :class="$q.screen.lt.md ? 'shadow-1' : ''"
                          class="col-12 text-cinza1 dbCollapsible q-mb-md q-pt-none"
                          :label="$t('dashboard.verDetalhes')"
                          :popup="$q.screen.gt.sm ? true : false"
                        >
                          <div class="row">
                            <p
                              :class="!$q.screen.gt.xs ? 'text-justify' : ''"
                              class="col-10 q-pt-sm text-cinza1 capitalize"
                            >
                              {{
                                (
                                  exame.ENDERECO +
                                  ", " +
                                  exame.NUMERO +
                                  " - " +
                                  exame.BAIRRO +
                                  formatarCEP(exame.CEP) +
                                  exame.CIDADE
                                ).toLowerCase() +
                                  " " +
                                  exame.UF
                              }}
                            </p>
                            <q-btn
                              style="right: 16px"
                              class="absolute"
                              size="sm"
                              color="azul1"
                              text-color="white"
                              icon="fas fa-map-marker-alt"
                              round
                              @click="
                                abrirEndereco(
                                  exame.ENDERECO +
                                    '+' +
                                    exame.NUMERO +
                                    '+' +
                                    exame.BAIRRO +
                                    '+' +
                                    exame.CIDADE +
                                    '+' +
                                    exame.UF
                                )
                              "
                            >
                              <q-tooltip
                                v-if="!$q.platform.is.mobile"
                                v-text="$t('dashboard.verMapa')"
                              />
                            </q-btn>
                            <q-btn
                              class="col-xs-12 col-sm-8 offset-sm-2 q-mt-md q-mb-sm"
                              :label="$t('dashboard.consultarPreparo')"
                              color="azul1"
                              @click="mostrarPreparo(exame.PREPARO)"
                              text-color="white"
                              no-caps
                            />
                          </div>
                        </q-collapsible>
                      </q-card-main>
                    </q-card>
                  </section>
                  <!-- FIM SESSÃO EXAME -->
                </section>
                <!-- FIM SESSÃO DATA -->
              </div>
              <q-inner-loading
                size="50px"
                class="bg-transparent q-py-lg"
                color="azul1"
                :visible="loading"
              />
            </q-tab-pane>

            <!-- TAB DE EXAMES DISPONÍVEIS -->
            <q-tab-pane
              name="tab-resultados"
              class="relative-position"
              :style="loading ? 'height: 200px' : ''"
              keep-alive
            >
              <form
                id="portalResultados"
                :action="urlPortal"
                method="post"
                target="_blank"
                style="position: absolute"
              >
                <input
                  type="text"
                  name="loginUsuario"
                  style="visibility: hidden"
                  :value="user_id"
                />
                <input
                  type="text"
                  name="loginSenha"
                  style="visibility: hidden"
                  :value="user_code"
                />
                <input
                  type="text"
                  name="senhaCrip"
                  style="visibility: hidden"
                  :value="user_crip"
                />
                <input
                  type="text"
                  name="integracao"
                  style="visibility: hidden"
                  value="T"
                />
              </form>
              <div v-if="!loading" class="q-pt-md">
                <div
                  v-if="!qtdResultadosPendentes"
                  class="q-mt-md text-explicativo"
                >
                  <q-icon name="far fa-calendar-check" size="2.5rem" />
                  <div
                    class="q-subheading q-my-sm"
                    v-html="$t('dashboard.semResultadosMsg')"
                  />
                </div>
                <!-- SESSÃO DATA -->
                <section
                  v-else
                  v-for="(data, i) in resultadosExames"
                  :key="i"
                  class="q-pb-md"
                >
                  <h6
                    class="q-mt-none q-mb-sm q-ml-sm text-left text-azul1 q-title dataCard"
                    v-text="tratarData(i)"
                  />
                  <!-- SESSÃO EXAME -->
                  <section
                    class="q-pb-md row"
                    v-for="(exame, j) in data"
                    :key="j"
                  >
                    <q-card color="white" class="col-xs-12 qCard-fix">
                      <q-card-title class="q-pr-none q-py-none text-left">
                        <div
                          :class="!$q.screen.gt.xs ? 'q-subheading' : ''"
                          class="text-azul1 capitalize qCardTitle-fix q-pb-sm"
                          v-text="exame.EXAME.toLowerCase()"
                        />
                        <q-btn
                          icon="fas fa-share-square"
                          type="submit"
                          form="portalResultados"
                          class="bg-azul1 absolute btnResultado"
                        />
                      </q-card-title>
                      <q-card-main class="text-left q-mt-sm q-pb-none row">
                        <p
                          class="text-cinza1 col-12 capitalize"
                          v-text="exame.MODALIDADE.toLowerCase()"
                        />
                      </q-card-main>
                    </q-card>
                  </section>
                  <!-- FIM SESSÃO EXAME -->
                </section>
                <!-- FIM SESSÃO DATA -->
              </div>
              <q-inner-loading
                size="50px"
                class="bg-transparent q-py-lg"
                color="azul1"
                :visible="loading"
              />
            </q-tab-pane>
          </q-tabs>
        </section>
      </div>
      <footer class="row q-mt-sm">
        <q-btn
          v-if="this.$store.state.config.teleAtendimento == 'false'"
          class="col-xs-10 col-sm-6 offset-xs-1 offset-sm-3 q-py-md bg-azul1 text-white"
          :label="
            qtdAgendados
              ? $t('dashboard.agendarOutrosExames')
              : $t('dashboard.agendarExames')
          "
          icon="far fa-calendar-alt"
          @click="agendarExames()"
        />
        <q-btn
          v-if="this.$store.state.config.teleAtendimento == 'true'"
          class="col-sm-3 offset-xs-1 offset-sm-2 q-py-md bg-azul1 text-white"
          :label="
            qtdAgendados
              ? $t('dashboard.teleAtendimento')
              : $t('dashboard.teleAtendimento')
          "
          icon-right="fas fa-tv"
          @click="setTeleAtendimento(true)"
        />
        <q-btn
          v-if="this.$store.state.config.teleAtendimento == 'true'"
          class="col-sm-4 offset-xs-1 offset-sm-1 q-py-md bg-azul1 text-white"
          :label="
            qtdAgendados
              ? $t('dashboard.agendarOutrosExames')
              : $t('dashboard.agendarExames')
          "
          icon-right="far fa-calendar-alt"
          @click="agendarExames()"
        />
      </footer>
      <!-- INICIO DIALOG EXCLUSAO -->
      <q-dialog v-model="dialogExclusao" @ok="confirmarExclusao" prevent-close>
        <span slot="title" v-html="$t('dashboard.cancelarAgendamento')" />
        <span slot="message" class="uppercase" v-text="deletarExame.nome" />
        <template slot="buttons" slot-scope="props">
          <q-btn class="button-modal" flat label="Sim" @click="props.ok" />
          <q-btn class="button-modal" flat label="Não" @click="props.cancel" />
        </template>
      </q-dialog>
      <!-- FIM DIALOG EXCLUSAO -->
      <!-- INICIO MODAL PREPARO -->
      <q-modal v-model="modalPreparo" content-classes="bg-fundo">
        <q-modal-layout class="layout-agenda">
          <section class="q-pa-md" style="max-width: 99vw">
            <p class="q-headline" v-text="$t('dashboard.preparo')" />
            <q-btn
              v-if="!$q.screen.gt.sm"
              class="text-explicativo no-shadow fixed-top-right"
              icon="fas fa-times"
              v-close-overlay
            />
            <div class="text-left q-px-sm no-scroll" v-html="preparo" />
          </section>
        </q-modal-layout>
      </q-modal>
      <!-- FIM MODAL PREPARO -->
    </q-page-container>
  </q-layout>
</template>

<script>
import menuOpcoes from "@/components/menuOpcoes";
import {
  buscarExames,
  desmarcarExame,
  cancelarTeleAtendimentoNaoConfirmado,
  atualizarSMS,
  buscarInfoPaciente,
  atualizarEmailLembrete,
  gerarTokenAnamnese
} from "@/services";
import { iziSuccess, iziError } from "@/helpers/notifications";
import enderecoMaps from "@/mixins/enderecoMaps";
import axios from "axios";
import moment from "moment";

export default {
  mixins: [enderecoMaps],
  components: {
    "medi-menu": menuOpcoes
  },
  data() {
    return {
      anexo: "",
      loading: false,
      nomeUsuario: "",
      preparo: "",
      smslembrete: null,
      emaillembrete: null,
      modalPreparo: false,
      valorToggle: null,
      valorToggleEmail: null,
      deletarExame: {
        nome: "",
        data: "",
        hora: "",
        equip: "",
        flTeleconsulta: "",
        codigoAgendamento: ""
      },
      selectedTab: "",
      examesAgendados: {},
      qtdAgendados: 0,
      examesPendentes: {},
      qtdPendentes: 0,
      resultadosExames: {},
      qtdResultadosPendentes: 0,
      dialogExclusao: false,
      urlPortal: null,
      user_id: null,
      user_code: null,
      user_crip: "F",
      refresh_interval: null
    };
  },
  created() {
    this.loading = true;
    this.carregarInformacoes();
    this.getExames();

    this.refresh_interval = setInterval(() => {
      this.loading = true;
      this.examesAgendados = {};
      this.qtdAgendados = 0;
      this.examesPendentes = {};
      this.qtdPendentes = 0;
      this.resultadosExames = {};
      this.qtdResultadosPendentes = 0;
      this.dialogExclusao = false;
      this.urlPortal = null;
      this.user_id = null;
      this.user_code = null;
      this.user_crip = "F";
      this.getExames();
    }, 15000);
  },
  mounted() {},
  beforeRouteLeave(to, from, next) {
    clearInterval(this.refresh_interval);
    next();
  },
  computed: {
    caminhoAssistente() {
      return this.$store.state.config.assistente;
    }
  },
  methods: {
    setTeleAtendimento(value) {
      if (value) {
        this.$store.dispatch("agendarTeleAtendimento").then(() => {
          this.$router.push("/agendamento/exames");
        });
      } else {
        this.$store.dispatch("removerTeleAtendimento").then(() => {
          this.$router.push("/agendamento/exames");
        });
      }
    },
    mostrarResultado(urlPortal, userId, userCode) {
      let route = this.$router.resolve({
        path: "https://google.com/",
        params: { data: "someData" }
      });
      window.open(route.href, "_blank");

      // let route = this.$router.resolve('/link/to/page'); // This also works.
      // console.log(urlPortal + userId + userCode)
      // window.open(urlPortal, '_blank')
      // $('<form method="post" target="_blank"></form>').appendTo('body').submit().remove();
    },
    dataAtual(data) {
      const today = new Date();
      let date = data.split("-");
      let dt = new Date(date[0], date[1] - 1, date[2]);
      return (
        dt.getDate() === today.getDate() &&
        dt.getMonth() === today.getMonth() &&
        dt.getFullYear() === today.getFullYear()
      );
    },
    criptografarUrl() {
      let url = window.location.href;
      let encodedString = btoa(url);
      return encodedString;
    },
    getCodAgendamento(exames) {
      let parametrosConsultaFila;
      if (exames.OS_EXAME !== undefined) {
        parametrosConsultaFila =
          "codigoAgendamento=" +
          exames.CODAGENDAMENTO +
          "&osExame=" +
          exames.OS_EXAME;
      } else {
        parametrosConsultaFila = "codigoAgendamento=" + exames.CODAGENDAMENTO;
      }

      parametrosConsultaFila = btoa(parametrosConsultaFila);
      let url = exames.URL + "?" + parametrosConsultaFila;
      window.open(url, "_blank");
    },

    async getExames() {
      try {
        const response = await new Promise((resolve, reject) => {
          buscarExames(resolve, reject);
        });

        // Tratamento do nome do usuário
        this.nomeUsuario = response.nomeUsuario.split(" ")[0].toLowerCase();

        // Controle dos exames marcados
        for (let index = 0; index < response.marcados.length; index++) {
          let res = response.marcados[index];
          res.ID = index;

          if (
            res.FL_TELECONSULTA &&
            res.STATUS === "OK" &&
            this.dataAtual(res.DATA)
          ) {
            // TODO: CONFIGURAR TEMPO DE RETORNO
            // TODO: TRATAR HORA DE LIMITE DE RETORNO
            res.URL = "salaEspera.html";
            if (res.AGENDA_URL) {
              // TODO: CHECAR O PRAZO DO LINK
              res.URL =
                res.AGENDA_URL + "&URL=" + this.criptografarUrl() + "&P=A";
            }
          }
          // Outros controles...

          if (this.$store.state.config.caminhoAnamnese != "") {
            await this.fetchNovoEndpoint(res);
          }

          if (res.DATA in this.examesAgendados) {
            this.examesAgendados[res.DATA].push(res);
          } else {
            this.examesAgendados[res.DATA] = [res];
          }
          this.qtdAgendados = index + 1;
        }

        // Controle dos exames pendentes
        for (let index = 0; index < response.pendentes.length; index++) {
          let res = response.pendentes[index];
          res.ID = index;
          if (res.DATA in this.examesPendentes) {
            this.examesPendentes[res.DATA].push(res);
          } else {
            this.examesPendentes[res.DATA] = [res];
            delete this.examesPendentes[res.DATA].DATA;
          }
          this.qtdPendentes = index + 1;
        }

        // Controle dos resultados pendentes
        if (response.resultadosPendentes && response.resultadosPendentes.quantidade > 0) {
          for (
            let index = 0;
            index < response.resultadosPendentes.exames.length;
            index++
          ) {
            let res = response.resultadosPendentes.exames[index];
            res.ID = index;
            if (res.DATA in this.resultadosExames) {
              this.resultadosExames[res.DATA].push(res);
            } else {
              this.resultadosExames[res.DATA] = [res];
              delete this.resultadosExames[res.DATA].DATA;
            }
            this.qtdResultadosPendentes = index + 1;
          }

          this.urlPortal = response.resultadosPendentes.link;
          this.user_id = response.resultadosPendentes.user_id;
          this.user_code = response.resultadosPendentes.user_code;
          this.user_crip = response.resultadosPendentes.user_crip;
        }
      } catch (error) {
        // Tratamento de erros, se necessário
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    mostrarPreparo(preparo) {
      preparo
        ? (this.preparo = preparo.replace(/\r\n/g, "<br>"))
        : (this.preparo = this.$t("dashboard.semPreparo"));
      this.modalPreparo = true;
    },
    desmarcarTeleConsulta() {
      new Promise((resolve, reject) => {
        cancelarTeleAtendimentoNaoConfirmado(
          this.deletarExame.codigoAgendamento,
          this.deletarExame.data,
          this.deletarExame.hora,
          this.deletarExame.equip,
          resolve,
          reject
        );
      })
        .then(() => {
          iziSuccess(this.$t("dashboard.exameDesmarcado"));
          // Reseta as variáveis e busca os exames
          this.examesAgendados = {};
          this.examesPendentes = {};
          this.qtdAgendados--;
          this.getExames();
        })
        .catch(() => {
          this.loading = false;
        });
    },
    desmarcarExame() {
      new Promise((resolve, reject) => {
        desmarcarExame(
          this.deletarExame.data,
          this.deletarExame.hora,
          this.deletarExame.equip,
          this.deletarExame.codigoAgendamento,
          resolve,
          reject
        );
      })
        .then(() => {
          iziSuccess(this.$t("dashboard.exameDesmarcado"));
          // Reseta as variáveis e busca os exames
          this.examesAgendados = {};
          this.examesPendentes = {};
          this.qtdAgendados--;
          this.getExames();
        })
        .catch(() => {
          this.loading = false;
        });
    },
    confirmarExclusao() {
      this.loading = true;
      if (this.deletarExame.flTeleconsulta === "T") {
        this.desmarcarTeleConsulta();
      } else {
        this.desmarcarExame();
      }
    },
    excluirExame(exame) {
      this.deletarExame.nome = `${this.$t("dashboard.exame")} ${exame.EXAME}`;
      this.deletarExame.data = exame.DATA;
      this.deletarExame.hora = exame.HORA;
      this.deletarExame.equip = exame.ID_EQUIP;
      this.deletarExame.flTeleconsulta = exame.FL_TELECONSULTA;
      this.deletarExame.codigoAgendamento = exame.CODAGENDAMENTO;
      this.dialogExclusao = true;
    },
    tratarData(data) {
      let dt = new Date(data);
      dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
      return this.$d(dt, "dashboard");
    },
    carregarInformacoes() {
      this.$q.loading.show({
        spinnerColor: "primary",
        customClass: "page-loading"
      });
      new Promise((resolve, reject) => {
        buscarInfoPaciente(resolve, reject);
      })
        .then(data => {

          if (data.map) {
            data = data.map;
          }

          // console.log(data.map)
          if (data.ID) {
            this.$store.dispatch('updateIdPac', data.ID);
          }
          // console.log(data.map.ID)
          // console.log(this.$store.state.usuario.idpac)
          if (data.SMSLEMBRETE) {
            this.smslembrete = data.SMSLEMBRETE;
            this.valorToggle = this.smslembrete === "T";
          }
          if (data.EMAILLEMBRETE) {
            this.emaillembrete = data.EMAILLEMBRETE;
            this.valorToggleEmail = this.emaillembrete === "T";
          }
        })
        .finally(() => {
          this.$q.loading.hide();
        });
    },
    async toggleSms() {
      try {
        const valorEnvio = this.valorToggle ? "T" : "F";
        await atualizarSMS(valorEnvio);
      } catch (error) {
        console.error(error);
      }
    },
    async toggleEmail() {
      try {
        const valorEnvio = this.valorToggleEmail ? "T" : "F";
        await atualizarEmailLembrete(valorEnvio);
      } catch (error) {
        console.error(error);
      }
    },
    agendarExames() {
      this.$store.dispatch("removerTeleAtendimento").then(() => {
        this.$router.push("agendamento/exames");
      });
    },

    async fetchNovoEndpoint(questionario) {
      try {
        try {
          let response = await axios.post(
            `${this.$store.state.config.caminhoAnamnese}/DadosExamePaciente`,
            {
              modalidade: "",
              tipoFiltro: "codagendamento",
              valorFiltro: questionario.CODAGENDAMENTO,
              date: this.formatarData(questionario.DATA),
              request: "getExams",
              statusExame:
                questionario.STATUS === "OK" ? "agendados" : "confirmados"
            }
          );
          if (response.data.exams.length > 0) {
            questionario.btnAnamnese = true;
            questionario.idSurvey = response.data.exams[0].idAnamneses[0];
            questionario.patientName = response.data.exams[0].patientName;
            questionario.replied = response.data.exams[0].has_anamnese;
          } else {
            questionario.btnAnamnese = false;
          }
        } catch (error) {
          console.error("Erro ao buscar dados do novo endpoint", error);
        }
      } catch (error) {
        console.error("Erro geral ao buscar dados do novo endpoint", error);
      }
    },

    async navegarParaNovaPagina(codAgendamento, patientName, idSurvey) {
      // Abre a nova página com a URL obtida
      const user = this.$store.state.config.user;
      const pass = this.$store.state.config.pass;

      new Promise((resolve, reject) => {
        gerarTokenAnamnese(
          codAgendamento,
          resolve,
          reject,
          user,
          pass,
          idSurvey,
          patientName
        );
      })
        .then(res => {
          let token = res.data;
          let url = `${
            this.$store.state.config.caminhoAnamnese
          }/AnamnesePaciente?accessToken=${token}`;
          window.open(url);
        })
        .catch(err => {
          console.error(err);
        });
    },

    getAcronimo(str) {
      return str
        .split(" ")
        .map(palavra => palavra[0])
        .join("");
    },
    formatarData(data) {
      let partes = data.split("-");
      return `${partes[1]}/${partes[2]}/${partes[0]}`;
    },
    showQuestionarioError() {
      iziError("Esse questionário já foi respondido e se encontra finalizado.");
    }
  }
};
</script>

<style lang="stylus">
.modal-buttons
    margin: 0 auto !important
    max-width: 70% !important
    justify-content: space-around !important
.button-modal
    color: #fff !important
    border: none !important
    background-color: #0771bc !important
    border-radius: 3px !important
    transition: all .5s !important
    font-weight: bold !important
    font-size: 14px !important
    padding: 4px 20px !important

.button-modal:hover
  background-color: #0991f4 !important

.box
  max-width: 90% !important
  overflow-wrap: break-word

.itens
  margin-top: -12px
  left: -13px

.dialogPreparo
  .modal-message
    text-align left

@media (max-width: 576px)
  .tabsExames
    .q-icon.tab-left-icon
      top 30%
      left 5%
      font-size 1.2rem !important
  h6.dataCard
    text-align center

.tabsExames
  &&.q-tabs-inverted .q-tabs-head
    background none

  .q-tab-label-parent
    margin-left 24px

  .tab-left-icon
    position absolute
    top 25%
    left 5%

  .q-collapsible-sub-item
    background white

.btnResultado
  right 25px
  transform translateY(-50%)

.btnTeleAtendimento
  right 95px
  transform translateY(70%)

.link-button
  color: blue
  cursor: pointer

.divToggle
  display: flex

@media (max-width: 575px)
  .btnTeleAtendimento
      right: 6vw

@media (max-width: 460px)
  .row>.offset-1, .row>.offset-xs-1
    margin-left 0 !important

  .q-mt-sm
    justify-content center
</style>
