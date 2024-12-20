import * as api from "./chamadas/semToken";
import * as apiToken from "./chamadas/comToken";
import router from "@/router";
import { LocalStorage } from "quasar";
import { i18n } from "@/plugins/vue-i18n";
import { iziError, iziSuccess, iziWarning } from "@/helpers/notifications";

// Função para mensagem de erros
function checkError(error, msg) {
  console.log("CheckError:" + error);
  //Matheus/Gabriel: Quando não há resposta do servidor (Evitando loops em algumas views)
  if (!error.response) {
    LocalStorage.remove("mediAgendaToken");
    iziError(i18n.t("erro.token"));
    router.push("/login");
  } else if (error.response.status === 500 || error.response.status === 401) {
    LocalStorage.remove("mediAgendaToken");
    iziError(i18n.t("erro.token"));
    router.push("/login");
  } else {
    iziError(msg);
  }
}

// Função para mensagem de erros
function checkWarning(error, msg) {
  console.log("CheckError:" + error);
  if (
    (!error.response && error.response.status === 500) ||
    error.response.status === 401
  ) {
    LocalStorage.remove("mediAgendaToken");
    iziWarning(i18n.t("erro.token"));
    router.push("/login");
  } else {
    iziWarning(msg);
  }
}

// REQUISIÇÕES SEM TOKEN

export function buscarUsuario(login, param, resolve, reject) {
  api
    .buscarUsuario(login, param)
    .then(response => {
      resolve(response);
    })
    .catch(error => {
      let response = error.response;
      if (!response) {
        console.log(error);
        iziError(i18n.t("erro.servidor"));
        reject();
      }

      if (response.status === 401) {
        reject(response.status);
      } else if (response.status === 503) {
        iziError(response.data);
        reject();
      } else {
        iziError(i18n.t("erro.buscarUsuario"));
        reject();
      }
    });
}

export function cadastrarUsuario(user, resolve, reject) {
  api
    .cadastrarUsuario(user)
    .then(() => {
      resolve();
    })
    .catch(error => {
      checkError(error, i18n.t("erro.cadastrarUsuario"));
      reject();
    });
}

export function verificarCodigo(login, codigo, resolve, reject) {
  api
    .verificarCodigo(login, codigo)
    .then(() => {
      resolve();
    })
    .catch(error => {
      let response = error.response;
      if (!response) {
        console.log(error);
        iziError(i18n.t("erro.servidor"));
        reject();
      }

      if (response.status === 401) {
        iziError(response.data);
      } else {
        iziError(i18n.t("erro.confirmacaoCod"));
      }
      reject();
    });
}

export function reenviarCodigo(cpf, email, resolve, reject) {
  api
    .reenviarCodigo(cpf, email)
    .then(() => {
      iziSuccess(i18n.t("confirmacao.codigoReenviado"));
      resolve();
    })
    .catch(error => {
      let response = error.response;
      if (!response) {
        console.log(error);
        iziError(i18n.t("erro.servidor"));
        reject();
      }

      if (response.status === 401) {
        iziError(response.data);
      } else {
        iziError(i18n.t("erro.confirmacaoCod"));
      }
      reject();
    });
}

export function autenticarMidiaSocial(
  email,
  userID,
  token,
  midia,
  resolve,
  reject
) {
  api
    .autenticarMidiaSocial(email, userID, token, midia)
    .then(response => {
      resolve(response);
    })
    .catch(error => {
      let response = error.response;
      if (!response) {
        console.log(error);
        iziError(i18n.t("erro.servidor"));
        reject();
      }

      if (response.status === 401 || response.status === 500) {
        iziError(response.data);
      } else {
        iziError(`${i18n.t("erro.autenticacaoMidia")} ${midia}`);
      }
      reject();
    });
}

export function atualizarEmail(oldEmail, newEmail, cpf, resolve, reject) {
  api
    .atualizarEmail(oldEmail, newEmail, cpf)
    .then(() => {
      resolve();
    })
    .catch(error => {
      checkError(error, i18n.t("erro.atualizarEmail"));
      reject();
    });
}

