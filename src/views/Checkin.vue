<template>
 <!-- MODAL CONFS CONVENIO -->
  <div>
    <q-modal content-classes="bg-fundo" @show="carregarInformacoes" v-model="modalConvenio">
    <q-modal-layout class="agenda-modal">
      <div class="page-flexbox">
        <medi-menu :config="'servidor'" />
        <main class="flex-grow-1 q-mb-sm" @keyup.enter="enterEvent($event)">
          <div class="assist-left-container row">
            <div class="col-xs-12 col-sm-4 col-md-3 offset-md-1 offset-sm-0">
              <img class="assist-left" :src="caminhoAssistente" alt="Assistente" align="middle" style="display: none;">
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
              <q-item class="q-mt-sm cursor-pointer" tag="label"  style="display: none;">
                <q-item-main
                class="q-mr-md q-my-md text-cinza1"
                :label="$t('infoAdicional.possuiConvenio')"  style="display: none;"/>
                <q-item-side right>
                  <q-toggle
                  v-model="temConvenio"
                  @input="tratarConvenio"
                  checked-icon="check"
                  unchecked-icon="fas fa-times"
                  :disabled="true"
                  style="display: none;"
                  />
                </q-item-side>
              </q-item>
              <div v-if="temConvenio" class="q-mx-md">
                <q-select
                v-model="selectedConvenio"
                @input="buscarPlanosAndValidMatObriga"
                ref="selectConvenio"
                class="qSelect-fix q-mb-md"
                :float-label="$t('infoAdicional.convenio')"
                :options="convenios"
                popup-max-height="250px"
                filter
                :disabled="true"
                :readonly="true"
              />

              <q-select
                v-if="selectedConvenio"
                v-model="selectedPlano"
                class="qSelect-fix q-mb-md"
                :float-label="$t('infoAdicional.planos')"
                :options="planos"
                filter
                :disabled="true"
                :readonly="true"
              />

<q-input v-if="selectedConvenio && selectedPlano" v-model="matriculaConvenio" class="q-mb-md" :float-label="$t('infoAdicional.carteirinha')" maxlength="30" />
              </div>
            </q-list>
            <span class="col-xs-12 col-sm-10 offset-sm-1 text-left q-mt-lg q-pl-md text-cinza1" v-html="$t('infoAdicional.alturaPeso')" />
            <q-input class="col-xs-4 col-sm-3 offset-sm-2 offset-xs-1 q-px-md q-py-sm q-mt-md" placeholder="1,80" v-model="altura" v-mask="'#,##'" color="white" suffix="m" inverted inverted-light />
            <q-input class="col-xs-4 col-sm-3 offset-sm-2 offset-xs-2 q-px-md q-py-sm q-mt-md" placeholder="100" v-model="peso" v-mask="'###'" color="white" suffix="kg" inverted inverted-light />
          </div>
        </main>
        <footer class="q-mt-lg">
          <q-btn :class="$q.screen.lt.md ? 'q-px-lg' : 'q-px-xl'" class="q-py-md bg-azul1 text-white float-right" :label="$t('infoAdicional.continuar')" icon-right="fas fa-arrow-right" @click="adicionarInformacoes" ref="update" :loading="btnLoading" :disabled="disabled" />
        </footer>
      </div>
      <!-- MODAL CHECKIN -->
    </q-modal-layout>
  </q-modal>
    <q-modal
      content-classes="bg-fundo"
      v-model="modalConclusao"
      no-esc-dismiss
      maximized
    >
      <q-modal-layout class="agenda-modal">
        <div class="page-flexbox">
          <header>
            <medi-menu :config="'servidor'" />
          </header>
          <main class="flex-grow-1">
            <img
              class="q-mx-auto q-mb-lg assist-center"
              :src="caminhoAssistente"
              alt="Assistente"
              style="display: none;"
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
                        ref="acionarTratarTipoAnexo"
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
                        icon="fas fa-trash"
                        color="negative"
                        round
                      />
                    </q-item-side>
                    <input
                      v-show="false"
                      type="file"
                      accept="image/jpeg, image/png, application/pdf"
                      :ref="`inputFile-${j}-${i}`"
                      @change="processFile($event, j, i)"
                    />
                  </q-item>
                </q-list>
              </div>
            </div>
            <label
            class="text-cinza1 message-fix text-weight-bold q-my-lg"
            v-html="`${$t('checkin.checkinAnexarMaisArquivos')}`"></label>
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
          <footer class="row q-mt-md justify-around q-pa-xs">
  <q-btn
    class="col-12 col-sm-6 col-md-4 q-py-md bg-white text-azul1 q-mb-sm"
    v-if="!teleAtendimento"
    @click="voltarConvenio"
    :label="$t('infoAdicional.convenio')"
    icon="fas fa-arrow-left"
    no-caps
  />
  <q-btn
    class="col-12 col-sm-4 col-md-2 d-flex justify-center q-py-md bg-azul1 text-white"
    v-if="!teleAtendimento"
    icon="fas fa-arrow-right"
    :label="$t('infoAdicional.finalizar')"
    @click="finalizar"
    no-caps
  />
            <!--<q-btn
              class="col-xs-8 col-sm-6 offset-sm-1 q-py-md bg-white text-azul1"
              v-if="!teleAtendimento"
              @click="marcarOutrosExames"
              :label="$t('agendamento.irParaMeusExames')"
              icon="fas fa-arrow-left"
              no-caps
                <q-btn
              class="col-xs-3 col-sm-2 d-flex justify-center q-py-md bg-azul1 text-white"
              v-if="teleAtendimento"
              :label="$t('infoAdicional.continuar')"
              @click="finalizar"
              no-caps
            />
            /> -->
          </footer>
        </div>
        <q-inner-loading size="55px" color="azul1" :visible="loading" />
      </q-modal-layout>

    </q-modal>
  </div>

