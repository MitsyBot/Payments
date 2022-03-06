<template>
  <div class="text-center pt-6 text-xl">
    <section class="hero container max-w-screen-lg mx-auto pb-10 flex justify-center">
      <img src="/mitsy_ok.png" class="rounded-lg object-center pb-6" alt="MITSY_OK">
    </section>
    <p>OK, só falta uma coisinha.</p>
    <p>Na proxima etapa você ira precisar informar seus dados para o picpay</p>
    <p>Deixando muito claro que nossos sitemas não salvam seus dados pessoais</p>
    <p>Estes dados são utilizados somente pelo picpay!</p>
    <div class="pt-12">
      <button id="botao" class="button primary" style="width: 100%;" @click="$emit('next-stage')">
        Entendido!
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