export function recuperarSenha(emailOrCpf, tipoRecuperacao, resolve, reject) {
  console.log(emailOrCpf, tipoRecuperacao)
  api
    .recuperarSenha(emailOrCpf, tipoRecuperacao)
    .then(() => {
      resolve();
    })
    .catch(error => {
      let response = error.response;
      if (!response) {
        console.log(error);
        iziError(i18n.t("erro.servidor"));
        reject();
      }

      if (response.status === 401) {
        iziError(response.data);
      } else {
        iziError(i18n.t("erro.recuperarSenha"));
      }
      reject();
    });
}

export function getPacienteInfo(emailOrCpf, data, resolve, reject) {
  console.log(emailOrCpf, data)
  api
    .getPacienteInfo(emailOrCpf, data)
    .then((response) => {
      console.log(response)
      resolve(response.data);
    })
    .catch(error => {
      let response = error.response;
      if (!response) {
        console.log(error);
        iziError(i18n.t("erro.servidor"));
        reject();
      }

      if (response.status === 401) {
        iziError(response.data);
      } else {
        iziError(i18n.t("erro.recuperarSenha"));
      }
      reject();
    });
}

export function getEmailPac(emailOrCpf, data, resolve, reject) {
  console.log(emailOrCpf, data)
  api
    .getEmailPac(emailOrCpf, data)
    .then((response) => {
      console.log(response)
      resolve(response.data);
    })
    .catch(error => {
      let response = error.response;
      if (!response) {
        console.log(error);
        iziError(i18n.t("erro.servidor"));
        reject();
      }

      if (response.status === 401) {
        iziError(response.data);
      } else {
        iziError(i18n.t("erro.recuperarSenha"));
      }
      reject();
    });
}





// REQUISIÇÕES COM TOKEN

export function buscarConvenios(resolve, reject) {
  apiToken
    .buscarConvenios()
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      checkError(error, i18n.t("erro.buscarConvenio"));
      reject();
    });
}

export function buscarPlanosDoConvenio(idConvenio, resolve, reject) {
  apiToken
    .buscarPlanosDoConvenio(idConvenio)
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      checkError(error, i18n.t("erro.buscarPlano"));
      reject();
    });
}

export function matObrigaConv(idConvenio, resolve, reject) {
  apiToken
    .matObrigaConv(idConvenio)
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      checkError(error, i18n.t("erro.buscarPlano"));
      reject();
    });
}

export function atualizarPaciente(informacoes, resolve, reject) {
  apiToken
    .atualizarPaciente(informacoes)
    .then(() => {
      resolve();
    })
    .catch(error => {
      checkWarning(error, i18n.t("erro.matriculaAlert"));
      reject();
    });
}

export function atualizarSMS(informacoes, resolve, reject) {
  apiToken
    .atualizarSMS(informacoes)
    .then(() => {
      iziSuccess(i18n.t("cadastro.sucesso"));
      resolve();
    })
    .catch(error => {
      checkWarning(error, i18n.t("erro.servidor"));
      reject();
    });
}

export function atualizarEmailLembrete(informacoes, resolve, reject) {
  apiToken
    .atualizarEmailLembrete(informacoes)
    .then(() => {
      iziSuccess(i18n.t("cadastro.sucesso"));
      resolve();
    })
    .catch(error => {
      checkWarning(error, i18n.t("erro.servidor"));
      reject();
    });
}

export function buscarExames(resolve, reject) {
  apiToken
    .buscarTodosExames()
    .then(
      ([
        examesMarcadosResponse,
        examesPendentesResponse,
        resultadosPendentes
      ]) => {
        let exames = {
          nomeUsuario: examesMarcadosResponse.data[0],
          marcados: examesMarcadosResponse.data[1],
          pendentes: examesPendentesResponse.data,
          resultadosPendentes: resultadosPendentes.data
        };
        resolve(exames);
      }
    )
    .catch(error => {
      checkError(error, i18n.t("erro.buscarExame"));
      reject();
    });
}

