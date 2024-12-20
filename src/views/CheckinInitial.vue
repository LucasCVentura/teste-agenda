<template>
  <q-layout>
    <q-page-container>
      <q-page> 
        <q-input v-model="name" label="Standard" placeholder="Nome"/>

      </q-page>
    </q-page-container>
  </q-layout>
</template>


<script>
  export default {
    data() {
      return {
        name: ""
      }
    }
  }
</script>

<style>

</style>
