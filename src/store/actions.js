import JwtToken from "@/services/jwt-token";

export default {
  // CONFIG
  alterarConfiguracao({ commit }, config) {
    commit("ALTERAR_CONFIG", config);
  },
  // LOGIN
  login({ commit }, { login, senha, block }) {
    return JwtToken.acessToken(login, senha, block).then(response => {
      commit("AUTENTICAR");
      return response;
    });
  },
  loginTk({ commit }, { tk, block }) {
    // Matheus Vieira - 15/07/2024: Chama o método acessTk de JwtToken com o token (tk) e o parâmetro block
    return JwtToken.acessTk(tk, block).then(response => {
      // Chama a mutation AUTENTICAR para atualizar o estado da aplicação após a autenticação
      commit("AUTENTICAR");
      // Retorna a resposta para que possa ser utilizada em outros lugares, se necessário
      return response;
    });
  },
  cancelarAutenticacao({ commit }) {
    commit("CANCELAR_AUTENTICACAO");
  },
  updateIdPac({ commit }, valor) {
    commit("SET_ID_PAC", valor);
  },
  // CADASTRO
  limparUsuario({ commit, dispatch }) {
    dispatch("cadastroStep1", ["", ""]);
    dispatch("cadastroStep2", ["", "", ""]);
    dispatch("cadastroStep3", ["", ""]);
    dispatch("cadastroStep4", "");
    commit("SET_ID_GOOGLE", null);
    commit("SET_ID_FACEBOOK", null);
    commit("SET_OAUTH_TOKEN", null);
  },
  cadastroStep1({ commit }, [nome, email, checkemail]) {
    commit("SET_NOME", nome);
    commit("SET_EMAIL", email);
    commit("SET_AUT_EMAIL", checkemail);
  },
  cadastroStep2({ commit }, [cpf, rg, sexo]) {
    commit("SET_CPF", cpf);
    commit("SET_RG", rg);
    commit("SET_SEXO", sexo);
  },
  cadastroStep3({ commit }, [dataNasc, telefone, checksms]) {
    commit("SET_DATA_NASC", dataNasc);
    commit("SET_TELEFONE", telefone);
    commit("SET_AUT_SMS", checksms);
  },
  cadastroStep4({ commit }, senha) {
    commit("SET_SENHA", senha);
  },
  confirmarCodigo({ commit }, value) {
    commit("CONFIRMAR_CODIGO", value);
  },
  // AGENDAMENTO
  controleInfoModal({ commit }, value) {
    commit("CONTROLE_INFOMODAL", value);
  },
  agendamentoStep1({ commit }, exame) {
    commit("SET_EXAMES_SELECIONADOS", exame);
  },
  agendamentoStep2({ commit }, unidade) {
    commit("SET_UNIDADES_SELECIONADAS", unidade);
  },
  refazerSelecao({ commit }) {
    commit("REFAZER_SELECAO");
  },
  removerExameUnidade({ commit, state }, obj) {
    commit("DELETE_EXAME_UNIDADE", obj);
    if (!state.agendamento.unidadesSelecionadas[obj.unidade].QTE_EXAMES) {
      commit("DELETE_UNIDADES_SELECIONADAS", obj.unidade);
    }
  },
  limparAgendamento({ commit }) {
    commit("REFAZER_SELECAO");
    commit("DELETE_ALL_EXAMES_SELECIONADOS");
    commit("CONTROLE_INFOMODAL", true);
  },
  agendarTeleAtendimento({ commit }) {
    commit("SET_TELEATENDIMENTO", true);
  },
  removerTeleAtendimento({ commit }) {
    commit("SET_TELEATENDIMENTO", false);
  }
};
