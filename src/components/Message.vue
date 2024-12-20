<template>
  <div class="message-page">
    <div class="message-message">
      <h4>{{ title }}</h4>
      <p>{{ message }}</p>
      <q-btn
            class="ol-xs-3 col-sm-2 d-flex justify-center q-py-md bg-azul1 text-white"
            icon="fas fa-arrow-right"
            :label="$t('infoAdicional.finalizar')"
            @click="logout"
            no-caps
          />
    </div>
  </div>
</template>

<script>
import JwtToken from '@/services/jwt-token'
import { mask } from 'vue-the-mask'
import { i18n } from '@/plugins/vue-i18n'

export default {
  name: 'Message',
  directives: { mask },
  props: {
    title: {
      type: String,
      default: i18n.t('checkin.finalizado')
    },
    message: {
      type: String,
      default: i18n.t('checkin.agradecimentoFinalizado')
    }
  },
  methods: {
    logout () {
      JwtToken.logout()
    }
  }
};
</script>

<style scoped>

.message-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #0771bc;
}

.message-message {
  background: rgb(255, 255, 255);
  padding: 40px 60px;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
}

h4 {
  font-size: 20px;
  font-weight: 700;
  color: #283e51;
  margin-bottom: 20px;
}

p {
  font-size: 15px;
  color: #4b79a1;
}
</style>
