<template>
  <h1 v-if="$fetchState.pending" class="text-center text-6xl text-pink-500">
    Carregando payment data
  </h1>
  <h1 v-else-if="$fetchState.error">
    Ocorreu um erro ao carregar paymentdata
  </h1>
  <div v-else>
    <PayHeader
      title="Como você quer pagar?"
    />
    <div id="wrapper">
      <div id="payment-methods">
        <NuxtLink :to="`/checkout/${$route.params.id}/gateways/picpay`">
          <div class="payment-button">
            <img src="../../../assets/picpay.svg" alt="gateways.picpay.name" style="width: 100%; max-height: 80px;"><span style="display: block;">Cartão de Crédito, Saldo do PicPay</span>
          </div>
        </NuxtLink>
      </div>
    </div>
    <PayFooter />
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: null
    }
  },

  async fetch () {
    this.$axios.setToken(process.env.API_TOKEN)
    await this.$axios.get(`http://localhost:5671/api/getpayment/${this.$route.params.id}`)
      .then(response => (this.data = JSON.parse(JSON.stringify(response.data))))
  },
  head: {
    title: 'Escolha a forma de pagamento'
  },

  mounted () {
    this.$axios.setToken(process.env.API_TOKEN)
    this.$axios.$get(`http://localhost:5671/api/getpayment/${this.$route.params.id}`)
      .then((response) => {
        if (response[0].paid === 'true' || response[0].prepaid === 'true') {
          this.$router.push('/missing')
        }
      })
  }
}
</script>
