<template>
  <q-layout view="lHh Lpr lFf" class="window-height block">
    <q-page-container class="page-flexbox">
      <medi-menu :config="'dashboard'" />
      <div class="flex-grow-1">
        <div class="text-center">
          <h3
            class="text-h4 text-azul1"
            v-html="`${$t('dadosCadastrais.tituloConta')}`"
          ></h3>
          <div>
            <p
              class="t-modal"
              v-html="`${$t('dadosCadastrais.tituloPergunta')}`"
            ></p>
            <p
              class="p-modal"
              v-html="`${$t('dadosCadastrais.tituloResposta')}`"
            ></p>
            <p
              class="p-modal"
              v-html="`${$t('dadosCadastrais.tituloInformacao')}`"
            ></p>
          </div>
        </div>
        <section class="full-width">
          <div>
            <div class="row">
              <div class="col">
                <q-tabs v-model="tab" align="left" dense class="custom-tab">
                  <q-tab
                    name="dadosPessoais"
                    :label="$t('dadosCadastrais.tabGeral')"
                    class="text-azul1"
                    style="font-weight: bolder;"
                  ></q-tab>
                </q-tabs>
              </div>
              <div class="col">
                <!--aba "Contato" -->
                <q-tabs v-model="tab" align="left" dense class="custom-tab">
                  <q-tab
                    name="contato"
                    :label="$t('dadosCadastrais.tabContato')"
                    class="text-azul1"
                    style="font-weight: bolder;"
                  ></q-tab>
                </q-tabs>
              </div>
              <div class="col">
                <!-- "saude" -->
                <q-tabs v-model="tab" align="left" dense class="custom-tab">
                  <q-tab
                    name="saude"
                    :label="$t('dadosCadastrais.tabSaude')"
                    class="text-azul1"
                    style="font-weight: bolder;"
                  ></q-tab>
                </q-tabs>
              </div>
            </div>
            <div v-if="tab === 'dadosPessoais'">
              <div class="q-pa-md text-center">
                <div class="q-gutter-y-md">
                  <label
                    class="text-grey-8"
                    v-html="`${$t('dadosCadastrais.nomeConta')}`"
                  ></label>
                  <div
                    tabindex="-1"
                    class="q-if row no-wrap relative-position q-input q-if-standard text-primary"
                    outlined=""
                    bottom-slots=""
                    label="Nome"
                    counter=""
                    maxlength="12"
                  >
                    <div class="q-if-baseline">|</div>
                    <div class="q-if-inner col column q-popup--skip">
                      <div class="row no-wrap relative-position">
                        <i aria-hidden="true" class="q-icon material-icons"
                          >person</i
                        >
                        <input
                          v-model="nome"
                          outlined=""
                          bottom-slots=""
                          label="Nome"
                          counter=""
                          maxlength="100"
                          type="text"
                          step="any"
                          class="col q-input-target q-no-input-spinner ellipsis inputs"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="q-pa-md text-center">
                <div class="q-gutter-y-md">
                  <label
                    class="text-grey-8"
                    v-html="`${$t('dadosCadastrais.nomeSocial')}`"
                  ></label>
                  <div
                    tabindex="-1"
                    class="q-if row no-wrap relative-position q-input q-if-standard text-primary"
                    outlined=""
                    bottom-slots=""
                    label="Nome"
                    counter=""
                    maxlength="12"
                  >
                    <div class="q-if-baseline">|</div>
                    <div class="q-if-inner col column q-popup--skip">
                      <div class="row no-wrap relative-position">
                        <i aria-hidden="true" class="q-icon material-icons"
                          >person</i
                        >
                        <input
                          v-model="nome_social"
                          outlined=""
                          bottom-slots=""
                          label="nome_social"
                          counter=""
                          maxlength="12"
                          type="text"
                          step="any"
                          class="col q-input-target q-no-input-spinner ellipsis inputs"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="q-pa-md text-center">
                <div class="q-gutter-y-md">
                  <label class="text-grey-8">CPF:</label>
                  <div
                    tabindex="-1"
                    class="q-if row no-wrap relative-position q-input q-if-standard text-primary"
                    outlined=""
                    bottom-slots=""
                    label="cpf"
                    counter=""
                    maxlength="12"
                  >
                    <div class="q-if-baseline">|</div>
                    <div class="q-if-inner col column q-popup--skip">
                      <div class="row no-wrap relative-position">
                        <i aria-hidden="true" class="q-icon material-icons"
                          >money</i
                        >
                        <input
                          v-model="cpf"
                          outlined=""
                          bottom-slots=""
                          label="cpf"
                          counter=""
                          maxlength="12"
                          type="text"
                          step="any"
                          class="col q-input-target q-no-input-spinner ellipsis inputs"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="q-pa-md text-center">
                <div class="q-gutter-y-md">
                  <label
                    class="text-grey-8"
                    v-html="`${$t('dadosCadastrais.dataNascimentoPaciente')}`"
                  ></label>
                  <div
                    tabindex="-1"
                    class="q-if row no-wrap relative-position q-input q-if-standard text-primary"
                    outlined=""
                    bottom-slots=""
                    label="Data de Nascimento"
                    counter=""
                    maxlength="12"
                  >
                    <div class="q-if-baseline">|</div>
                    <div class="q-if-inner col column q-popup--skip">
                      <div class="row no-wrap relative-position">
                        <i aria-hidden="true" class="q-icon material-icons"
                          >event</i
                        >
                        <input
                          v-model="dataNascimento"
                          outlined=""
                          bottom-slots=""
                          label="Data de Nascimento"
                          counter=""
                          maxlength="12"
                          type="text"
                          step="any"
                          class="col q-input-target q-no-input-spinner ellipsis inputs"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="q-pa-md text-center">
                <div class="q-gutter-y-md">
                  <label
                    class="text-grey-8"
                    v-html="`${$t('dadosCadastrais.estadoCivil')}`"
                  ></label>
                  <div
                    tabindex="-1"
                    class="q-if row no-wrap relative-position q-input q-if-standard text-primary"
                    outlined=""
                    bottom-slots=""
                    label="estado_civil"
                    counter=""
                    maxlength="12"
                  >
                    <div class="q-if-baseline">|</div>
                    <div class="q-if-inner col column q-popup--skip">
                      <div class="row no-wrap relative-position">
                        <i aria-hidden="true" class="q-icon material-icons"
                          >people</i
                        >
                        <input
                          v-model="estado_civil"
                          outlined=""
                          bottom-slots=""
                          label="estado_civil"
                          counter=""
                          maxlength="12"
                          type="text"
                          step="any"
                          class="col q-input-target q-no-input-spinner ellipsis inputs"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="tab === 'contato'">
              <div class="q-pa-md text-center">
                <div class="q-gutter-y-md">
                  <label class="text-grey-8">Email:</label>
                  <div
                    tabindex="-1"
                    class="q-if row no-wrap relative-position q-input q-if-standard text-primary"
                    outlined=""
                    bottom-slots=""
                    label="email"
                    counter=""
                    maxlength="12"
                  >
                    <div class="q-if-baseline">|</div>
                    <div class="q-if-inner col column q-popup--skip">
                      <div class="row no-wrap relative-position">
                        <i aria-hidden="true" class="q-icon material-icons"
                          >language</i
                        >
                        <input
                          v-model="email"
                          outlined=""
                          bottom-slots=""
                          label="email"
                          counter=""
                          maxlength="12"
                          type="text"
                          step="any"
                          class="col q-input-target q-no-input-spinner ellipsis inputs"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="q-pa-md text-center">
                <div class="q-gutter-y-md">
                  <label
                    class="text-grey-8"
                    v-html="`${$t('dadosCadastrais.telefonePaciente')}`"
                  ></label>
                  <div
                    tabindex="-1"
                    class="q-if row no-wrap relative-position q-input q-if-standard text-primary"
                    outlined=""
                    bottom-slots=""
                    label="telefone"
                    counter=""
                    maxlength="12"
                  >
                    <div class="q-if-baseline">|</div>
                    <div class="q-if-inner col column q-popup--skip">
                      <div class="row no-wrap relative-position">
                        <i aria-hidden="true" class="q-icon material-icons"
                          >phone</i
                        >
                        <input
                          v-model="telefone"
                          outlined=""
                          bottom-slots=""
                          label="Telefone"
                          counter=""
                          maxlength="12"
                          type="text"
                          step="any"
                          class="col q-input-target q-no-input-spinner ellipsis inputs"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="q-pa-md text-center">
                <div class="q-gutter-y-md">
                  <label
                    class="text-grey-8"
                    v-html="`${$t('dadosCadastrais.enderecoPac')}`"
                  ></label>
                  <div
                    tabindex="-1"
                    class="q-if row no-wrap relative-position q-input q-if-standard text-primary"
                    outlined=""
                    bottom-slots=""
                    label="endereco"
                    counter=""
                    maxlength="12"
                  >
                    <div class="q-if-baseline">|</div>
                    <div class="q-if-inner col column q-popup--skip">
                      <div class="row no-wrap relative-position">
                        <i aria-hidden="true" class="q-icon material-icons"
                          >home</i
                        >
                        <input
                          v-model="endereco"
                          outlined=""
                          bottom-slots=""
                          label="endereco"
                          counter=""
                          maxlength="12"
                          type="text"
                          step="any"
                          class="col q-input-target q-no-input-spinner ellipsis inputs"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="q-pa-md text-center">
                <div class="q-gutter-y-md">
                  <label
                    class="text-grey-8"
                    v-html="`${$t('dadosCadastrais.enderecoNumero')}`"
                  ></label>
                  <div
                    tabindex="-1"
                    class="q-if row no-wrap relative-position q-input q-if-standard text-primary"
                    outlined=""
                    bottom-slots=""
                    label="enderecoNumero"
                    counter=""
                    maxlength="12"
                  >
                    <div class="q-if-baseline">|</div>
                    <div class="q-if-inner col column q-popup--skip">
                      <div class="row no-wrap relative-position">
                        <i aria-hidden="true" class="q-icon material-icons"
                          >money</i
                        >
                        <input
                          v-model="enderecoNumero"
                          outlined=""
                          bottom-slots=""
                          label="enderecoNumero"
                          counter=""
                          maxlength="12"
                          type="text"
                          step="any"
                          class="col q-input-target q-no-input-spinner ellipsis inputs"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="q-pa-md text-center">
                <div class="q-gutter-y-md">
                  <label
                    class="text-grey-8"
                    v-html="`${$t('dadosCadastrais.cidadePac')}`"
                  ></label>
                  <div
                    tabindex="-1"
                    class="q-if row no-wrap relative-position q-input q-if-standard text-primary"
                    outlined=""
                    bottom-slots=""
                    label="cidade"
                    counter=""
                    maxlength="12"
                  >
                    <div class="q-if-baseline">|</div>
                    <div class="q-if-inner col column q-popup--skip">
                      <div class="row no-wrap relative-position">
                        <i aria-hidden="true" class="q-icon material-icons"
                          >location_city</i
                        >
                        <input
                          v-model="cidade"
                          outlined=""
                          bottom-slots=""
                          label="cidade"
                          counter=""
                          maxlength="12"
                          type="text"
                          step="any"
                          class="col q-input-target q-no-input-spinner ellipsis inputs"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="q-pa-md text-center">
                <div class="q-gutter-y-md">
                  <label
                    class="text-grey-8"
                    v-html="`${$t('dadosCadastrais.ufPac')}`"
                  ></label>
                  <div
                    tabindex="-1"
                    class="q-if row no-wrap relative-position q-input q-if-standard text-primary"
                    outlined=""
                    bottom-slots=""
                    label="uf"
                    counter=""
                    maxlength="12"
                  >
                    <div class="q-if-baseline">|</div>
                    <div class="q-if-inner col column q-popup--skip">
                      <div class="row no-wrap relative-position">
                        <i aria-hidden="true" class="q-icon material-icons"
                          >home_work</i
                        >
                        <input
                          v-model="uf"
                          outlined=""
                          bottom-slots=""
                          label="uf"
                          counter=""
                          maxlength="12"
                          type="text"
                          step="any"
                          class="col q-input-target q-no-input-spinner ellipsis inputs"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="tab === 'saude'">
              <div class="q-pa-md text-center">
                <div class="q-gutter-y-md">
                  <label
                    class="text-grey-8"
                    v-html="`${$t('dadosCadastrais.pesoPaciente')}`"
                  ></label>
                  <div
                    tabindex="-1"
                    class="q-if row no-wrap relative-position q-input q-if-standard text-primary"
                    outlined=""
                    bottom-slots=""
                    label="peso"
                    counter=""
                    maxlength="12"
                  >
                    <div class="q-if-baseline">|</div>
                    <div class="q-if-inner col column q-popup--skip">
                      <div class="row no-wrap relative-position">
                        <i aria-hidden="true" class="q-icon material-icons"
                          >healing</i
                        >
                        <input
                          outlined=""
                          v-model="peso"
                          bottom-slots=""
                          label="peso"
                          counter=""
                          maxlength="12"
                          type="text"
                          step="any"
                          class="col q-input-target q-no-input-spinner ellipsis inputs"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="q-pa-md text-center">
                <div class="q-gutter-y-md">
                  <label
                    class="text-grey-8"
                    v-html="`${$t('dadosCadastrais.alturaPaciente')}`"
                  ></label>
                  <div
                    tabindex="-1"
                    class="q-if row no-wrap relative-position q-input q-if-standard text-primary"
                    outlined=""
                    bottom-slots=""
                    label="altura"
                    counter=""
                    maxlength="12"
                  >
                    <div class="q-if-baseline">|</div>
                    <div class="q-if-inner col column q-popup--skip">
                      <div class="row no-wrap relative-position">
                        <i aria-hidden="true" class="q-icon material-icons"
                          >healing</i
                        >
                        <input
                          outlined=""
                          v-model="altura"
                          bottom-slots=""
                          label="altura"
                          counter=""
                          maxlength="12"
                          type="text"
                          step="any"
                          class="col q-input-target q-no-input-spinner ellipsis inputs"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="q-pa-md text-center">
                <div class="q-gutter-y-md">
                  <label
                    class="text-grey-8"
                    v-html="`${$t('dadosCadastrais.sexoBiologico')}`"
                  ></label>
                  <div
                    tabindex="-1"
                    class="q-if row no-wrap relative-position q-input q-if-standard text-primary"
                    outlined=""
                    bottom-slots=""
                    label="sexo"
                    counter=""
                    maxlength="12"
                  >
                    <div class="q-if-baseline">|</div>
                    <div class="q-if-inner col column q-popup--skip">
                      <div class="row no-wrap relative-position">
                        <i aria-hidden="true" class="q-icon material-icons"
                          >assignment_ind</i
                        >
                        <input
                          v-model="sexo"
                          outlined=""
                          bottom-slots=""
                          label="sexo"
                          counter=""
                          maxlength="12"
                          type="text"
                          step="any"
                          class="col q-input-target q-no-input-spinner ellipsis inputs"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="row q-mt-lg justify-between">
          <q-btn
            class="col-xs-8 col-sm-6 offset-sm-1 q-py-md bg-white text-azul1"
            :label="$t('menuOpcoes.voltar')"
            icon="fas fa-arrow-left"
            @click="$router.push('/dashboard')"
            no-caps
          />
        </footer>
      </div>
    </q-page-container>
  </q-layout>
