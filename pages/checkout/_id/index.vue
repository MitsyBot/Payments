<template>
  <h1 v-if="$fetchState.pending" class="text-center text-6xl text-pink-500">
    Carregando payment data
  </h1>
  <h1 v-else-if="$fetchState.error">
    Ocorreu um erro ao carregar paymentdata
  </h1>
  <div v-else>
    <div id="wrapper">
      <PaymentStageOne v-if="stage === 1" :data="payment" @next-stage="nextStage()" />
      <PaymentStageTwo v-if="stage === 2" :data="payment" @next-stage="nextStage()" />
      <PaymentStageThree v-if="stage === 3" :data="payment" @next-stage="nextStage()" />
      <PaymentStageFour v-if="stage === 4" :data="payment" @next-stage="nextStage()" />
      <PaymentStageFive v-if="stage === 5" :data="payment" :qrcode="qr" @next-stage="nextStage()" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      payment: null,
      stage: 1,
      qr: null
    }
  },
  async fetch () {
    const payment = await this.$axios.get(`${process.env.URL}/api/getpayment/${this.$route.params.id}`)
    this.payment = payment.data
  },
  head: {
    title: 'Escolha a forma de pagamento'
  },
  methods: {
    nextStage () {
      this.stage = this.stage + 1
    },
    qrStage () {
      this.stage = 5
    }
  }
}
</script>
