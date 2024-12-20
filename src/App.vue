<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { configuracoesIniciais } from '@/services/chamadas/semToken'

export default {
  created () {
    document.addEventListener('deviceready', this.initCordovaPlugins, false)
  },
  beforeMount () {
    configuracoesIniciais()
  },
  methods: {
    initCordovaPlugins () {
      console.log('Device is ready!')
    }
  }
}
</script>

<style lang="stylus">

::-webkit-scrollbar
  width 4px
  height 4px

::-webkit-scrollbar-track
  background #E9E9E9

::-webkit-scrollbar-thumb
  background #BBB
  border-radius 10px

::-webkit-scrollbar-thumb:hover
  background #AAA

body
  font-family Open Sans, Arial, sans-serif
  -webkit-user-select none
  -moz-user-select none
  -ms-user-select none
  user-select none

</style>
