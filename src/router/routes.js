import store from '@/store/'

const routes = [
  {
    name: 'login',
    path: '/login',
    alias: '/',
    component: () => import('@/views/Login')
  },
  {
    name: 'recuperacao',
    path: '/recuperacao/senha',
    component: () => import('@/components/EsqueciSenha')
  },
  {
    name: 'recuperacaoWpp',
    path: '/recuperacao/senhawpp',
    component: () => import('@/components/EsqueciSenhaWpp')
  },
  {
    name: 'cadastro',
    path: '/cadastro/:step(nome|cpf|nasc|senha)',
    component: () => import('@/views/Cadastro'),
    beforeEnter: (to, from, next) => {
      to.params.step !== 'nome' ? next('/cadastro/nome') : next()
    }
  },
  {
    name: 'confirmacao',
    path: '/confirmacao/codigo',
    component: () => import('@/components/codigoConfirmacao'),
    beforeEnter: (to, from, next) => {
      let notConfirmed = store.state.auth.confirm
      notConfirmed ? next() : next('/login')
    }
  },
  {
    name: 'agendamento',
    path: '/agendamento/:step(exames|unidades|horarios)',
    component: () => import('@/views/Agendamento'),
    beforeEnter: (to, from, next) => {
      to.params.step !== 'exames' ? next('/agendamento/exames') : next()
    }
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: () => import('@/views/Dashboard')
  },
  {
    name: 'DadosCadastrais',
    path: '/DadosCadastrais',
    component: () => import('@/views/DadosCadastrais')
  },
  {
    name: 'CheckIn',
    path: '/Checkin/:codAgendamento',
    component: () => import('@/views/Checkin'),
    props: true
  },
  {
    path: '/Redirect',
    name: 'Redirect',
    component: () => import('@/components/Redirect')
  },
  {
    path: '/Message',
    name: 'Message',
    component: () => import('@/components/Message'),
    props: route => ({
      title: route.query.title,//Titulo
      message: route.query.message//Mensagem erro/sucesso/aviso
    })
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('@/components/PageNotFound')
  })
}

export default routes
