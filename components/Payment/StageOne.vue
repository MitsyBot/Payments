<template>
  <div class="text-center pt-6 text-xl">
    <section class="hero container max-w-screen-lg mx-auto pb-10 flex justify-center">
      <img src="/mitsy_rica.png" class="rounded-lg object-center pb-6" alt="MITSY_RICA">
    </section>
    <p>Olá {{ data.user.username }}</p>
    <p>Bem vindo ao sistema de pagamentos da Poluxtrail</p>
    <p>Iremos revisar suas informações de pagamento antes de prosseguir, ok?</p>
    <p>Vamos começar pelas informações da sua compra</p>
    <div class="pt-12">
      <button id="botao" class="button primary" style="width: 100%;" @click="$emit('next-stage')">
        Prosseguir!
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>