export function salvarRespostas(
  idPac,
  perguntas,
  respostas,
  observacoes,
  resolve,
  reject
) {
  apiToken
    .salvarRespostas(idPac, perguntas, respostas, observacoes)
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      checkError(error, "Erro ao salvar as respostas");
      reject();
    });
}

export function getPerguntasByServico(idService, resolve, reject) {
  apiToken
    .getPerguntasByServico(idService)
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      checkError(error, "Erro ao buscar as perguntas");
      reject();
    });
}

export function buscarUltimaResposta(
  idPac,
  idQuestionarioAgendamento,
  resolve,
  reject
) {
  apiToken
    .buscarUltimaResposta(idPac, idQuestionarioAgendamento)
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      checkError(error, "Erro ao buscar as respostas");
      reject();
    });
}

export function buscarServicos(
  idConvenio,
  filtro,
  examesSelecionados,
  flTeleConsulta,
  resolve,
  reject
) {
  apiToken
    .buscarServicos(idConvenio, filtro, examesSelecionados, flTeleConsulta)
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      checkError(error, i18n.t("erro.buscarServico"));
      reject();
    });
}

export function buscarClinicas(
  servicos,
  filtro,
  flTeleConsulta,
  resolve,
  reject
) {
  apiToken
    .buscarClinicas(servicos, filtro, flTeleConsulta)
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      checkError(error, i18n.t("erro.buscarClinicaUni"));
      reject();
    });
}

export function buscarClinicasGeolocalizacao(
  servicos,
  coordenadas,
  filtro,
  flTeleConsulta,
  resolve,
  reject
) {
  apiToken
    .buscarClinicasGeolocalizacao(servicos, coordenadas, filtro, flTeleConsulta)
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      checkError(error, i18n.t("erro.buscarClinicaLocal"));
      reject();
    });
}

export function buscarDatas(idServico, cnpj, resolve, reject) {
  apiToken
    .buscarDatas(idServico, cnpj)
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      checkError(error, i18n.t("erro.buscarData"));
      reject();
    });
}

export function buscarHorarios(idServico, cnpj, data, resolve, reject) {
  apiToken
    .buscarHorarios(idServico, cnpj, data)
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      checkError(error, i18n.t("erro.buscarHorario"));
      reject();
    });
}

export function agendarExame(
  data,
  hora,
  idEquip,
  idServico,
  cnpj,
  cobertura,
  idpac,
  respostas,
  resolve,
  reject
) {
  apiToken
    .agendarExame(
      data,
      hora,
      idEquip,
      idServico,
      cnpj,
      cobertura,
      idpac,
      respostas
    )
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      checkError(error, i18n.t("erro.agendarExame"));
      reject();
    });
}
export function agendarTeleAtendimento(
  idEquip,
  idServico,
  cobertura,
  resolve,
  reject
) {
  apiToken
    .agendarTeleAtendimento(idEquip, idServico, cobertura)
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      checkError(error, i18n.t("erro.agendarExame"));
      reject();
    });
}

export function desmarcarExame(
  data,
  hora,
  idEquip,
  codAgendamento,
  resolve,
  reject
) {
  apiToken
    .desmarcarExame(data, hora, idEquip, codAgendamento)
    .then(() => {
      resolve();
    })
    .catch(error => {
      let response = error.response;
      if (!response) {
        console.log(error);
        iziError(i18n.t("erro.servidor"));
        reject();
      }
      if (response.status === 401) {
        iziError(response.data);
      } else {
        iziError(i18n.t("erro.desmarcarExame"));
      }
      reject();
    });
}

export function cancelarTeleAtendimentoNaoConfirmado(
  codigoAgendamento,
  data,
  hora,
  equip,
  resolve,
  reject
) {
  apiToken
    .cancelarTeleAtendimentoNaoConfirmado(codigoAgendamento, data, hora, equip)
    .then(() => {
      resolve();
    })
    .catch(error => {
      let response = error.response;
      if (!response) {
        console.log(error);
        iziError(i18n.t("erro.servidor"));
        reject();
      }
      if (response.status === 401) {
        iziError(response.data);
      } else {
        iziError(i18n.t("erro.desmarcarExame"));
      }
      reject();
    });
}