</template>


<script>
import { mask } from 'vue-the-mask'
import menuOpcoes from '@/components/menuOpcoes'
import { anexarTodosDocumentosCheckin, buscarTiposAnexos, buscarInfoClinica, buscarInfoPaciente,
   buscarConveniosCheckin, buscarPlanosDoConvenio, atualizarPaciente, matObrigaConv , finalizarCheckin} from '@/services'
import { iziError, iziSuccess } from '@/helpers/notifications'
import infoAdicional from '@/components/informacoesAdicionais'
import JwtToken from '@/services/jwt-token'

export default {
  directives: { mask },
  components: {
    'medi-menu': menuOpcoes,
    'medi-infoAdicional': infoAdicional
  },
  props: {
    codAgendamento: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      selectedOption: '',
      selectedObject: '',
      options: [],
      newAnexo: '',
      teleAtendimento: false,
      mobileAnexoCtrl: null,
      dialogTipoAnexo: false,
      subTituloCheckin: this.$t('agendamento.checkinMessage'),
      anexos: [
        {
          label: this.$t('agendamento.anexoLabel1'),
          category: 'Documentos',
          file: null,
          fileName: '',
          error: false,
          uploaded: false,
          adicionado: false
        },
        {
          label: this.$t('agendamento.anexoLabel2'),
          category: 'Carteirinha',
          file: null,
          fileName: '',
          error: false,
          uploaded: false,
          adicionado: false
        },
        {
          label: this.$t('agendamento.anexoLabel3'),
          category: 'Pedidos',
          file: null,
          fileName: '',
          error: false,
          uploaded: false,
          adicionado: false
        }
      ],
      loading: false,
      //codigosAgendamento: [],
      modalConclusao: false,
      modalConvenio: true,
      stepControl: false,
      currentStep: '',
      disabled: true,
      siteClinica: null,
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
      disabled: true,
      idPac: null,
      concluidoMsg: [
        {
          class: 'text-negative message-fix q-my-lg',
          message: this.$t('agendamento.checkinMessage'),//trocar para o subTituloCheckin
          visible: !this.$store.state.agendamento.teleAtendimento
        },
        {
          class: 'text-cinza1 message-fix text-weight-bold q-my-lg',
          message: this.$t('agendamento.checkinInstruction'),
          visible: !this.$store.state.agendamento.teleAtendimento
        },
        {
          class: 'text-cinza1 message-fix text-weight-bold q-my-lg',
          message: this.$t('agendamento.concluidoMsg5'),
          visible: this.$store.state.agendamento.teleAtendimento
        }
      ],
      concluidoMsg2: [
        {
          class: 'text-cinza1 message-fix text-weight-bold q-my-lg',
          message: this.$t('checkin.checkinFinalizar'),
          visible: true
        }
      ],
      concluidoMsg3: [
        {
          class: 'text-negative message-fix q-my-lg',
          message: this.$t('agendamento.concluidoMsg2'),
          visible: !this.$store.state.agendamento.teleAtendimento
        },
        {
          class: 'text-cinza1 message-fix text-weight-bold q-my-lg',
          message: this.$t('agendamento.checkinInstruction'),
          visible: !this.$store.state.agendamento.teleAtendimento
        },
        {
          class: 'text-cinza1 message-fix text-weight-bold q-my-lg',
          message: this.$t('agendamento.concluidoMsg5'),
          visible: this.$store.state.agendamento.teleAtendimento
        },
        {
          class: 'text-cinza1 message-fix text-weight-bold q-my-lg',
          message: this.$t('agendamento.concluidoMsg7'),
          visible: this.$store.state.agendamento.teleAtendimento
        }
      ]
    }
  },
  computed: {
    caminhoAssistente () {
      return this.$store.state.config.assistente
    },
    groupedAnexos () {
      const grouped = this.anexos.reduce((groups, item, index) => {
        const category = groups.find(group => group.category === item.category)

        if (category) {
          category.items.push({ ...item, index })
        } else {
          groups.push({
            category: item.category,
            items: [{ ...item, index }]
          })
        }

        return groups
      }, [])

      return grouped.map(group => group.items)
    },
    modalOpened () {
      //return this.$store.state.agendamento.infoModalAberto
    },
    formValidation () {
      return { altura: this.altura, peso: this.peso, usaMedicamento: this.usaMedicamento, desc_medicamentos: this.medicamentos, temConvenio: this.temConvenio, convenio: this.selectedConvenio, plano: this.selectedPlano, matricula: this.matriculaConvenio, cadastroSemNumCarteirinha: this.cadastroSemNumCarteirinha, matObriga: this.matObriga }
    },
    caminhoAssistente () {
      return this.$store.state.config.assistente
    }
  },
  methods: {
    goToSucess() {
      this.loading = true
      this.finalizarCheck();
      this.loading = false
      iziSuccess(this.$t('checkin.checkinSucesso'))
    },
    carregarTiposAnexos () {
      this.$q.loading.show({
        spinnerColor: 'primary',
        customClass: 'page-loading'
      })
      new Promise((resolve, reject) => {
        buscarTiposAnexos(resolve, reject)
      })
        .then(data => {
        // Matheus: Populando tipos anexos
          if (Array.isArray(data)) {
            this.options = data.map(item => ({
              label: item.TX_NOME,
              value: item.COD_TIPO
            }))
          }
        })
        .finally(() => {
          this.$q.loading.hide()
        })
    },
    anexoCSS (uploadError) {
      let classes = ''
      this.$q.screen.lt.md
        ? (classes += 'q-caption')
        : (classes += 'q-subheading')
      !uploadError
        ? (classes += ' text-cinza1')
        : (classes += ' text-negative')
      return classes
    },
    marcarOutrosExames () {
      this.$store.dispatch('limparAgendamento').then(() => {
        this.retornarInicio()
      })
    },
    voltarConvenio () {
      this.modalConclusao = false
      this.modalConvenio = true
      this.carregarInformacoes();
    },
    tratarTipoAnexo (sectionIndex, itemIndex) {
      const item = this.groupedAnexos[sectionIndex][itemIndex]
      if (this.$q.platform.is.cordova) {
        this.mobileAnexoCtrl = itemIndex
        this.dialogTipoAnexo = true
      } else {
        const inputFileRef = this.$refs[`inputFile-${sectionIndex}-${itemIndex}`]
        if (inputFileRef) {
          inputFileRef[0].click()
        } else {
          console.error(
            `Input file ref not found for sectionIndex ${sectionIndex} and itemIndex ${itemIndex}`
          )
        }
      }
    },
    addAnexo () {
      if (this.selectedOption) {
        const opcaoSelecionada = this.selectedOption
        // Matheus: adicionado o objeto selecionado para recuperação dos values do mesmo e utilização posterior
        const selectedObject = this.options.find(option => option.value === opcaoSelecionada)
        // Verifica se a categoria já existe em this.anexos
        const categoryExists = this.anexos.some(
          anexo => anexo.category === selectedObject.label
        )
        if (!categoryExists) {
          // Adiciona uma nova categoria em this.anexos
          const novoAnexo = {
            refNumber: this.anexos.length + 1,
            label: `Anexo - ${selectedObject.label}`,
            file: null,
            fileName: null,
            error: false,
            uploaded: false,
            adicionado: true,
            category: selectedObject.label
          };
          this.anexos.push(novoAnexo);
          console.log(novoAnexo);
          this.selectedOption = null
          const index = this.anexos.findIndex(anexo => anexo === novoAnexo);
         //const button = this.$refs.acionarTratarTipoAnexo[index].$el;
         this.$nextTick(() => {
          const button = this.$refs.acionarTratarTipoAnexo[index].$el;
          if (button) {
            console.log(button);
            // button.click(); // Descomente esta linha quando estiver pronto para clicar no botão
          } else {
            console.error('$el não está definido para o botão.');
          }
        });
         console.log(index)
          // console.log('Nova categoria adicionada em this.anexos:', opcaoSelecionada)
        } else {
          alert('Essa categoria já foi criada')
        }
        // Limpa a opção selecionada para permitir novas adições
        // console.log(this.anexos)
        //let lastSectionItem = this.anexos[this.anexos.length - 1]
        //console.log(lastSectionItem)
        // console.log(lastSectionItem)

         // Encontrar o índice do novo anexo em this.anexos

        /*if (lastSectionItem >= 0 && lastSectionItem < this.$refs.acionarTratarTipoAnexo.length) {
          const button = this.$refs.acionarTratarTipoAnexo[lastSectionItem].$el
          console.log(button)
        }*/
        // button.click();

      }
    },
    processFile (event, sectionIndex, itemIndex) {
      console.log(itemIndex)
      const arquivo = event.target.files[0]
      if (arquivo) {
        let extension = arquivo.name.substring(
          arquivo.name.lastIndexOf('.') + 1
        )

        if (
          extension === 'pdf' ||
          extension === 'jpg' ||
          extension === 'jpeg' ||
          extension === 'png' ||
          extension === 'docx'
        ) {
          const item = this.groupedAnexos[sectionIndex][itemIndex]
          console.log(item)
          if (item) {
            // Atualiza o arquivo e o nome do arquivo no item existente
            item.file = arquivo
            item.fileName = arquivo.name
            console.log(item.file, item.fileName)

            // Encontra o índice real no array original `anexos`
            const realIndex = item.index
            console.log(realIndex)
            // Atualiza o item no array original `anexos`
            this.$set(this.anexos, realIndex, {
              ...this.anexos[realIndex],
              file: arquivo,
              fileName: arquivo.name
            })

            // Adiciona um novo campo logo após o item atualizado
            this.anexos.splice(realIndex + 1, 0, {
              label: item.label,
              category: item.category,
              file: null,
              fileName: null,
              error: false,
              adicionado: false
            })
            //console.log(this.anexos)
          } else {
            console.error(
              `Item at section ${sectionIndex}, index ${itemIndex} does not exist`
            )
          }
        } else {
          iziError(this.$t('agendamento.tipoArquivo'))
          event.target.value = ''
        }
      }
    },
    deleteFile (sectionIndex, itemIndex) {
      const item = this.groupedAnexos[sectionIndex][itemIndex]
      console.log(item)

      if (item) {
        const realIndex = item.index
        // Atualiza o item no array original `anexos`
        this.$set(this.anexos, realIndex, {
          ...this.anexos[realIndex],
          file: null,
          fileName: ''
        })

        const inputFileRef = this.$refs[
          `inputFile-${sectionIndex}-${itemIndex}`
        ]
        if (inputFileRef && inputFileRef[0]) {
          inputFileRef[0].value = ''
        }

        // Verifica se há uma cópia do campo abaixo e a exclui também
        const nextItem = this.anexos[realIndex + 1]
        if (nextItem && nextItem.label === item.label) {
          this.anexos.splice(realIndex + 1, 1)
        }
      } else {
        console.error(
          `Item at section ${sectionIndex}, index ${itemIndex} does not exist`
        )
      }
    },
    finalizar () {
      const anexoFormatados = this.anexos
      .map(anexo => {
        if (anexo.file && !anexo.uploaded) {
          return { arquivo: anexo.file, codigos: [this.codAgendamento], categoria: anexo.category };
        }
      })
      .filter(anexo => anexo !== undefined); //Matheus: Remove os itens undefined
      this.loading = true
      new Promise((resolve, reject) => {
          anexarTodosDocumentosCheckin(anexoFormatados, resolve, reject)
      })
        .then(responses => {
          let controleAnexo = true
           responses.map((response, index) => {
            if (!response) {
              controleAnexo = false
              this.anexos[index].error = true
            } else {
              this.anexos[index].error = false
              this.anexos[index].uploaded = true
            }
          })
          controleAnexo
            ? this.goToSucess()
            : iziError(this.$t('erro.anexarDoc'))
        })
        .finally(() => {
          this.loading = false
          if (this.teleAtendimento) {
            let codCrip = this.codigosAgendamento
            let parametrosUrl = 'codigoAgendamento=' + codCrip
            let url = 'salaEspera.html' + '?' + btoa(parametrosUrl)
            window.open(url, '_blank')
            this.goToSucess()
          }
        })
    },
    finalizarCheck () {
      this.loading = true
      new Promise((resolve, reject) => {
        finalizarCheckin(this.idPac, this.codAgendamento, resolve, reject)
      })
        .then(() => {
          setTimeout(() => {
              if (this.siteClinica) {
                this.logout();
                window.location.href = this.siteClinica;
              } else {
                this.$router.push('/dashboard');
              }
            }, 2000); //2 segundos de espera
        })
        .finally(() => {
          this.loading = false
        })
    },
    logout () {
      JwtToken.logoutTk()
    },
    deleteNovoAnexo (sectionIndex) {
      if (sectionIndex >= 0 && sectionIndex < this.groupedAnexos.length) {
        const section = this.groupedAnexos[sectionIndex]

        if (section) {
          // Encontrar os índices dos itens correspondentes em this.anexos
          section.forEach(item => {
            const indexToDelete = this.anexos.findIndex(
              anexo =>
                anexo.category === item.category &&
            anexo.label === item.label //&&
            //anexo.fileName === item.fileName
            )

            if (indexToDelete !== -1) {
              // Remove o item do array this.anexos
              this.anexos.splice(indexToDelete, 1)
            } else {
              console.error('Item not found in this.anexos array.')
            }
          })

          // Matheus: Apaga toda a seção em groupedAnexos
          //this.groupedAnexos.splice(sectionIndex, 1)

          console.log('Section removed successfully.')
        } else {
          console.error(`Invalid section index ${sectionIndex}`)
        }
      } else {
        console.error(`Invalid section index ${sectionIndex}`)
      }
    },
    /*carregarInformacoes() {
      new Promise((resolve, reject) => {
        buscarInfoClinica(resolve, reject);
      })
        .then(data => {
          if (data.siteClinica) {
            this.siteClinica = data.siteClinica.startsWith('http://') || data.siteClinica.startsWith('https://')
              ? data.siteClinica
              : 'http://' + data.siteClinica;
          }
        });
    },*/
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
      //this.$refs.selectConvenio.hide()
      this.$q.loading.show({ spinnerColor: 'primary', customClass: 'page-loading' })
      new Promise((resolve, reject) => {
        buscarConveniosCheckin(this.codAgendamento, resolve, reject)
      }).then(data => {
        this.convenios = data.map(item => {
          let convenio = { 'value': item.ID_CONV, 'label': item.NM_CONV }
          return convenio
        })
        //this.$refs.selectConvenio.show()
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
      this.buscarConvenios()
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
        this.idPac = data.ID;
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
        }else if (data.PARTICULAR === 'T' && data.ID_PLANO !=='') {//Matheus: Caso o convenio seja particular com planos..
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
      new Promise((resolve, reject) => {
        buscarInfoClinica(resolve, reject);
      })
        .then(data => {
          if (data.siteClinica) {
            this.siteClinica = data.siteClinica.startsWith('http://') || data.siteClinica.startsWith('https://')
              ? data.siteClinica
              : 'http://' + data.siteClinica;
          }})
    },
    adicionarInformacoes () {
      // Estruturação das informações
      let informacoes = this.formValidation
      informacoes.deficiencia = this.deficiencia
      informacoes.origemReq = 'Checkin'
      delete informacoes['temConvenio']

      this.btnLoading = true
      new Promise((resolve, reject) => {
        atualizarPaciente(informacoes, resolve, reject)
      }).then(() => {
        this.$store.commit('SET_ID_CONVENIO', this.selectedConvenio)
        this.$store.dispatch('controleInfoModal', false)
        //this.$emit('modalClosed', true)
        this.modalConclusao = true
        this.modalConvenio = false
      }).finally(() => {
        this.btnLoading = false
      })
    }
  },
  mounted () {
    let modalContent = document.getElementsByClassName('q-modal-layout-content');
    modalContent[modalContent.length - 1].classList.remove('scroll')
    this.carregarTiposAnexos(),
    this.carregarInformacoes()
  },
  created() {
    this.informacoesComplementares = this.$store.state.config.informacoesComplementares
    this.cadastroSemNumCarteirinha = this.$store.state.config.cadastroSemNumCarteirinha
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

<style>
.tituloSection {
  font-family: "Roboto";
  font-weight: lighter;
  font-size: 21px;
}
</style>
