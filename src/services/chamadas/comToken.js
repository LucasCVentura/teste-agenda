import axios from "axios";
import store from "@/store";
import router from "@/router";
import client from "../client";
import jwtToken from "../jwt-token";
import { i18n } from "@/plugins/vue-i18n";
import { iziError } from "@/helpers/notifications";

export const instance = axios.create({
  baseURL: client.getURL(),
  headers: { "Access-Control-Max-Age": 600 }
});

instance.interceptors.request.use(
  function (config) {
    if (!jwtToken.hasToken()) {
      store.dispatch("cancelarAutenticacao");
      router.push("/login");
    }
    config.headers["Content-Language"] = i18n.locale;
    config.headers["Authorization"] = jwtToken.getAuthorizationHeader();
    return config;
  },
  function (error) {
    if (!error.response) {
      console.log(error);
      iziError(i18n.t("erro.servidor"));
    }
  }
);

export const buscarConvenios = () => {
  return instance.post("/convenio/getConvenio");
};

export const buscarPlanosDoConvenio = idConvenio => {
  let params = new URLSearchParams();
  params.append("IdConvenio", idConvenio);

  return instance.post("/planos/getPlanoByConvenio", params);
};

export const matObrigaConv = idConvenio => {
  let params = new URLSearchParams();
  params.append("IdConvenio", idConvenio);

  return instance.post("/convenio/getObrigaMatConv", params);
};

export const atualizarPaciente = informacoes => {
  let params = new URLSearchParams();
  params.append("altura", informacoes.altura.replace(/,/g, "."));
  params.append("peso", informacoes.peso);
  params.append(
    "medicamento",
    (informacoes.usaMedicamento + "").charAt(0).toUpperCase()
  );
  params.append("desc_medicamento", informacoes.desc_medicamentos);
  params.append(
    "limitacoes",
    (informacoes.deficiencia + "").charAt(0).toUpperCase()
  );
  informacoes.convenio && params.append("id_conv", informacoes.convenio);
  params.append("id_plano", informacoes.plano);
  params.append("matConv", informacoes.matricula);
  params.append("origem", informacoes.origemReq);

  return instance.post("/paciente/adicionarInformacoes", params);
};

export const atualizarSMS = informacoes => {
  let params = new URLSearchParams();
  params.append("smslembrete", informacoes);

  return instance.post("/paciente/updateSMS", params);
};

export const atualizarEmailLembrete = informacoes => {
  let params = new URLSearchParams();
  params.append("emaillembrete", informacoes);

  return instance.post("/paciente/updateEmailLembrete", params);
};

export const buscarExamesMarcados = () => {
  return instance.post("/marcacoes/getExamesMarcados");
};

export const buscarExamesPendentes = () => {
  return instance.post("/marcacoes/getExamesPendentes");
};

export const buscarResultadosPendentes = () => {
  return instance.post("/exames/getResultadosPendentes");
};

export const gerarTokenAnamnese = (
  codAgendamento,
  user,
  pass,
  patientName,
  idSurvey
) => {
  let params = new URLSearchParams();
  params.append("codAgendamento", codAgendamento);
  params.append("user", user);
  params.append("pass", pass);
  params.append("idSurvey", idSurvey);
  params.append("pacName", patientName);
  return instance.post("/paciente/gerarTokenAnamnese", params);
};

export const buscarTodosExames = () => {
  return Promise.all([
    buscarExamesMarcados(),
    buscarExamesPendentes(),
    buscarResultadosPendentes()
  ]);
};

export const buscarServicos = (idConvenio, filtro, examesSelecionados, flTeleConsulta) => {
  let params = new URLSearchParams();
  if (!idConvenio) idConvenio = 0;
  params.append("valorConvenio", idConvenio);
  params.append("filtro", filtro);

  examesSelecionados.forEach(exame => {
    params.append("examesSelecionados", exame.id);
  });

  params.append("flTeleConsulta", flTeleConsulta);

  if (filtro || flTeleConsulta) {
    console.log("Fazendo consulta...");
    return instance.post("/servicos/getServicoByConvenio", params);
  }
};

