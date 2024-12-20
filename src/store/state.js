import JwtToken from "@/services/jwt-token";

export default {
  config: {
    logo: "statics/medilab-logo.png",
    assistente: "assets/assistente.png",
    midiasSociais: false,
    urlServidor: "http://",
    teleAtendimento: false,
    docMask: "###.###.###-##",
    telMask: "(##) # ####-####",
    validarCpf: "TRUE",
    multiDocumento: true,
    formatoDataIngles: false,
    informacoesComplementares: false,
    cadastroSemNumCarteirinha: false,
    caminhoAnamnese: "",
    user: "",
    pass: "",
    permitirUpload: false,
    habilitarRecuperacaoWhatsApp: "",
    imagemLogo:""
  },
  auth: {
    check: JwtToken.hasToken(),
    confirm: false
  },
  usuario: {
    nome: "",
    idpac: "",
    email: "",
    cpf: "",
    rg: "",
    checkemail: "",
    checksms: "",
    sexo: "",
    dataNasc: "",
    telefone: "",
    senha: "",
    oauth: {
      id: {
        google: null,
        facebook: null
      },
      token: null
    }
  },
  agendamento: {
    infoModalAberto: true,
    idConvenioPaciente: 0,
    examesSelecionados: [],
    unidadesSelecionadas: [],
    qtdExamesMarcados: 0, // Quantidade de exames marcados das unidades selecionadas
    teleAtendimento: false
  }
};
