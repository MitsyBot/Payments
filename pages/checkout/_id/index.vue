<template>
  <div>
    <div id="wrapper">
      <div id="payment-methods">
        <NuxtLink :to="`/checkout/${$route.params.id}/gateways/picpay`">
          <div class="payment-button">
            <img src="../../../assets/picpay.svg" alt="gateways.picpay.name" style="width: 100%; max-height: 80px;"><span style="display: block;">Cartão de Crédito, Saldo do PicPay</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'InPayment',
  head: {
    title: 'Escolha a forma de pagamento'
  },
  mounted () {
    this.$axios.setToken(process.env.API_TOKEN)
    this.$axios.setHeader('Content-Type', 'application/json')
    this.$axios.$get(`http://localhost:5671/api/getpayment/${this.$route.params.id}`)
      .then((response) => {
        if (response[0].paid === 'true' || response[0].prepaid === 'true') {
          this.$router.push('/missing')
        }
      })
  }
}
</script>