</template>
<script>
import menuOpcoes from "@/components/menuOpcoes";
import { buscarInfoPaciente } from "@/services";
import { i18n } from "@/plugins/vue-i18n";

export default {
  components: {
    "medi-menu": menuOpcoes
  },
  data() {
    return {
      nome: "",
      tab: "dadosPessoais",
      cpf: "",
      dataNascimento: null,
      peso: null,
      altura: null,
      email: null,
      telefone: null,
      nome_social: null,
      sexo: null,
      estado_civil: null,
      endereco: null,
      enderecoNumero: null,
      cidade: null,
      uf: null,
      modalVisible: false
    };
  },
  created() {
    this.carregarInformacoes();
  },
  methods: {
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

          if (data.NOME) {
            this.nome = data.NOME;
          }
          if (data.ALTURA) {
            this.altura = data.ALTURA.toString().replace(".", ",");
          }
          if (data.PESO) {
            this.peso = data.PESO;
          }
          if (data.CPF_PAC) {
            this.cpf = data.CPF_PAC;
          }
          if (data.DTNASC_PAC) {
            let partes = data.DTNASC_PAC.split("-");
            if (partes.length === 3) {
              let ano = partes[0];
              let mes = partes[1];
              let dia = partes[2];
              let dataFormatada = dia + "/" + mes + "/" + ano;
              this.dataNascimento = dataFormatada;
            }
          }
          if (data.EMAIL_PAC) {
            this.email = data.EMAIL_PAC;
          }
          if (data.TEL1_PAC) {
            this.telefone = data.TEL1_PAC;
          }
          if (data.NOME_SOCIAL) {
            this.nome_social = data.NOME_SOCIAL;
          }
          if (data.SEXO_PAC) {
            if (data.SEXO_PAC === "M") {
              this.sexo = this.$t("dadosCadastrais.pacMasculino");
            } else if (data.SEXO_PAC === "F") {
              this.sexo = this.$t("dadosCadastrais.pacFeminino");
            }
          }
          if (data.COD_ESTADO_CIVIL) {
            if (data.COD_ESTADO_CIVIL === 1) {
              this.estado_civil = this.$t("dadosCadastrais.casado");
            } else if (data.COD_ESTADO_CIVIL === 2) {
              this.estado_civil = this.$t("dadosCadastrais.solteiro");
            } else if (data.COD_ESTADO_CIVIL === 3) {
              this.estado_civil = this.$t("dadosCadastrais.divorciado");
            } else if (data.COD_ESTADO_CIVIL === 4) {
              this.estado_civil = this.$t("dadosCadastrais.viuvo");
            } else if (data.COD_ESTADO_CIVIL === 5) {
              this.estado_civil = this.$t("dadosCadastrais.uniaoEstavel");
            } else if (data.COD_ESTADO_CIVIL === 6) {
              this.estado_civil = this.$t("dadosCadastrais.outros");
            }
          }
          if (data.END_PAC) {
            this.endereco = data.END_PAC;
          }
          if (data.NUM_END_PAC) {
            this.enderecoNumero = data.NUM_END_PAC;
          }
          if (data.CID_PAC) {
            this.cidade = data.CID_PAC;
          }
          if (data.UF_PAC) {
            this.uf = data.UF_PAC;
          }
        })
        .finally(() => {
          this.$q.loading.hide();
        });
    },
    openModal() {
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
    }
  }
};
</script>

<style lang="stylus">
.inputs
    text-align: center
    font-weight: bold

.q-tabs-head
    display: none

.custom-tab .q-tab
    position: relative

.custom-tab .q-tab:before
    content: ""
    position: absolute
    z-index: 1
    left: 0
    right: 0
    bottom: 0
    height: 2px
    background-color: lightblue
    opacity: 1
    transition: opacity 0.3s

.custom-tab .q-tab:hover:before,
.custom-tab .q-tab--active:before
    opacity: 1

.p-modal
    position: relative
    bottom: 4vh

.t-modal
    position: relative
    bottom: 3vh
    font-weight: bold
</style>
