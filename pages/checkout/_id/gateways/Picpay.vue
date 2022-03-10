<template>
  <h1 v-if="$fetchState.pending" class="text-center text-6xl text-pink-500">
    Carregando payment data
  </h1>
  <h1 v-else-if="$fetchState.error">
    Ocorreu um erro ao carregar paymentdata
  </h1>
  <div v-else>
    <FormsPicpayForm />
  </div>
</template>

<script>
export default {
  async fetch () {
    const payment = await this.$axios.get(`${process.env.URL}/api/getpayment/${this.$route.params.id}`)
  },
  head: {
    title: 'Preencha suas informações'
  }
}
</script>
