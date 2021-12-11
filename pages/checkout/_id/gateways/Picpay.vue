<template>
  <h1 v-if="$fetchState.pending" class="text-center text-6xl text-pink-500">
    Carregando payment data
  </h1>
  <h1 v-else-if="$fetchState.error">
    Ocorreu um erro ao carregar paymentdata
  </h1>
  <div v-else>
    <PayHeader
      title="Preencha seus dados!"
    />

    <FormsPicpayForm />
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
    title: 'Preencha suas informações'
  }
}
</script>
