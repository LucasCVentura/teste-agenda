<template>
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
                : $t('agendamento.checkin')
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
          <div v-if="$store.state.config.permitirUpload" class="q-mb-md">
            <div v-for="(grupos, j) in groupedAnexos" :key="j">
              <label class="text-cinza1 message-fix text-weight-bold q-my-lg">{{
                grupos[0].category
              }}</label>
              <q-list
                separator
                class="col-xs-12 col-sm-10 offset-sm-1 q-py-none"
              >
                <q-item v-for="(item, i) in grupos" :key="i">
                  <q-item-main
                    :class="anexoCSS(item.error)"
                    :label="item.label"
                  />
                  <q-item-side right>
                    <q-btn
                      :ref="`acionarTratarTipoAnexo-${j}-${i}`"
                      @click="tratarTipoAnexo(j, i)"
                      class="text-azul1 q-mr-xs anexo"
                      :size="!$q.screen.gt.sm ? 'sm' : 'md'"
                      :round="!$q.screen.gt.sm"
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
                      @click="deleteFile(j, i)"
                      size="sm"
                      color="negative"
                      class="text-explicativo"
                      icon="fas fa-times"
                      round
                    />
                  </q-item-side>
                  <q-item-side right v-if="item.adicionado">
                    <q-btn
                      @click="deleteNovoAnexo(j, i)"
                      icon="fas fa-times"
                      color="negative"
                      round
                    />
                  </q-item-side>
                  <input
                    v-show="false"
                    type="file"
                    :ref="`inputFile-${j}-${i}`"
                    @change="processFile($event, j, i)"
                  />
                </q-item>
              </q-list>

              <!-- <q-item>
                <q-input
                  standout="bg-teal text-white"
                  type="text"
                  v-model="newAnexo"
                  @keyup.enter="addAnexo(category)"
                  placeholder="Nome do documento:"
                />
              </q-item> -->
            </div>
          </div>
          <label class="text-cinza1 message-fix text-weight-bold q-my-lg"
            >Selecione outro tipo de anexo</label
          >
          <q-select
            v-model="selectedOption"
            :options="options"
            @input="addAnexo"
          />
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
            :label="$t('agendamento.irParaMeusExames')"
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
</template>

<script>
// import exames from '@/components/agendamento/exames'
// import unidades from '@/components/agendamento/unidades'
// import horario from '@/components/agendamento/data_horario'
import menuOpcoes from "@/components/menuOpcoes";
import { anexarTodosDocumentos } from "@/services";
import { iziError } from "@/helpers/notifications";

