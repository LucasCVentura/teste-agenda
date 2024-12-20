<!-- src/components/Redirect.vue -->

<template>
  <div>
    <p>Redirecionando...</p>
    <q-inner-loading size="55px" color="azul1" :visible="true" />
  </div>
</template>

<script>
import { i18n } from '@/plugins/vue-i18n'

export default {
  name: 'Redirect',
  created() {
    // Matheus Vieira - 15/07/2024: Capturar o token da URL (http://Ip:Porta/#/Redirect?tk=123)
    const token = this.$route.query.tk
    if (token) {
      //se existir o token faça um dispatch para o action.js usando o método loginTk
      this.$store.dispatch('loginTk', { tk: token, block: false });
    } else {
      console.error(i18n.t('checkin.tokenNotFound'));
      this.$router.push({
          path: '/Message',
          query: {
            title: i18n.t('dadosCadastrais.tituloPergunta'), // Mensagem do título
            message: i18n.t('checkin.tokenNotFound') // Mensagem do corpo
          }
        });
      //JwtToken.logoutTk()
    }
  },
  methods: {

}
}
</script>