export function buscarInfoPaciente(resolve, reject) {
  apiToken
    .buscarInfoPaciente()
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      checkError(error, i18n.t("erro.buscarInfoPac"));
      reject();
    });
}

export function anexarTodosDocumentos(anexos, resolve, reject) {
  apiToken
    .anexarTodosDocumentos(anexos)
    .then(([responseAnexo1, responseAnexo2, responseAnexo3]) => {
      resolve([responseAnexo1, responseAnexo2, responseAnexo3]);
    })
    .catch(error => {
      checkError(error, i18n.t("erro.anexarDoc"));
      reject();
    });
}

export function bloquearHorario(
  { data, horario, idEquip, exame },
  resolve,
  reject
) {
  apiToken
    .bloquearHorario(data, horario, idEquip, exame)
    .then(() => {
      resolve();
    })
    .catch(err => {
      console.log(err);
      reject();
    });
}

export function permitirAgendamento(
  idServico,
  idConvenio,
  data,
  idPac,
  datasMarcacao,
  idsServ,
  horasMarcacao,
  idsEquip,
  resolve,
  reject
) {
  apiToken
    .permitirAgendamento(
      idServico,
      idConvenio,
      data,
      idPac,
      datasMarcacao,
      idsServ,
      horasMarcacao,
      idsEquip
    )
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      console.log(err);
      reject(err);
    });
}

export function desbloquearHorarios(desbloqueioArray, resolve, reject) {
  apiToken
    .desbloquearHorarios(desbloqueioArray)
    .then(() => {
      resolve();
    })
    .catch(err => {
      console.log(err);
      reject();
    });
}

export const gerarTokenAnamnese = (
  codAgendamento,
  resolve,
  reject,
  user,
  pass,
  patientName,
  idSurvey
) => {
  apiToken
    .gerarTokenAnamnese(codAgendamento, user, pass, idSurvey, patientName)
    .then(res => {
      resolve(res);
    })
    .catch(error => {
      console.log(error);
      reject();
    });
};

//Matheus - 16-07-24
export function buscarConveniosCheckin(codAgendamento, resolve, reject) {
  apiToken
    .buscarConveniosCheckin(codAgendamento)
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      checkError(error, i18n.t("erro.buscarConvenio"));
      reject();
    });
}

export function buscarInfoClinica(resolve, reject) {
  apiToken
    .buscarInfoClinica()
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      checkError(error, i18n.t("erro.servidor"));
      reject();
    });
}
//Matheus - 16-07-24
export function buscarTiposAnexos(resolve, reject) {
  apiToken
    .buscarTiposAnexos()
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      checkError(error, i18n.t("erro.servidor"));
      reject();
    });
}

//Matheus - 16-07-24
/*export function anexarTodosDocumentosCheckin(anexos, resolve, reject) {
  apiToken
    .anexarTodosDocumentosCheckin(anexos)
    .then(([responseAnexo1, responseAnexo2, responseAnexo3]) => {
      resolve([responseAnexo1, responseAnexo2, responseAnexo3]);
    })
    .catch(error => {
      checkError(error, i18n.t("erro.anexarDoc"));
      reject();
    });
}*/

export function anexarTodosDocumentosCheckin(anexos, resolve, reject) {
  apiToken
    .anexarTodosDocumentosCheckin(anexos)
    .then((responses) => {
      // Mapeia as respostas e retorna um array com as respostas correspondentes aos anexos
      const resultados = responses.map((response, index) => {
        return {
          anexo: anexos[index], // Anexo correspondente
          response: response // Resposta da API para este anexo
        };
      });
      resolve(resultados); // Resolve com os resultados
    })
    .catch(error => {
      checkError(error, i18n.t("erro.anexarDoc"));
      reject(); // Rejeita a promessa em caso de erro
    });
}


//Matheus - 16-07-24
export function finalizarCheckin(idPac, codAgendamento, resolve, reject) {
  apiToken
    .finalizarCheckin(idPac, codAgendamento)
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      checkError(error, i18n.t("erro.servidor"));
      reject();
    });
}
