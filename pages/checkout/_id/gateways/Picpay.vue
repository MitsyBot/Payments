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
  data () {
    return {
      data: null
    }
  },

  async fetch () {
    this.$axios.setToken(process.env.API_TOKEN)
    await this.$axios.get(`${process.env.URL}/api/getpayment/${this.$route.params.id}`)
      .then(response => (this.data = JSON.parse(JSON.stringify(response.data))))
  },
  head: {
    title: 'Preencha suas informações'
  },

  mounted () {
    this.$axios.setToken(process.env.API_TOKEN)
    this.$axios.$get(`${process.env.URL}/api/getpayment/${this.$route.params.id}`)
      .then((response) => {
        if (response[0].paid === 'true' || response[0].prepaid === 'true') {
          this.$router.push('/missing')
        }
      })
  }

}
</script>
