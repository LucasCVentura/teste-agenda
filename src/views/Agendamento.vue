<template>
  <q-layout view="lHh Lpr lFf" class="window-height block">
    <q-page-container class="page-flexbox">
      <medi-menu :config="'agendamento'" />
      <main class="flex-grow-1">
        <q-stepper
          @step="$router.replace(currentStep)"
          v-model="currentStep"
          ref="stepper"
          class="no-shadow full-width relative-position stepperConfig"
          color="azul1"
          contractable
          no-header-navigation
        >
          <!-- EXAMES -->
          <q-step default name="exames" :title="$t('agendamento.exames')">
            <medi-exames @button="buttonControl" />
          </q-step>
          <!-- UNIDADES -->
          <q-step name="unidades" :title="$t('agendamento.unidades')">
            <medi-unidades
              ref="unidades"
              @agendamentoConcluido="armazenarCodigos"
              @button="buttonControl"
            />
          </q-step>
          <!-- HORARIOS -->
          <q-step
            v-if="!teleAtendimento"
            name="horarios"
            :title="$t('agendamento.dataHorario')"
          >
            <medi-horarios
              ref="horarios"
              @button="buttonControl"
              @inicioAgendamento="retornarInicio"
              @agendamentoConcluido="armazenarCodigos"
            />
          </q-step>
        </q-stepper>
      </main>
      <footer class="q-mt-lg">
        <q-btn
          size="17px"
          class="text-azul1 bg-white no-shadow float-left"
          icon="fas fa-arrow-left"
          @click="prevStep"
          outline
          round
        />
        <q-btn
          :class="$q.screen.lt.md ? 'q-px-lg' : 'q-px-xl'"
          class="q-py-md bg-azul1 text-white float-right"
          :label="$t('agendamento.proximo')"
          icon-right="fas fa-arrow-right"
          :disabled="disabled"
          :loading="loading"
          @click="nextStep"
        />
      </footer>
      <!-- INICIO MODAL CONCLUSÃO -->
      <q-modal
        content-classes="bg-fundo"
        v-model="modalConclusao"
        no-esc-dismiss
        maximized
      >
        <q-modal-layout class="agenda-modal">
          <div class="page-flexbox">
            <header>
              <medi-menu :config="'agendamento'" />
            </header>
            <main class="flex-grow-1">
              <img
                class="q-mx-auto q-mb-lg assist-center"
                :src="caminhoAssistente"
                alt="Assistente"
              />
              <h4
                class="text-azul1 q-my-lg"
                v-html="
                  teleAtendimento
                    ? $t('agendamento.teleAgendamentoRealizado')
                    : $t('agendamento.agendamentoRealizado')
                "
              />
              <div
                v-if="$store.state.config.permitirUpload"
                :class="!$q.screen.gt.xs ? 'text-justify' : ''"
                class="q-px-md"
              >
                <h5
                  v-for="(item, i) in concluidoMsg"
                  v-show="item.visible"
                  :key="i"
                  :class="item.class"
                  v-html="item.message"
                />
              </div>
              <div
                v-if="!$store.state.config.permitirUpload"
                :class="!$q.screen.gt.xs ? 'text-justify' : ''"
                class="q-px-md"
              >
                <h5
                  v-for="(item, i) in concluidoMsg3"
                  v-show="item.visible"
                  :key="i"
                  :class="item.class"
                  v-html="item.message"
                />
              </div>
              <div
                v-if="$store.state.config.permitirUpload"
                class="row q-mb-md"
              >
                <q-list
                  separator
                  class="col-xs-12 col-sm-10 offset-sm-1 q-py-none"
                >
                  <q-item v-for="(item, i) in anexos" :key="i">
                    <q-item-main
                      :class="anexoCSS(item.error)"
                      :label="item.label"
                    />
                    <q-item-side right>
                      <q-btn
                        @click="tratarTipoAnexo(i)"
                        class="text-azul1 q-mr-xs anexo"
                        :size="!$q.screen.gt.sm ? 'sm' : 'md'"
                        :round="!$q.screen.gt.sm ? true : false"
                        :label="
                          item.fileName
                            ? item.fileName
                            : $t('agendamento.anexarDocumento')
                        "
                        icon="fas fa-paperclip"
                        no-wrap
                        no-caps
                      />
                      <q-btn
                        v-if="item.file"
                        @click="deleteFile(i)"
                        size="sm"
                        color="negative"
                        class="text-explicativo"
                        icon="fas fa-times"
                        round
                      />
                    </q-item-side>
                    <input
                      v-show="false"
                      type="file"
                      :ref="`inputFile${i}`"
                      @change="processFile($event, i)"
                    />
                  </q-item>
                </q-list>
              </div>
              <div
                v-if="$store.state.config.permitirUpload"
                :class="!$q.screen.gt.xs ? 'text-justify' : ''"
                class="q-px-md"
              >
                <h5
                  v-for="(item, i) in concluidoMsg2"
                  v-show="item.visible"
                  :key="i"
                  :class="item.class"
                  v-html="item.message"
                />
              </div>
            </main>
            <footer class="row q-mt-lg justify-between">
              <q-btn
                class="col-xs-8 col-sm-6 offset-sm-1 q-py-md bg-white text-azul1"
                v-if="!teleAtendimento"
                @click="marcarOutrosExames"
                :label="$t('agendamento.marcarOutrosExames')"
                icon="fas fa-arrow-left"
                no-caps
              />
              <q-btn
                class="col-xs-3 col-sm-2 offset-sm-2 offset-xs-1 q-py-md bg-azul1 text-white"
                v-if="!teleAtendimento"
                :label="$t('infoAdicional.continuar')"
                @click="finalizar"
                no-caps
              />
              <q-btn
                class="col-xs-3 col-sm-2 d-flex justify-center q-py-md bg-azul1 text-white"
                v-if="teleAtendimento"
                :label="$t('infoAdicional.continuar')"
                @click="finalizar"
                no-caps
              />
            </footer>
          </div>
          <q-inner-loading size="55px" color="azul1" :visible="loading" />
        </q-modal-layout>
      </q-modal>
      <!-- FIM MODAL CONCLUSÃO -->
      <!-- INICIO ANEXO DIALOG -->
      <q-dialog v-model="dialogTipoAnexo">
        <span slot="title" v-html="$t('agendamento.tipoAnexoTitulo')" />
        <span slot="message" v-text="$t('agendamento.tipoAnexoMsg')" />
        <template slot="buttons" slot-scope="props">
          <q-btn
            flat
            icon="fas fa-camera"
            :label="$t('agendamento.tirarFoto')"
            @click="selecionarOpcao(props.ok, 'foto')"
          />
          <q-btn
            flat
            icon="fas fa-folder"
            :label="$t('agendamento.galeria')"
            @click="selecionarOpcao(props.ok, 'anexo')"
          />
        </template>
      </q-dialog>
      <!-- FIM ANEXO DIALOG -->
    </q-page-container>
  </q-layout>
