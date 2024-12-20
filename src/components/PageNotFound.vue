<template>
  <div class="fixed-center text-center">
    <p><img src="~assets/sad.svg" style="width:30vw;max-width:150px;"></p>
    <p class="text-faded">{{ $t('error404.mensagem') }} <strong>(404)</strong></p>
    <q-btn color="secondary" style="width:200px;" @click="$router.go(-1)" v-html="$t('error404.voltar')" />
    <!-- RENDER DA IMAGEM NO MOBILE -->
    <img v-show="false" src="~assets/assistente.png">
  </div>
</template>

<script>
export default {
  name: 'PageNotFound'
}
</script>