export const salvarRespostas = (idPac, perguntas, respostas, observacoes) => {
  let params = new URLSearchParams();
  params.append("idPac", idPac);
  params.append("perguntas", JSON.stringify(perguntas));
  params.append("respostas", JSON.stringify(respostas));
  params.append("observacoes", JSON.stringify(observacoes));

  return instance.post("/agendamento/salvarRespostas", params);
};

export const buscarUltimaResposta = (idPac, idQuestionarioAgendamento) => {
  let params = new URLSearchParams();
  params.append("idPac", idPac);
  params.append("idQuestionarioAgendamento", idQuestionarioAgendamento);

  return instance.post("/agendamento/buscarUltimaResposta", params);
};

export const getPerguntasByServico = (idService) => {
  let params = new URLSearchParams();
  params.append("idServ", idService);

  return instance.post("/servicos/getPerguntasByServico", params);
};

export const buscarClinicas = (servicos, filtro, flTeleConsulta) => {
  let params = new URLSearchParams();
  servicos.map(id => {
    params.append("servicos", id);
  });
  params.append("filtro", filtro);
  params.append("flTeleConsulta", flTeleConsulta);

  return instance.post("/clinicas/getClinicaByServico", params);
};

export const buscarClinicasGeolocalizacao = (
  servicos,
  coordenadas,
  filtro,
  flTeleConsulta
) => {
  let params = new URLSearchParams();
  servicos.map(id => {
    params.append("servicos", id);
  });
  params.append("latitude", coordenadas.latitude);
  params.append("longitude", coordenadas.longitude);
  params.append("filtro", filtro);
  params.append("flTeleConsulta", flTeleConsulta);

  return instance.post("/clinicas/getClinicaByGeolocation", params);
};

export const buscarDatas = (idServico, cnpj) => {
  let params = new URLSearchParams();
  params.append("cnpj", cnpj);
  params.append("servico", idServico);

  return instance.post("/agendamento/getDatasLivres", params);
};

export const buscarHorarios = (idServico, cnpj, data) => {
  let params = new URLSearchParams();
  params.append("cnpj", cnpj);
  params.append("servico", idServico);
  params.append("data", data);

  return instance.post("/agendamento/getHorariosLivres", params);
};

export const agendarExame = (data, hora, equip, idServico, cnpj, cobertura, idPac, respostas) => {
  let params = new URLSearchParams();
  params.append("data", data);
  params.append("hora", hora);
  params.append("equipe", equip);
  params.append("servico", idServico);
  params.append("cnpj", cnpj);
  params.append("idPac", idPac);
  params.append("cobertura", cobertura);
  params.append("respostas", JSON.stringify(respostas));

  return instance.post("/agendamento/agendarExame", params);
};

export const agendarTeleAtendimento = (idServico, cnpj, cobertura) => {
  let params = new URLSearchParams();
  params.append("servico", idServico);
  params.append("cnpj", cnpj);
  params.append("cobertura", cobertura);
  return instance.post("/teleAtendimento/agendarTeleAtendimento", params);
};

export const desmarcarExame = (data, hora, equip, codAgendamento) => {
  let params = new URLSearchParams();
  params.append("data", data);
  params.append("hora", hora);
  params.append("equipe", equip);
  params.append("codAgendamento", codAgendamento);

  return instance.post("/agendamento/desmarcarExame", params);
};

export const cancelarTeleAtendimentoNaoConfirmado = (
  codigoAgendamento,
  data,
  hora,
  equip
) => {
  let params = new URLSearchParams();
  params.append("codigoAgendamento", codigoAgendamento);
  params.append("data", data);
  params.append("hora", hora);
  params.append("equip", equip);

  return instance.post(
    "/teleAtendimento/cancelarTeleAtendimentoNaoConfirmado",
    params
  );
};

