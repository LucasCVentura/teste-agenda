<template>
  <div>
    <q-btn 
      label="Instalar App" 
      color="cinza1" 
      @click="installPWA" 
      v-if="isInstallable || isIOS" />
  </div>
</template>
  
<script>
  export default {
    name: 'InstallPWA',
    data() {
      return {
        isInstallable: false,
        deferredPrompt: null,
        isIOS: false, // Adicionando a verificação para iOS
      };
    },
    methods: {
      handleBeforeInstallPrompt(event) {
        event.preventDefault();
        this.deferredPrompt = event;
        this.isInstallable = true;
      },
      installPWA() {
        //Para Android
        if (this.deferredPrompt) {
          this.deferredPrompt.prompt();
          this.deferredPrompt.userChoice.then((result) => {
            if (result.outcome === 'accepted') {
              console.log('Usuário aceitou a instalação');
            } else {
              console.log('Usuário rejeitou a instalação');
            }
            this.deferredPrompt = null;
            this.isInstallable = false;
          });
        } else if (this.isIOS) {
          // Para iOS, exibe a mensagem ou direcione o usuário a instruções específicas
          alert('Para adicionar este aplicativo à tela inicial, use o botão "Compartilhar" no Safari e selecione "Adicionar à Tela de Início".');
        }
      },
    },
    mounted() {
      // Detectando se o dispositivo é iOS
      const userAgent = window.navigator.userAgent.toLowerCase();
      this.isIOS = /iphone|ipod|ipad/.test(userAgent);

      // Verificando se o evento "beforeinstallprompt" está disponível no navegador
      if (!this.isIOS) {
        window.addEventListener('beforeinstallprompt', this.handleBeforeInstallPrompt);
      }
    },
    beforeDestroy() {
      if (!this.isIOS) {
        window.removeEventListener('beforeinstallprompt', this.handleBeforeInstallPrompt);
      }
    },
  };
</script>