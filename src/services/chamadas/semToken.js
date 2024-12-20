import axios from "axios";
import store from "@/store";
import client from "../client";
import { i18n } from "@/plugins/vue-i18n";
import { iziError } from "@/helpers/notifications";

export const instance = axios.create({
  baseURL: client.getURL()
});

instance.interceptors.request.use(
  function (config) {
    config.headers["Content-Language"] = i18n.locale;
    return config;
  },
  function (error) {
    if (!error.response) {
      console.log(error);
      iziError(i18n.t("erro.servidor"));
    }
  }
);

export const buscarUsuario = (login, field) => {
  let params = new URLSearchParams();
  params.append(field, login);

  return instance.post(
    "/paciente/buscar" + field.charAt(0).toUpperCase() + field.slice(1),
    params
  );
};

export const cadastrarUsuario = user => {
  let params = new URLSearchParams();
  params.append("nome", user.nome.toUpperCase());
  params.append("email", user.email);
  params.append("cpf", user.cpf);
  params.append("rg", user.rg);
  params.append("sexo", user.sexo);
  params.append("nasc", user.dataNasc);
  params.append("tel", user.telefone);
  params.append("senha", user.senha);
  params.append("id_facebook", user.oauth.id.facebook);
  params.append("id_google", user.oauth.id.google);
  params.append("checkemail", user.checkemail);
  params.append("checksms", user.checksms);
  return instance.post("/paciente/efetuarCadastro", params);
};

export const verificarCodigo = (login, codigo) => {
  let params = new URLSearchParams();
  params.append("login", login);
  params.append("codigo", codigo);

  return instance.post("/paciente/verificarConfirmacao", params);
};

export const reenviarCodigo = (cpf, email) => {
  let params = new URLSearchParams();
  params.append("cpf", cpf);
  params.append("email", email);

  return instance.post("/paciente/reenviarCodigo", params);
};

export const autenticarMidiaSocial = (email, userID, token, midia) => {
  let params = new URLSearchParams();
  params.append("email", email);
  params.append("userId", userID);
  params.append("accessToken", token);

  return instance.post("/autenticarMidiaSocial/login" + midia, params);
};

export const atualizarEmail = (oldEmail, newEmail, cpf) => {
  let params = new URLSearchParams();
  params.append("email", oldEmail);
  params.append("novoEmail", newEmail);
  params.append("cpfPac", cpf);

  return instance.post("/paciente/trocarEmailPaciente", params);
};

export const recuperarSenha = (emailOrCpf, tipoRecuperacao) => {
  console.log(emailOrCpf, tipoRecuperacao)
  let params = new URLSearchParams();
  params.append("emailOrCpf", emailOrCpf);
  params.append("tipoRecuperacao", tipoRecuperacao);

  return instance.post("/paciente/sendPacienteSenha", params);
};

export const getPacienteInfo = (emailOrCpf, data) => {
  console.log(emailOrCpf, data)
  let params = new URLSearchParams();
  params.append("emailOrCpf", emailOrCpf);
  params.append("nasc", data);
  console.log(params)

  return instance.post("/paciente/getNumeroPaciente", params);
}

export const getEmailPac = (emailOrCpf, data) => {
  console.log(emailOrCpf, data)
  let params = new URLSearchParams();
  params.append("emailOrCpf", emailOrCpf);
  params.append("nasc", data);
  console.log(params)

  return instance.post("/paciente/getEmailPaciente", params);
}

export function configuracoesIniciais() {
  instance
    .post("/configuracoesIniciais/getConfiguracao")
    .then(response => {
      console.log(response.data)
      store.dispatch("alterarConfiguracao", response.data);

    })
    .catch(err => {
      console.log(err);
    });
}