export const buscarInfoPaciente = () => {
  return instance.post("/paciente/getPacienteInfo");
};

export const anexarTodosDocumentos = anexos => {
  return Promise.all([
    anexarDocumento(anexos[0], 1),
    anexarDocumento(anexos[1], 2),
    anexarDocumento(anexos[2], 3)
  ]);
};

export const anexarDocumento = (anexo, codObj) => {
  if (!anexo) return "ok";
  const config = {
    headers: { "Content-Type": "multipart/form-data" }
  };
  let formData = new FormData();
  formData.append("file", anexo.arquivo);
  formData.append("codObjeto", codObj);
  anexo.codigos.map(cod => {
    formData.append("codAgenda", cod);
  });
  return instance.post("/upload/uploadDir", formData, config).catch(err => {
    console.error("Error: ", err);
  });
};

export const bloquearHorario = (data, horario, idEquip, exame) => {
  let params = new URLSearchParams();
  params.append("data", data);
  params.append("hora", horario);
  params.append("equipe", idEquip);
  params.append("exame", exame);

  return instance.post("/agendamento/bloquearHorario", params);
};

export const permitirAgendamento = (idServico, idConvenio, data, idPac, datasMarcacao, idsServ, horasMarcacao, idsEquip) => {
  let params = new URLSearchParams();
  params.append("idServico", idServico);
  params.append("idConvenio", idConvenio);
  params.append("data", data);
  params.append("idPac", idPac);
  datasMarcacao.map(obj => {
    params.append("datasMarcacao", obj);
  });
  idsServ.map(obj => {
    params.append("idsServ", obj);
  });

  horasMarcacao.map(obj => {
    params.append("horasMarcacao", obj);
  });

  idsEquip.map(obj => {
    params.append("idsEquip", obj);
  });

  return instance.post("/agendamento/permitirAgendamento", params);
};

export const desbloquearHorarios = desbloqueioArray => {
  let params = new URLSearchParams();
  desbloqueioArray.map(obj => {
    params.append("exames", JSON.stringify(obj));
  });

  return instance.post("/agendamento/liberarHorarios", params);
};

//Matheus - 16-07-24
export const buscarConveniosCheckin = codAgendamento => {
  let params = new URLSearchParams();
  params.append("codAgendamento", codAgendamento);
  return instance.post("/convenio/getConvenioCheckin", params);
};

//Matheus - 16-07-24
export const buscarInfoClinica = () => {
  return instance.post("/configuracoesIniciais/getConfiguracaoClient");
};

//Matheus - 16-07-24
export const anexarTodosDocumentosCheckin = (anexos) => {
  const promises = [];
  //Matheus: Adicionado uma referencia numerica do objeto(anexo)
  let referencialAnexo = 1;
  for (let i = 0; i < anexos.length; i++) {
    const obj = anexos[i];
    promises.push(anexarDocumentoCheckin(obj, referencialAnexo));
    referencialAnexo++;
  }
  return Promise.all(promises);
};

//Matheus - 16-07-24
export const buscarTiposAnexos = () => {
  return instance.post("/upload/buscarTiposAnexos");
};

//Matheus - 16-07-24
export const finalizarCheckin = (idPac, codAgendamento) => {
  let params = new URLSearchParams();
  params.append("idPac", idPac);
  params.append("codAgendamento", codAgendamento);

  return instance.post("/paciente/finalizarCheckin", params);
};

//Matheus - 16-07-24
export const anexarDocumentoCheckin = (anexo, codObj) => {
  if (!anexo) return "ok";
  const config = {
    headers: { "Content-Type": "multipart/form-data" }
  };
  let formData = new FormData();
  formData.append("file", anexo.arquivo);
  formData.append("categoria", anexo.categoria);
  formData.append("codObjeto", codObj);
  anexo.codigos.map(cod => {
    formData.append("codAgenda", cod);
  });
  return instance.post("/upload/uploadDirCheckin", formData, config).catch(err => {
    console.error("Error: ", err);
  });
};
