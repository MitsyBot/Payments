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
        <b>Produto: </b>
        Mitsy Premium - Duuuuardo#0620
      </div>
      <div>
        <b>Valor: </b>R$19.99
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
  }
}
</script>
<style>
@import '../assets/css/styles.css';
</style>