</template>

<script>
/* global Camera */
import exames from "@/components/agendamento/exames";
import unidades from "@/components/agendamento/unidades";
import horario from "@/components/agendamento/data_horario";
import menuOpcoes from "@/components/menuOpcoes";
import { anexarTodosDocumentos } from "@/services";
import { iziError } from "@/helpers/notifications";

export default {
  components: {
    "medi-menu": menuOpcoes,
    "medi-exames": exames,
    "medi-unidades": unidades,
    "medi-horarios": horario
  },
  beforeRouteLeave(to, from, next) {
    if (from.params.step === "horarios" && this.modalConclusao === false) {
      this.desbloquearHorarios();
    }
    this.$store.dispatch("limparAgendamento");
    next();
  },
  beforeRouteUpdate(to, from, next) {
    // Controle para não pular etapas do agendamento
    if (!this.stepControl) {
      this.stepControl = true;
      this.$refs.stepper.goToStep("exames");
      next("exames");
    } else {
      this.stepControl = false;
      next();
    }
  },
  data() {
    return {
      teleAtendimento: false,
      mobileAnexoCtrl: null,
      dialogTipoAnexo: false,
      anexos: [
        {
          label: this.$t("agendamento.anexoLabel1"),
          file: null,
          fileName: "",
          error: false,
          uploaded: false
        },
        {
          label: this.$t("agendamento.anexoLabel2"),
          file: null,
          fileName: "",
          error: false,
          uploaded: false
        },
        {
          label: this.$t("agendamento.anexoLabel3"),
          file: null,
          fileName: "",
          error: false,
          uploaded: false
        }
      ],
      loading: false,
      codigosAgendamento: [],
      modalConclusao: false,
      stepControl: false,
      currentStep: "",
      disabled: true,
      concluidoMsg: [
        {
          class: "text-cinza1 message-fix q-my-lg",
          message: this.$t("agendamento.concluidoMsg1"),
          visible: !this.$store.state.agendamento.teleAtendimento
        },
        {
          class: "text-negative message-fix q-my-lg",
          message: this.$t("agendamento.concluidoMsg2"),
          visible: !this.$store.state.agendamento.teleAtendimento
        },
        {
          class: "text-cinza1 message-fix text-weight-bold q-my-lg",
          message: this.$t("agendamento.concluidoMsg3"),
          visible: !this.$store.state.agendamento.teleAtendimento
        },
        {
          class: "text-cinza1 message-fix text-weight-bold q-my-lg",
          message: this.$t("agendamento.concluidoMsg5"),
          visible: this.$store.state.agendamento.teleAtendimento
        },
        {
          class: "text-cinza1 message-fix q-my-lg",
          message: this.$t("agendamento.concluidoMsg4"),
          visible: true
        }
      ],
      concluidoMsg2: [
        {
          class: "text-cinza1 message-fix text-weight-bold q-my-lg",
          message: this.$t("agendamento.concluidoMsg6"),
          visible: true
        }
      ],
      concluidoMsg3: [
        {
          class: "text-cinza1 message-fix q-my-lg",
          message: this.$t("agendamento.concluidoMsg1"),
          visible: !this.$store.state.agendamento.teleAtendimento
        },
        {
          class: "text-negative message-fix q-my-lg",
          message: this.$t("agendamento.concluidoMsg2"),
          visible: !this.$store.state.agendamento.teleAtendimento
        },
        {
          class: "text-cinza1 message-fix text-weight-bold q-my-lg",
          message: this.$t("agendamento.concluidoMsg3"),
          visible: !this.$store.state.agendamento.teleAtendimento
        },
        {
          class: "text-cinza1 message-fix text-weight-bold q-my-lg",
          message: this.$t("agendamento.concluidoMsg5"),
          visible: this.$store.state.agendamento.teleAtendimento
        },
        {
          class: "text-cinza1 message-fix text-weight-bold q-my-lg",
          message: this.$t("agendamento.concluidoMsg7"),
          visible: this.$store.state.agendamento.teleAtendimento
        }
      ]
    };
  },
  created() {
    this.teleAtendimento = this.$store.state.agendamento.teleAtendimento;
  },
  computed: {
    caminhoAssistente() {
      return this.$store.state.config.assistente;
    }
  },
  methods: {
    showConcluidoMsg() {
      return true;
    },
    desbloquearHorarios() {
      this.$refs.horarios.desbloquearHorarios();
    },
    async selecionarOpcao(okFunc, param) {
      await okFunc();
      if (param === "foto") {
        this.getImgCamera();
      } else {
        this.$refs[`inputFile${this.mobileAnexoCtrl}`][0].click();
      }
    },
    tratarTipoAnexo(index) {
      if (this.$q.platform.is.cordova) {
        this.mobileAnexoCtrl = index;
        this.dialogTipoAnexo = true;
      } else {
        this.$refs[`inputFile${index}`][0].click();
      }
    },
    // TODO: REFATORAR -> UTILS
    dataURItoBlob(imageData) {
      let dataURI = "data:image/jpeg;base64," + imageData;

      // Convert base64/URLEncoded data component to raw binary data held in a string
      let byteString;
      if (dataURI.split(",")[0].indexOf("base64") >= 0) {
        byteString = atob(dataURI.split(",")[1]);
      } else {
        byteString = unescape(dataURI.split(",")[1]);
      }

      // Separate out the mime component
      let mimeString = dataURI
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];

      // Write the bytes of the string to a typed array
      let ia = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], { type: mimeString });
    },
    getImgCamera() {
      let options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        correctOrientation: true // Corrects Android orientation quirks
        // allowEdit: true // Permite editar a imagem (corte, etc...)
      };
      navigator.camera.getPicture(
        imageData => {
          let blob = this.dataURItoBlob(imageData);
          let fileName = `camera${this.mobileAnexoCtrl}.jpg`;
          this.anexos[this.mobileAnexoCtrl].file = new File([blob], fileName, {
            type: "image/jpeg"
          });
          this.anexos[this.mobileAnexoCtrl].fileName = fileName;
        },
        message => {
          console.log(`Failed because: ${message}`);
        },
        options
      );
    },
    anexoCSS(uploadError) {
      let classes = "";
      this.$q.screen.lt.md
        ? (classes += "q-caption")
        : (classes += "q-subheading");
      !uploadError
        ? (classes += " text-cinza1")
        : (classes += " text-negative");
      return classes;
    },
    finalizar() {
      const anexoFormatados = this.anexos.map(anexo => {
        if (anexo.file && !anexo.uploaded) {
          return { arquivo: anexo.file, codigos: this.codigosAgendamento };
        }
        return null;
      });
      this.loading = true;
      new Promise((resolve, reject) => {
        anexarTodosDocumentos(anexoFormatados, resolve, reject);
      })
        .then(responses => {
          let controleAnexo = true;
          responses.map((response, index) => {
            if (!response) {
              controleAnexo = false;
              this.anexos[index].error = true;
            } else {
              this.anexos[index].error = false;
              this.anexos[index].uploaded = true;
            }
          });
          controleAnexo
            ? this.$router.push("/dashboard")
            : iziError(this.$t("erro.anexarDoc"));
        })
        .finally(() => {
          this.loading = false;
          if (this.teleAtendimento) {
            let codCrip = this.codigosAgendamento;
            let parametrosUrl = "codigoAgendamento=" + codCrip;
            let url = "salaEspera.html" + "?" + btoa(parametrosUrl);
            window.open(url, "_blank");
            window.location.href = "/#/dashboard";
          }
        });
    },
    armazenarCodigos(codigos) {
      // Armazena os códigos de agendamento dos exames para tratar os anexos
      this.codigosAgendamento = codigos;
      this.modalConclusao = true;
    },
    deleteFile(index) {
      this.anexos[index].file = null;
      this.anexos[index].fileName = "";
      this.$refs[`inputFile${index}`][0].value = "";
    },
    processFile(event, index) {
      const arquivo = event.target.files[0];
      if (arquivo) {
        let extension = arquivo.name.substring(
          arquivo.name.lastIndexOf(".") + 1
        );
        if (
          extension === "pdf" ||
          extension === "jpg" ||
          extension === "jpeg" ||
          extension === "png" ||
          extension === "docx"
        ) {
          this.anexos[index].file = arquivo;
          this.anexos[index].fileName = arquivo.name;
        } else {
          iziError(this.$t("agendamento.tipoArquivo"));
          event.target.value = "";
        }
      }
    },
    marcarOutrosExames() {
      this.$store.dispatch("limparAgendamento").then(() => {
        this.retornarInicio();
      });
    },
    retornarInicio() {
      this.stepControl = true;
      this.$refs.stepper.goToStep("exames");
    },
    buttonControl(response) {
      // Habilita o botão caso a etapa tenha sido concluída
      this.disabled = response;
    },
    prevStep() {
      if (this.currentStep === "exames") {
        this.$store.dispatch("controleInfoModal", true);
      } else {
        if (this.currentStep === "horarios")
          this.$refs.horarios.desbloquearHorarios();
        this.stepControl = true;
        this.$refs.stepper.previous();
      }
    },
    nextStep() {
      if (this.currentStep === "horarios" && !this.teleAtendimento) {
        this.$refs.horarios.agendar();
      } else if (this.currentStep === "unidades" && this.teleAtendimento) {
        this.$refs.unidades.agendarTeleConsulta();
      } else {
        this.stepControl = true;
        this.$refs.stepper.next();
      }
    }
  }
};
</script>

<style lang="stylus">

.message-fix
  line-height 1.5rem

.anexo
  .q-btn-inner
    div
      max-width 200px
      overflow hidden
      white-space nowrap
      text-overflow ellipsis

.stepperConfig
  .q-stepper-step-inner
    padding 12px 0 24px 0 !important
  .q-stepper-header
    -webkit-box-shadow none !important
    box-shadow none !important
    .q-stepper-first
      padding-left 0
    .q-stepper-last
      padding-right 0
    .q-stepper-tab
      padding 0 !important

@media (min-width: 576px)
  .row>.col-sm-2
    width: 200px !important;
    margin: 0 auto !important

@media (min-width: 0)
  .row>.col-3, .row>.col-xs-3
    margin: 0 auto !important;
    width: 200px !important;
</style>
