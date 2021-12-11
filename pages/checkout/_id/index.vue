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
  async fetch () {
    const payment = await this.$axios.get(`${process.env.URL}/api/getpayment/${this.$route.params.id}`)
    if (payment.data.paid === 'true' || payment.data.prepaid === 'true') {
      this.$router.push('/missing')
    }
  },
  head: {
    title: 'Escolha a forma de pagamento'
  }

}
</script>
