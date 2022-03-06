<template>
  <div class="text-center pt-6 text-xl">
    <section class="hero container max-w-screen-lg mx-auto flex justify-center">
      <img :src="qrcode" class="rounded-lg object-center pb-2" alt="QRCODE">
    </section>
    <p>Agora só falta você escanear o codigo qr.</p>
    <p>E pagar no seu app picpay</p>
    <p>Apos pagar basta aguardar a validação do pagamento para seu premium ser ativado!</p>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    qrcode: {
      type: String,
      required: true
    }
  }
}
</script>