export default {
  components: {
    "medi-menu": menuOpcoes
  },
  data() {
    return {
      selectedOption: null,
      options: [
        { label: "Outros", value: "Outros" },
        { label: "Opa", value: "Opa" }
      ],
      newAnexo: "",
      teleAtendimento: false,
      mobileAnexoCtrl: null,
      dialogTipoAnexo: false,
      anexos: [
        {
          label: this.$t("agendamento.anexoLabel1"),
          category: "Documentos",
          file: null,
          fileName: "",
          error: false,
          uploaded: false,
          adicionado: false
        },
        {
          label: this.$t("agendamento.anexoLabel2"),
          category: "Carteirinha",
          file: null,
          fileName: "",
          error: false,
          uploaded: false,
          adicionado: false
        },
        {
          label: this.$t("agendamento.anexoLabel3"),
          category: "Pedidos",
          file: null,
          fileName: "",
          error: false,
          uploaded: false,
          adicionado: false
        }
      ],
      loading: false,
      codigosAgendamento: [],
      modalConclusao: true,
      stepControl: false,
      currentStep: "",
      disabled: true,
      concluidoMsg: [
        // {
        //   class: "text-cinza1 message-fix q-my-lg",
        //   message: this.$t("agendamento.concluidoMsg1"),
        //   visible: !this.$store.state.agendamento.teleAtendimento
        // },
        {
          class: "text-negative message-fix q-my-lg",
          message: this.$t("agendamento.checkinMessage"),
          visible: !this.$store.state.agendamento.teleAtendimento
        },
        {
          class: "text-cinza1 message-fix text-weight-bold q-my-lg",
          message: this.$t("agendamento.checkinInstruction"),
          visible: !this.$store.state.agendamento.teleAtendimento
        },
        {
          class: "text-cinza1 message-fix text-weight-bold q-my-lg",
          message: this.$t("agendamento.concluidoMsg5"),
          visible: this.$store.state.agendamento.teleAtendimento
        }
        // {
        //   class: "text-cinza1 message-fix q-my-lg",
        //   message: this.$t("agendamento.concluidoMsg4"),
        //   visible: true
        // }
      ],
      concluidoMsg2: [
        {
          class: "text-cinza1 message-fix text-weight-bold q-my-lg",
          message: this.$t("agendamento.checkinFinal"),
          visible: true
        }
      ],
      concluidoMsg3: [
        // {
        //   class: "text-cinza1 message-fix q-my-lg",
        //   message: this.$t("agendamento.concluidoMsg1"),
        //   visible: !this.$store.state.agendamento.teleAtendimento
        // },
        {
          class: "text-negative message-fix q-my-lg",
          message: this.$t("agendamento.concluidoMsg2"),
          visible: !this.$store.state.agendamento.teleAtendimento
        },
        {
          class: "text-cinza1 message-fix text-weight-bold q-my-lg",
          message: this.$t("agendamento.checkinInstruction"),
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
  computed: {
    caminhoAssistente() {
      return this.$store.state.config.assistente;
    },
    groupedAnexos() {
      const grouped = this.anexos.reduce((groups, item, index) => {
        const category = groups.find(group => group.category === item.category);

        if (category) {
          category.items.push({ ...item, index });
        } else {
          groups.push({
            category: item.category,
            items: [{ ...item, index }]
          });
        }

        return groups;
      }, []);

      return grouped.map(group => group.items);
    }
  },

  methods: {
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

    marcarOutrosExames() {
      this.$store.dispatch("limparAgendamento").then(() => {
        this.retornarInicio();
      });
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
    tratarTipoAnexo(sectionIndex, itemIndex) {
      const item = this.groupedAnexos[sectionIndex][itemIndex];
      if (this.$q.platform.is.cordova) {
        this.mobileAnexoCtrl = itemIndex;
        this.dialogTipoAnexo = true;
      } else {
        const inputFileRef = this.$refs[
          `inputFile-${sectionIndex}-${itemIndex}`
        ];
        if (inputFileRef) {
          inputFileRef[0].click();
        } else {
          console.error(
            `Input file ref not found for sectionIndex ${sectionIndex} and itemIndex ${itemIndex}`
          );
        }
      }
    },

    addAnexo() {
      if (this.selectedOption && this.selectedOption.trim() !== "") {
        const opcaoSelecionada = this.selectedOption.trim();

        // Verifica se a categoria já existe em this.anexos
        const categoryExists = this.anexos.some(
          anexo => anexo.category === opcaoSelecionada
        );

        if (!categoryExists) {
          // Adiciona uma nova categoria em this.anexos
          this.anexos.push({
            label: "Anexo:",
            file: null,
            fileName: null,
            error: false,
            uploaded: false,
            adicionado: true,
            category: opcaoSelecionada
          });

          // Após adicionar, obter o índice da última categoria adicionada
          const sectionIndex = this.groupedAnexos.length - 1;
          const itemIndex = this.groupedAnexos[sectionIndex].length - 1;

          // Utiliza $nextTick para garantir que o DOM foi atualizado
          this.$nextTick(() => {
            const refKey = `acionarTratarTipoAnexo-${sectionIndex}-${itemIndex}`;
            const buttonRef = this.$refs[refKey][0];
            if (buttonRef) {
              buttonRef.$el.click(); // Simula o clique no botão
            }
          });

          console.log(
            "Nova categoria adicionada em this.anexos:",
            opcaoSelecionada
          );
        } else {
          alert("Essa categoria já foi criada");
        }

        // Limpa a opção selecionada para permitir novas adições
        this.selectedOption = null;
      }
    },

    processFile(event, sectionIndex, itemIndex) {
      console.log(itemIndex);
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
          const item = this.groupedAnexos[sectionIndex][itemIndex];
          console.log(item);
          if (item) {
            // Atualiza o arquivo e o nome do arquivo no item existente
            item.file = arquivo;
            item.fileName = arquivo.name;
            console.log(item.file, item.fileName);

            // Encontra o índice real no array original `anexos`
            const realIndex = item.index;
            console.log(realIndex);
            // Atualiza o item no array original `anexos`
            this.$set(this.anexos, realIndex, {
              ...this.anexos[realIndex],
              file: arquivo,
              fileName: arquivo.name
            });

            // Adiciona um novo campo logo após o item atualizado
            this.anexos.splice(realIndex + 1, 0, {
              label: item.label,
              category: item.category,
              file: null,
              fileName: null,
              error: false,
              adicionado: false
            });

            console.log(this.anexos);
          } else {
            console.error(
              `Item at section ${sectionIndex}, index ${itemIndex} does not exist`
            );
          }
        } else {
          iziError(this.$t("agendamento.tipoArquivo"));
          event.target.value = "";
        }
      }
    },
    deleteFile(sectionIndex, itemIndex) {
      const item = this.groupedAnexos[sectionIndex][itemIndex];
      console.log(item);

      if (item) {
        const realIndex = item.index;
        // Atualiza o item no array original `anexos`
        this.$set(this.anexos, realIndex, {
          ...this.anexos[realIndex],
          file: null,
          fileName: ""
        });

        const inputFileRef = this.$refs[
          `inputFile-${sectionIndex}-${itemIndex}`
        ];
        if (inputFileRef && inputFileRef[0]) {
          inputFileRef[0].value = "";
        }

        // Verifica se há uma cópia do campo abaixo e a exclui também
        const nextItem = this.anexos[realIndex + 1];
        if (nextItem && nextItem.label === item.label) {
          this.anexos.splice(realIndex + 1, 1);
        }
      } else {
        console.error(
          `Item at section ${sectionIndex}, index ${itemIndex} does not exist`
        );
      }
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
    deleteNovoAnexo(sectionIndex, itemIndex) {
      if (sectionIndex >= 0 && sectionIndex < this.groupedAnexos.length) {
        // Verifica se o índice da seção é válido
        const section = this.groupedAnexos[sectionIndex];

        if (section && itemIndex >= 0 && itemIndex < section.length) {
          // Verifica se o índice do item é válido dentro da seção
          const item = section[itemIndex];

          if (item && item.adicionado) {
            // Encontrar o índice do item correspondente em this.anexos
            let indexToDelete = this.anexos.findIndex(
              anexo =>
                anexo.category === item.category &&
                anexo.label === item.label &&
                anexo.fileName === item.fileName
            );

            if (indexToDelete !== -1) {
              // Remove o item do array this.anexos
              this.anexos.splice(indexToDelete, 1);
              console.log("Item removed successfully.");
            } else {
              console.error("Item not found in this.anexos array.");
            }
          } else {
            console.error(
              `Item at section ${sectionIndex}, index ${itemIndex} cannot be deleted as it was not added or does not exist`
            );
          }
        } else {
          console.error(
            `Invalid item index at section ${sectionIndex}, index ${itemIndex}`
          );
        }
      } else {
        console.error(`Invalid section index ${sectionIndex}`);
      }
    }
  }
};
</script>

<style>
.tituloSection {
  font-family: "Roboto";
  font-weight: lighter;
  font-size: 21px;
}
</style>
