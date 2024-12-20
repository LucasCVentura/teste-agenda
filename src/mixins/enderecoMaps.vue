<script>
import { openURL } from 'quasar'

export default {
  methods: {
    abrirEndereco (endereco) {
      openURL('https://www.google.com.br/maps/place/' + endereco)
    },
    formatarCEP (cep) {
      return cep ? ' - ' + cep + ' - ' : ' - '
    }
  }
}
</script>
