import store from '@/store'
import router from '@/router'
import { instance } from './chamadas/semToken'
import { instance as instanceToken } from './chamadas/comToken'
import { LocalStorage } from 'quasar'
import { iziError } from '@/helpers/notifications'
import { i18n } from '@/plugins/vue-i18n'

export default {
  get token () {
    return LocalStorage.get.item('mediAgendaToken')
  },
  set token (value) {
    return value ? LocalStorage.set('mediAgendaToken', value) : LocalStorage.remove('mediAgendaToken')
  },
  acessToken (login, senha, block) {
    let params = new URLSearchParams()
    params.append('login', login)
    params.append('senha', senha)

    return instance.post('/paciente/efetuarLogin', params)
      .then(response => {
        store.commit('SET_SENHA', senha)
        if (response.status === 200) {
          this.token = response.data.token
          if (!block) router.push('/dashboard')
        } else {
          store.dispatch('confirmarCodigo', true)
            .then(() => {
              router.push('/confirmacao/codigo')
            })
        }
      }).catch(error => {
        if (!error.response) {
          console.log(error)
          iziError(i18n.t('erro.servidor'))
        } else {
          (error.response.status === 401 || error.response.status === 503) ? iziError(error.response.data) : iziError(i18n.t('erro.autenticacao'))
        }
      })
  },
  acessTk (tokenUrl, block) {
    return instance.post('/paciente/efetuarLoginTk?tk=' + tokenUrl)
      .then(response => {
       // Matheus Vieira - 15/07/2024: Verifica se a resposta da requisição HTTP é de sucesso (status 200) --comentarios necessários por conta do fluxo atual
        if (response.status === 200) {
          // Armazena o token recebido na resposta na propriedade `this.token`
          this.token = response.data.token;
          // Se `block` não estiver definido, redireciona o usuário para o checkin
          if (!block) {
            //CodAgendamento é parametro obrigatorio para passar para o checkin e realizar o anexo para o exame recebido
            const codAgendamento = response.data.codAgendamento;
            if (codAgendamento) {
              router.push(`/Checkin/${codAgendamento}`);
            } else {
              console.error('codAgendamento não encontrado na resposta');
            }
          }
        }else{
          this.logoutTk();
        }
      })
      .catch(error => {
        // Trata erros que não têm uma resposta HTTP associada (ex.: problemas de rede)
        if (!error.response) {
          console.log(error);
          // Exibe uma mensagem de erro genérica usando iziError/realiza o logout para não prender na pagina
          iziError(i18n.t('erro.servidor'));
          this.logoutTk(i18n.t('erro.servidor'));
        } else {
          // Se a resposta HTTP for 401 (não autorizado) ou 503 (serviço indisponível), exibe a mensagem de erro específica
          (error.response.status === 401 || error.response.status === 503)
            ? iziError(error.response.data)
            : iziError(i18n.t('erro.autenticacao')); // Para outros erros, exibe uma mensagem de erro de autenticação
            if (error.response && error.response.data && error.response.status === 401 || error.response.status === 503) { //Matheus: Quando existir mensagem de erro para exibir para pagina de Message
              this.logoutTk(error.response.data);
            } else {
              this.logoutTk(i18n.t('erro.servidor'));
            }
          }
      });
  },
  logout () {
    return instanceToken.post('/paciente/logout')
      .then(response => {
        store.dispatch('cancelarAutenticacao')
          .then(() => {
            router.push('/login')
          })
      })
      .catch(error => {
        console.log(error)
      })
  },
  logoutTk (mensagem) {
    return instanceToken.post('/paciente/logout')
      .then(response => {
        if(mensagem){//Quando Erro no loginTk ou semelhante
          store.dispatch('cancelarAutenticacao')
          router.push({
            path: '/Message',
            query: {
              title: i18n.t('dadosCadastrais.tituloPergunta'), // Mensagem do título
              message: mensagem // Mensagem do corpo
            }
          })
          .then(() => {
            router.push('/Message')
          })
        }else{
          store.dispatch('cancelarAutenticacao')
          router.push('/Message')
          .then(() => {
            router.push('/Message')
          })
        }

      })
      .catch(error => {
        if(mensagem){
          router.push({
            path: '/Message',
            query: {
              title: i18n.t('dadosCadastrais.tituloPergunta'), // Mensagem do título
              message: mensagem // Mensagem do corpo
            }
          })
          store.dispatch('cancelarAutenticacao')
          console.log(error)
        }else{
          router.push('/Message')
          store.dispatch('cancelarAutenticacao')
          console.log(error)
        }

      })
  },
  refreshToken () {
    // Não está sendo utilizado neste momento
    return instance.post('/paciente/refresh')
      .then(response => {
        this.token = response.data.token
        return response
      })
  },
  getAuthorizationHeader () {
    return `Bearer ${this.token}`
  },
  hasToken () {
    return LocalStorage.has('mediAgendaToken')
  }
}
