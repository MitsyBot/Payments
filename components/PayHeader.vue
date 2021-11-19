<template>
  <div id="payment-header" class="text-white-800">
    <div>
      <h1 class="font-bold text-3xl text-white-800">
        {{ title }}
      </h1>
    </div>
    <div class="divisor" />
    <div>
      <div>
        <b>ID De referencia: </b>
        {{ refid }}
      </div>
      <div>
        <b>Comprador: </b>
        {{ buyer }}
      </div>
      <div>
        <b>Valor: </b>R${{ price }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    title: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      data: null,
      refid: null,
      price: null,
      buyer: null
    }
  },
  async fetch () {
    this.$axios.setToken(process.env.API_TOKEN)
    await this.$axios.get(`${process.env.URL}/api/getpayment/${this.$route.params.id}`)
      .then(response => (this.data = JSON.parse(JSON.stringify(response.data))))

    this.refid = this.data[0].productrefid
    this.price = this.data[0].price
    this.buyer = this.data[0].buyerusername
  }
}
</script>
<style>
@import '../assets/css/styles.css';
</style>
