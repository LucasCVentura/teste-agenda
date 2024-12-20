import JwtToken from "@/services/jwt-token";

export default {
  // CONFIG
  ALTERAR_CONFIG(state, value) {
    state.config.logo = value.logo;
    state.config.versao = value.versao;
    state.config.midiasSociais = value.midiasSociais;
    state.config.urlServidor = value.urlServidor;
    state.config.docMask = value.docMask;
    state.config.telMask = value.telMask;
    state.config.validarCpf = value.validarCpf;
    state.config.multiDocumento = value.multiDocumento;
    if (process.env.PROD) state.config.assistente = value.assistente;
    state.config.teleAtendimento = value.teleAtendimento;
    state.config.permitirUpload = value.permitirUpload;
    state.config.formatoDataIngles = value.formatoDataIngles;
    state.config.informacoesComplementares = value.informacoesComplementares;
    state.config.cadastroSemNumCarteirinha = value.cadastroSemNumCarteirinha;
    state.config.caminhoAnamnese = value.caminhoAnamnese;
    state.config.user = value.user;
    state.config.pass = value.pass;
    state.config.habilitarRecuperacaoWhatsApp = value.habilitarRecuperacaoWhatsapp; // Correção aqui
    state.config.imagemLogo = value.imagemLogo;

  },
  // TOKEN
  AUTENTICAR(state) {
    state.auth.check = true;
  },
  CANCELAR_AUTENTICACAO(state) {
    state.auth.check = false;
    JwtToken.token = null;
  },
  SET_ID_PAC(state, idpac) {
    state.usuario.idpac = idpac;
  },
  // CADASTRO
  SET_NOME(state, value) {
    state.usuario.nome = value;
  },
  SET_EMAIL(state, value) {
    state.usuario.email = value;
  },
  SET_CPF(state, value) {
    state.usuario.cpf = value;
  },
  SET_RG(state, value) {
    state.usuario.rg = value;
  },
  SET_SEXO(state, value) {
    state.usuario.sexo = value;
  },
  SET_DATA_NASC(state, value) {
    state.usuario.dataNasc = value;
  },
  SET_TELEFONE(state, value) {
    state.usuario.telefone = value;
  },
  SET_SENHA(state, value) {
    state.usuario.senha = value;
  },
  SET_ID_FACEBOOK(state, value) {
    state.usuario.oauth.id.facebook = value;
  },
  SET_ID_GOOGLE(state, value) {
    state.usuario.oauth.id.google = value;
  },
  SET_OAUTH_TOKEN(state, value) {
    state.usuario.oauth.token = value;
  },
  SET_AUT_EMAIL(state, value) {
    state.usuario.checkemail = value;
  },
  SET_AUT_SMS(state, value) {
    state.usuario.checksms = value;
  },
  CONFIRMAR_CODIGO(state, value) {
    state.auth.confirm = value;
  },
  // AGENDAMENTO
  CONTROLE_INFOMODAL(state, value) {
    state.agendamento.infoModalAberto = value;
  },
  SET_ID_CONVENIO(state, value) {
    state.agendamento.idConvenioPaciente = value;
  },
  SET_EXAMES_SELECIONADOS(state, value) {
    state.agendamento.examesSelecionados.push(value);
  },
  DELETE_EXAME_SELECIONADO(state, value) {
    state.agendamento.examesSelecionados.splice(value, 1);
  },
  DELETE_ALL_EXAMES_SELECIONADOS(state) {
    state.agendamento.examesSelecionados = [];
  },
  SET_UNIDADES_SELECIONADAS(state, unidade) {
    // Controle para seleção de exame
    unidade.ID_EXAMES.map(idExame => {
      state.agendamento.qtdExamesMarcados++;
      state.agendamento.examesSelecionados.map(exame => {
        if (exame.id === idExame) exame.marcado = true;
      });
    });

    state.agendamento.unidadesSelecionadas.push(unidade);
  },
  DELETE_UNIDADES_SELECIONADAS(state, value) {
    state.agendamento.unidadesSelecionadas.splice(value, 1);
  },
  DELETE_EXAME_UNIDADE(state, value) {
    state.agendamento.unidadesSelecionadas[value.unidade].ID_EXAMES.splice(
      value.exame,
      1
    );
    state.agendamento.unidadesSelecionadas[value.unidade].DESC_EXAMES.splice(
      value.exame,
      1
    );
    state.agendamento.unidadesSelecionadas[value.unidade].QTE_EXAMES--;
    state.agendamento.qtdExamesMarcados--;
  },
  REFAZER_SELECAO(state) {
    state.agendamento.qtdExamesMarcados = 0;
    state.agendamento.unidadesSelecionadas = [];
    state.agendamento.examesSelecionados.map(exame => {
      exame.marcado = false;
    });
  },
  SET_TELEATENDIMENTO(state, value) {
    state.agendamento.teleAtendimento = value;
  }
};
